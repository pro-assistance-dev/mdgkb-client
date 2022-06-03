<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <RemoteSearch class="filters-block" :key-value="schema.vacancy.key" @select="selectSearch" />
      <SortList class="filters-block" :models="sortList" :store-mode="true" @load="load" />
      <FilterCheckbox
        class="filters-block"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.responsesCount"
        label="С отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="load"
      />
      <FilterCheckbox
        class="filters-block"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.newResponsesCount"
        label="С новыми отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="load"
      />
      <FilterCheckbox
        class="filters-block"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.active"
        label="Активные"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        :filter-value="true"
        @load="load"
      />
      <FilterSelectDate
        class="filters-block"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.date"
        placeholder="Дата публикации"
        @load="load"
      />
    </template>
    <el-table v-if="vacancies" :data="vacancies">
      <el-table-column prop="title" label="Название" class-name="sticky-left" min-width="200">
        <template #default="scope">
          <el-badge
            v-if="scope.row.newResponsesCount"
            :value="scope.row.newResponsesCount"
            type="danger"
            size="mini"
            style="margin-top: 10px"
          >
            <div style="padding: 5px 10px 0 0">
              {{ scope.row.title }}
            </div>
          </el-badge>
          <div v-else>
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Отзывов" align="center" min-width="100">
        <template #default="scope">
          {{ scope.row.responsesCount }}
        </template>
      </el-table-column>
      <el-table-column prop="minSalary" label="Минимальная зарплата" align="center" min-width="150"> </el-table-column>
      <el-table-column prop="maxSalary" label="Максимальная зарплата" align="center" min-width="150"> </el-table-column>
      <el-table-column prop="archived" label="Активна" align="center" min-width="80">
        <template #default="scope">
          <el-switch v-model="scope.row.active" @change="setActive(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Дата добавления" align="center" min-width="200">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
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
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import IVacancy from '@/interfaces/IVacancy';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: { FilterCheckbox, FilterSelectDate, TableButtonGroup, RemoteSearch, SortList, Pagination, AdminListWrapper },
  setup() {
    const vacancies: Ref<IVacancy[]> = computed(() => Provider.store.getters['vacancies/vacancies']);

    const load = async () => {
      Provider.setSortList(...createSortModels(VacanciesSortsLib));
      Provider.setSortModels(VacanciesSortsLib.byTitle());
      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Вакансии',
        buttons: [
          { text: 'Показать новые отклики', type: 'warning', conndition: newResponsesExists() },
          { text: 'Создать вакансию', type: 'primary', action: create },
        ],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'vacancies', action: 'getAll' },
      sortModels: [],
    });

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
      await Provider.router.push({ name: `AdminVacanciesEdit`, params: { id: event.id, slug: event.id } });
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
