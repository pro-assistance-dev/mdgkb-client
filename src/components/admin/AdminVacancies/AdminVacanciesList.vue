<template>
  <AdminListWrapper show-header pagination>
    <template #header> </template>
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
            @edit="Router.To(`/admin/vacancies/${scope.row.id}`)"
            @remove="remove(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Form from '@/classes/Form';
import Vacancy from '@/classes/Vacancy';
import VacanciesFiltersLib from '@/libs/filters/VacanciesFiltersLib';
import VacanciesSortsLib from '@/libs/sorts/VacanciesSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

const vacancies: ComputedRef<Vacancy[]> = Store.Items('vacancies');
const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);
const formPatterns: ComputedRef<Form[]> = Store.Items('formPatterns');

const editMany = async () => {
  Store.Commit('admin/showLoading');
  await Store.GetAll('formPatterns');
  isEditMode.value = true;
  Store.Commit('admin/closeLoading');
};
const saveMany = async () => {
  Store.Commit('admin/showLoading');
  await Store.Dispatch('vacancies/updateMany');
  isEditMode.value = false;
  Store.Commit('admin/closeLoading');
};

const loadVacancies = async () => {
  await Store.FTSP('vacancies');
};

const filterByDivision: Ref<FilterModel> = ref(new FilterModel());

const load = async () => {
  FTSP.Get().setS(VacanciesSortsLib.byTitle());
  // Provider.setSortList(...createSortModels(VacanciesSortsLib));
  // Provider.setSortModels(VacanciesSortsLib.byTitle());
  await loadVacancies();
  filterByDivision.value = VacanciesFiltersLib.byDivisions([]);
  PHelp.AdminUI.Head.Set('Вакансии', [
    Button.Success('Сохранить', saveMany, isEditMode),
    Button.Success('Редактировать', editMany, isNotEditMode),
    Button.Success('Создать вакансию', create),
  ]);
};

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'vacancies', action: 'ftsp' },
});

const remove = async (id: string) => {
  await Store.Remove('vacancies', id);
};

const create = () => Router.To(`/admin/vacancies/new`);

const newResponsesExists = (): boolean => {
  return vacancies.value.some((vacancy: Vacancy) => vacancy.withNewResponses());
};

const setActive = async (vacancy: Vacancy) => {
  await Store.Update('vacancies', vacancy);
};

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push({ name: `AdminVacanciesEdit`, params: { id: event.id, slug: event.id } });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
