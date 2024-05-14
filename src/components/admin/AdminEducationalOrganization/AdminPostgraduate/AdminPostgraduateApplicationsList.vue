<template>
  <AdminListWrapper v-if="mounted" pagination>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadApplications" />
    </template>
    <el-table :data="postgraduateApplications">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" align="center" width="150">
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue?.createdAt, {
            month: '2-digit', hour: 'numeric', minute:
              'numeric'
          }) }}
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
          {{ scope.row.postgraduateCourse.getMainSpecialization().name }}
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

import PostgraduateApplication from '@/classes/PostgraduateApplication';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPostgraduateApplicationsList',
  components: { TableButtonGroup, AdminListWrapper, TableFormStatus },

  setup() {
    const postgraduateApplications: ComputedRef<PostgraduateApplication[]> = computed(
      () => Provider.store.getters['postgraduateApplications/items']
    );
    const applicationsCount: ComputedRef<number> = computed(() =>
      Provider.store.getters['admin/applicationsCount']('postgraduate_applications')
    );

    const loadApplications = async () => {
      await Provider.store.dispatch('postgraduateApplications/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      // Provider.setSortList(...createSortModels(PostgraduateApplicationsSortsLib));
      // Provider.setSortModels(PostgraduateApplicationsSortsLib.byCreatedAt(Orders.Desc));
      await loadApplications();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявки на обучение в аспирантуре',
        buttons: [{ text: 'Подать заявление', type: 'primary', action: create }],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'postgraduateApplications', action: 'getAll' },
    });

    const create = () => Provider.router.push(`${Provider.route().path}/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => Provider.router.push(`${Provider.route().path}/${id}`);

    return {
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      postgraduateApplications,
      edit,
      loadApplications,
    };
  },
});
</script>
