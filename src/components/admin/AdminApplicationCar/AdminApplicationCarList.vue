<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <FilterMultipleSelect :filter-model="filterByStatus" :options="filtersToOptions()" @load="loadApplications" />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :key="applicationsCars" :data="applicationsCars">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: '2-digit', hour: 'numeric', minute: 'numeric' }) }}
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
      <el-table-column label="Вход" min-width="200">
        <template #default="scope">
          {{ scope.row.gate.name }}
        </template>
      </el-table-column>
      <el-table-column label="Отделение" min-width="200">
        <template #default="scope">
          {{ scope.row.division.name }}
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

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import FilterQuery from '@/classes/filters/FilterQuery';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Orders } from '@/interfaces/filters/Orders';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IFormStatus from '@/interfaces/IFormStatus';
import IOption from '@/interfaces/schema/IOption';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ApplicationsCarsFiltersLib from '@/services/Provider/libs/filters/ApplicationsCarsFiltersLib';
import FormStatusesFiltersLib from '@/services/Provider/libs/filters/FormStatusesFiltersLib';
import ApplicationsCarsSortsLib from '@/services/Provider/libs/sorts/ApplicationsCarsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminApplicationCarList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus, FilterMultipleSelect },

  setup() {
    const route = useRoute();
    const filterByStatus: Ref<IFilterModel> = ref(new FilterModel());
    const formStatuses: ComputedRef<IFormStatus[]> = computed(() => Provider.store.getters['formStatuses/items']);
    const applicationsCars: ComputedRef<IApplicationCar[]> = computed(() => Provider.store.getters['applicationsCars/items']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['meta/applicationsCount']('applications_cars'));
    const create = () => Provider.router.push(`${route.path}/new`);
    const edit = (id: string) => Provider.router.push(`${route.path}/${id}`);

    const loadApplications = async () => {
      await Provider.store.dispatch('applicationsCars/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(ApplicationsCarsSortsLib));
      Provider.setSortModels(ApplicationsCarsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      await loadFilters();
      filterByStatus.value = ApplicationsCarsFiltersLib.byStatus();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на въезд',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'applicationsCars', action: 'getAll' },
      sortModels: [],
    });

    const filtersToOptions = (): IOption[] => {
      const options: IOption[] = [];
      formStatuses.value.forEach((i: IFormStatus) => {
        if (i.id) {
          options.push({ value: i.id, label: i.name });
        }
      });
      return options;
    };

    const loadFilters = async () => {
      const filterQuery = new FilterQuery();
      if (applicationsCars.value.length > 0) {
        const formStatusesGroupId = applicationsCars.value[0].formValue.formStatus.formStatusGroupId;
        if (formStatusesGroupId) {
          filterQuery.filterModels.push(FormStatusesFiltersLib.byGroupId(formStatusesGroupId));
        }
      }
      await Provider.store.dispatch('formStatuses/getAll', filterQuery);
    };

    return {
      filterByStatus,
      applicationsCars,
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      schema: Provider.schema,
      edit,
      loadApplications,
      filtersToOptions,
    };
  },
});
</script>
