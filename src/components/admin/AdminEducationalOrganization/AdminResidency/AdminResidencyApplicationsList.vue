<template>
  <AdminListWrapper v-if="mounted" pagination>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :data="residencyApplications">
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
      <el-table-column label="ФИО заявителя" min-width="200">
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Наименование курса" min-width="200">
        <template #default="scope">
          {{ scope.row.residencyCourse.getMainSpecialization().name }}
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
import { computed, ComputedRef, defineComponent, onBeforeUnmount } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ResidencyApplicationsSortsLib from '@/services/Provider/libs/sorts/ResidencyApplicationsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminResidencyApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, SortList, TableFormStatus },

  setup() {
    const residencyApplications: ComputedRef<IResidencyApplication[]> = computed(
      () => Provider.store.getters['residencyApplications/items']
    );
    const applicationsCount: ComputedRef<number> = computed(() =>
      Provider.store.getters['meta/applicationsCount']('residency_applications')
    );

    const loadApplications = async () => {
      await Provider.store.dispatch('residencyApplications/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(ResidencyApplicationsSortsLib));
      Provider.setSortModels(ResidencyApplicationsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявки на обучение в ординатуре',
        buttons: [{ text: 'Подать заявление', type: 'primary', action: create }],
        applicationsCount,
      });
      await Provider.store.dispatch('residencyApplications/subscribeCreate');
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'residencyApplications', action: 'getAll' },
      sortModels: [],
    });

    onBeforeUnmount(async () => {
      await Provider.store.dispatch('residencyApplications/unsubscribeCreate');
    });

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    return {
      mounted: Provider.mounted,
      schema: Provider.schema,
      residencyApplications,
      edit,
      sortList: Provider.sortList,
      loadApplications,
    };
  },
});
</script>
