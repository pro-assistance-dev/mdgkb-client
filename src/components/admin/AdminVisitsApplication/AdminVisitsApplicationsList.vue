<template>
  <AdminListWrapper v-if="mounted" show-header :store="VisitsApplicationsStore">
    <template #header>
      <!-- <FilterMultipleSelect class="filters-block" :filter-model="filterByStatus" :options="filtersToOptions()" -->
      <!--   @load="loadApplications" /> -->
    </template>
    <template #sort>
      <SortSelect :max-width="400" @load="loadApplications" />
    </template>
    <el-table :key="visitsApplications" :data="visitsApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Тип" width="150" align="center">
        <template #default="scope">
          {{ scope.row.withCar ? 'На въезд' : 'На посещение' }}
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              month: '2-digit',
              year: 'numeric',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="Даты посещения" align="center" width="150">
        <template #default="scope">
          <div v-for="(item, i) in scope.row.visits" :key="i">
            {{
              $dateTimeFormatter.format(item.date, {
                month: '2-digit',
                year: 'numeric',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              })
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" min-width="150">
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО пациента" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.child.human.getFullName() }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="Вход" min-width="200">-->
      <!--        <template #default="scope">-->
      <!--          {{ scope.row.gate.name }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="Отделение" min-width="200">
        <template #default="scope">
          {{ scope.row.division?.name }}
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
import FormStatus from '@/classes/FormStatus';
import VisitsApplication from '@/classes/VisitsApplication';
import FormStatusesFiltersLib from '@/libs/filters/FormStatusesFiltersLib';
import VisitsApplicationsFiltersLib from '@/libs/filters/VisitsApplicationsFiltersLib';
import VisitsApplicationsSortsLib from '@/libs/sorts/VisitsApplicationsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

import SortListConst from '@/services/SortList';

const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
const formStatuses: FormStatus[] = FormStatusesStore.Items();
const visitsApplications: VisitsApplication[] = VisitsApplicationsStore.Items();

const create = () => Router.To(`${Router.Route().path}/new`);
const edit = (id: string) => Router.To(`${Router.Route().path}/${id}`);
const mounted = ref(false);
const loadApplications = async () => {
  await VisitsApplicationsStore.FTSP();
};

const load = async () => {
  // Provider.setSortList(...createSortModels(VisitsApplicationsSortsLib));
  SortListConst.Set(VisitsApplicationsSortsLib);
  FTSP.Get().setS(VisitsApplicationsSortsLib.byCreatedAt(Orders.Desc));
  await loadApplications();
  await loadFilters();
  filterByStatus.value = VisitsApplicationsFiltersLib.byStatus();
  PHelp.AdminUI.Head.Set('Заявления на посещение', [Button.Success('Добавить', create)]);
  mounted.value = true;
};

Hooks.onBeforeMount(load);

const filtersToOptions = (): IOption[] => {
  const options: IOption[] = [];
  formStatuses.forEach((i: FormStatus) => {
    if (i.id) {
      options.push({ value: i.id, label: i.label });
    }
  });
  return options;
};

const loadFilters = async () => {
  const filterQuery = new FilterQuery();
  filterQuery.filterModels.push(FormStatusesFiltersLib.byCode('visits'));
  await FormStatusesStore.GetAll(filterQuery);
};
</script>
