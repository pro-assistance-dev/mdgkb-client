<template>
  <AdminListWrapper pagination show-header>
    <template #header>
      <!-- TODO: пофиксить ошибку на бэке -->
      <!-- <FilterMultipleSelect :filter-model="filterByStatus" :options="filtersToOptions()" @load="loadApplications" /> -->
      <FilterSelect :models="filterMainModels" placeholder="Специальность" @load="loadApplications" />
      <FilterSelect :models="filterPaidModels" placeholder="Основа обучения" @load="loadApplications" />
    </template>
    <template #sort>
      <SortSelect :max-width="400" @load="loadApplications" />
    </template>
    <el-table :data="residencyApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Подано" min-width="150">
        <template #default="scope">
          {{
            scope.row.admissionCommittee
              ? `Приемная кампания
          ${scope.row.residencyCourse?.startYear.year.getFullYear()}`
              : `Ординатура`
          }}
        </template>
      </el-table-column>
      <el-table-column label="Номер заявления" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input v-model="scope.row.applicationNum" size="small" min="0" />
          </div>
          <div v-else>
            {{ scope.row.applicationNum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Основа обучения" align="center" width="100">
        <template #default="scope">
          <div>
            {{ scope.row.paid ? 'Контракт' : 'Бюджет' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Специальность" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.main ? 'Основная' : 'Дополнительная' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Дата принятия заявления" align="center" width="150">
        <template #default="scope">
          {{ scope.row.formValue.approvingDate ? $dateTimeFormatter.format(scope.row.formValue.approvingDate) : 'Неуказана' }}
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" min-width="150">
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО заявителя" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование курса" min-width="200">
        <template #default="scope">
          {{ scope.row.residencyCourse?.getMainSpecialization().name }}
        </template>
      </el-table-column>
      <el-table-column label="Баллы за вступительные испытания" align="center" width="150">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-input-number v-model="scope.row.pointsEntrance" size="small" min="0" />
          </div>
          <div v-else>
            {{ scope.row.pointsEntrance }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Баллы за индивидуальные достижения" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.calculateAchievementsPoints(true) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Сумма баллов" align="center" width="150">
        <template #default="scope">
          <div>
            {{ scope.row.getPointsSum() }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import { NavigationGuardNext } from 'vue-router';

import FormStatus from '@/classes/FormStatus';
import ResidencyApplication from '@/classes/ResidencyApplication';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import ResidencyApplicationsFiltersLib from '@/libs/filters/ResidencyApplicationsFiltersLib';
import ResidencyApplicationsSortsLib from '@/libs/sorts/ResidencyApplicationsSortsLib';
import Provider from '@/services/Provider/Provider';
import SortList from '@/services/SortList';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const residencyApplications: ComputedRef<ResidencyApplication[]> = Store.Items('residencyApplications');

const formStatuses: ComputedRef<FormStatus[]> = Store.Items('formStatuses');
const onlyAdmissionFilter: Ref<FilterModel> = ref(new FilterModel());
const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
// const applicationsCount: ComputedRef<number> = computed(() =>
//   Provider.store.getters['admin/applicationsCount']('residency_applications')
// );

const isEditMode: Ref<boolean> = ref(false);
const isNotEditMode: Ref<boolean> = ref(true);

const loadApplications = async () => {
  await Store.FTSP('residencyApplications');
};

const enableEditMode = () => {
  if (isEditMode.value) {
    return;
  }
  isEditMode.value = true;
  isNotEditMode.value = false;
};

const save = async (next?: NavigationGuardNext) => {
  if (!isEditMode.value) {
    return;
  }
  saveButtonClick.value = true;
  await Store.Dispatch('residencyApplications/updateMany');
  isEditMode.value = false;
  isNotEditMode.value = true;
  if (next) next();
};
const { confirmLeave, saveButtonClick } = useConfirmLeavePage();
// const sortList = [...createSortModels(ResidencyApplicationsSortsLib)];
const load = async () => {
  // TODO: Пофиксить ошибку на бэке
  SortList.Set(ResidencyApplicationsSortsLib);
  FTSP.Get().setS(ResidencyApplicationsSortsLib.byApprovingDate(Orders.Desc));
  await loadApplications();
  await loadFilters();
  onlyAdmissionFilter.value = ResidencyApplicationsFiltersLib.onlyAdmissionCommittee();
  filterByStatus.value = ResidencyApplicationsFiltersLib.byStatus();

  PHelp.AdminHead().Set('Заявки на обучение в ординатуре', [
    Button.Success('Редактировать', enableEditMode, isNotEditMode),
    Button.Success('Сохранить', save, isEditMode),
    Button.Success('Подать заявление', create),
  ]);

  await Store.Dispatch('residencyApplications/subscribeCreate');
};

watch(isEditMode, () => {
  confirmLeave.value = isEditMode.value;
});

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'residencyApplications', action: 'ftsp' },
});

onBeforeUnmount(async () => {
  await Store.Dispatch('residencyApplications/unsubscribeCreate');
});

const create = () => Router.To(`${Provider.route().path}/new`);
const edit = (id: string) => Router.To(`${Provider.route().path}/${id}`);

// const filtersToOptions = (): IOption[] => {
//   const options: IOption[] = [];
//   formStatuses.value.forEach((i: FormStatus) => {
//     if (i.id) {
//       options.push({ value: i.id, label: i.label });
//     }
//   });
//   return options;
// };

const loadFilters = async () => {
  const filterQuery = new FilterQuery();
  filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('education'));
  await Store.GetAll('formStatuses');
};

const filterMainModels = [ResidencyApplicationsFiltersLib.onlyMain(true), ResidencyApplicationsFiltersLib.onlyMain(false)];
const filterPaidModels = [ResidencyApplicationsFiltersLib.onlyPaid(true), ResidencyApplicationsFiltersLib.onlyPaid(false)];
</script>
