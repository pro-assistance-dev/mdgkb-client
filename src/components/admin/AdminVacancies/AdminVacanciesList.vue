<template>
  <AdminListWrapper v-if="mounted" show-header pagination>
    <template #header>
      <RemoteSearch :key-value="schema.vacancy.key" @select="selectSearch" />
      <FilterSelectDate :table="schema.vacancy.tableName" :col="schema.vacancy.date" placeholder="Дата публикации" @load="load" />
      <FilterMultipleSelect :filter-model="filterByDivision" :options="schema.division.options" @load="loadVacancies" />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="load" />
    </template>
    <template #header-bottom>
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.responsesCount"
        label="С отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="loadVacancies"
      />
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.newResponsesCount"
        label="С новыми отзывами"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="0"
        @load="loadVacancies"
      />
      <FilterCheckbox
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.active"
        label="Активные"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        :filter-value="true"
        @load="loadVacancies"
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
      <el-table-column label="Отделение" min-width="200">
        <template #default="scope">
          {{ scope.row.division?.name }}
        </template>
      </el-table-column>
      <el-table-column label="Активна" align="center" min-width="80">
        <template #default="scope">
          <el-switch v-model="scope.row.active" @change="setActive(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Отзывов" align="center" min-width="100">
        <template #default="scope">
          {{ scope.row.responsesCount }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Дата добавления" align="center" min-width="200">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column prop="minSalary" label="Минимальная зарплата" align="center" min-width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number
              v-model="scope.row.minSalary"
              controls-position="right"
              size="mini"
              placeholder="Минимальная заработная плата"
            />
          </div>
          <div v-else>
            {{ scope.row.minSalary }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="maxSalary" label="Минимальная зарплата" align="center" min-width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number
              v-model="scope.row.maxSalary"
              controls-position="right"
              size="mini"
              placeholder="Минимальная заработная плата"
            />
          </div>
          <div v-else>
            {{ scope.row.maxSalary }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Шаблон формы для откликов" align="center" min-width="200">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-select v-model="scope.row.formPattern" value-key="id" size="small" placeholder="Выберите шаблон">
              <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
            </el-select>
          </div>
          <div v-else>
            {{ scope.row.formPattern.title || 'Не назначен' }}
          </div>
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
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import VacanciesFiltersLib from '@/services/Provider/libs/filters/VacanciesFiltersLib';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVacanciesList',
  components: {
    FilterMultipleSelect,
    FilterCheckbox,
    FilterSelectDate,
    TableButtonGroup,
    RemoteSearch,
    SortList,
    AdminListWrapper,
  },
  setup() {
    const vacancies: ComputedRef<IVacancy[]> = computed(() => Provider.store.getters['vacancies/items']);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);
    const formPatterns: ComputedRef<IForm[]> = computed(() => Provider.store.getters['formPatterns/items']);

    const editMany = async () => {
      Provider.store.commit('admin/showLoading');
      await Provider.store.dispatch('formPatterns/getAll');
      isEditMode.value = true;
      Provider.store.commit('admin/closeLoading');
    };
    const saveMany = async () => {
      Provider.store.commit('admin/showLoading');
      await Provider.store.dispatch('vacancies/updateMany');
      isEditMode.value = false;
      Provider.store.commit('admin/closeLoading');
    };

    const loadVacancies = async () => {
      await Provider.getAll('vacancies');
    };
    const filterByDivision: Ref<FilterModel> = ref(new FilterModel());
    const load = async () => {
      Provider.setSortList(...createSortModels(VacanciesSortsLib));
      Provider.setSortModels(VacanciesSortsLib.byTitle());
      await loadVacancies();
      filterByDivision.value = VacanciesFiltersLib.byDivisions([]);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Вакансии',
        buttons: [
          { text: 'Сохранить', condition: isEditMode, action: saveMany },
          { text: 'Редактировать', type: 'primary', condition: isNotEditMode, action: editMany },
          { text: 'Создать вакансию', type: 'success', action: create },
        ],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'vacancies', action: 'getAll' },
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
      isEditMode,
      formPatterns,
      loadVacancies,
      filterByDivision,
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
