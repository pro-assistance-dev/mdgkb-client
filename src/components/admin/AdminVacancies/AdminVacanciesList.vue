<template>
  <div v-if="mounted" class="flex-column">
    <RemoteSearch :key-value="schema.vacancy.key" @select="selectSearch" />
    <SortList :models="sortList" :store-mode="true" @load="load" />
    <FilterCheckbox
      :table="schema.vacancy.tableName"
      :col="schema.vacancy.responsesCount"
      label="С отзывами"
      :data-type="DataTypes.Number"
      :operator="Operators.Gt"
      :filter-value="0"
      @load="load"
    />
    <FilterCheckbox
      :table="schema.vacancy.tableName"
      :col="schema.vacancy.newResponsesCount"
      label="С новыми отзывами"
      :data-type="DataTypes.Number"
      :operator="Operators.Gt"
      :filter-value="0"
      @load="load"
    />
    <FilterCheckbox
      :table="schema.vacancy.tableName"
      :col="schema.vacancy.active"
      label="Активные"
      :data-type="DataTypes.Boolean"
      :operator="Operators.Eq"
      :filter-value="true"
      @load="load"
    />

    <div class="flex-row-between">
      <el-button round size="medium" type="primary" @click="create">Создать вакансию</el-button>
      <el-button v-if="newResponsesExists()" round size="medium" type="warning">Показать новые отклики</el-button>
    </div>
    <el-card>
      <el-table v-if="vacancies" :data="vacancies">
        <el-table-column prop="title" label="Отзывов">
          <template #default="scope">
            <el-tag>Отзывов: {{ scope.row.responsesCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Новых отзывов">
          <template #default="scope">
            <el-tag>Новых отзывов: {{ scope.row.newResponsesCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Название">
          <template #default="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="minSalary" label="Минимальная зарплата"> </el-table-column>
        <el-table-column prop="maxSalary" label="Максимальная зарплата"> </el-table-column>
        <el-table-column prop="archived" label="Активна">
          <template #default="scope">
            <el-switch v-model="scope.row.active" @change="setActive(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Дата добавления" align="center" width="200">
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="$router.push(`/admin/vacancies/${scope.row.id}`)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import IVacancy from '@/interfaces/IVacancy';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: { FilterCheckbox, TableButtonGroup, RemoteSearch, SortList },
  setup() {
    const vacancies: Ref<IVacancy[]> = computed(() => Provider.store.getters['vacancies/vacancies']);

    const load = async () => {
      Provider.setSortList(
        VacanciesSortsLib.byTitle(),
        VacanciesSortsLib.byDate(),
        VacanciesSortsLib.byMinSalary(),
        VacanciesSortsLib.byMaxSalary(),
        VacanciesSortsLib.byResponsesCount()
      );
      Provider.setSortModels(VacanciesSortsLib.byTitle());
      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', { title: 'Вакансии' });
    };

    Hooks.onBeforeMount(load);

    const remove = async (id: string) => {
      await Provider.store.dispatch('vacancies/remove', id);
    };

    const create = () => Provider.router.push(`/admin/vacancies/new`);

    const newResponsesExists = (): boolean => {
      return vacancies.value.some((vacancy: IVacancy) => vacancy.withNewResponses());
    };

    const setActive = async (vacancy: IVacancy) => {
      await Provider.store.dispatch('vacancies/update', vacancy);
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminNewsPageEdit`, params: { id: event.id, slug: event.id } });
    };

    return {
      setActive,
      Operators,
      load,
      vacancies,
      remove,
      create,
      newResponsesExists,
      selectSearch,
      DataTypes,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
