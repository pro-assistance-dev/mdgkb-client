<template>
  <AdminListWrapper v-if="mounted" pagination>
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
import { computed, ComputedRef, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IApplicationCar from '@/interfaces/IApplicationCar';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ApplicationsCarsSortsLib from '@/services/Provider/libs/sorts/ApplicationsCarsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminApplicationCarList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus },

  setup() {
    const route = useRoute();
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

    return {
      applicationsCars,
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      edit,
      loadApplications,
    };
  },
});
</script>
