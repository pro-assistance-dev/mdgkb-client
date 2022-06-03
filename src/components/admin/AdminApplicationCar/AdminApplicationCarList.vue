<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <el-table :data="applicationsCars">
      <el-table-column label="Статус" class-name="sticky-left">
        <template #default="scope">
          <el-tag v-if="scope.row.formValue.isNew" size="small" type="warning">Не просмотрено</el-tag>
          <el-tag
            v-if="scope.row.formValue.formStatus.label"
            size="small"
            :style="`background-color: inherit; color: ${scope.row.formValue.formStatus.color}; border-color: ${scope.row.formValue.formStatus.color}`"
          >
            {{ scope.row.formValue.formStatus.label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Дата подачи заявления" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.formValue.createdAt, { month: 'long', hour: 'numeric', minute: 'numeric' }) }}
        </template>
      </el-table-column>
      <el-table-column label="Email заявителя" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="Вход" sortable>
        <template #default="scope">
          {{ scope.row.gate.name }}
        </template>
      </el-table-column>
      <el-table-column label="Отделение" sortable>
        <template #default="scope">
          {{ scope.row.division.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
      <template #footer>
        <Pagination :show-confirm="isEditMode" @save="save" @cancel="cancel" />
      </template>
    </el-table>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IApplicationCar from '@/interfaces/IApplicationCar';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminApplicationCarList',
  components: { TableButtonGroup, AdminListWrapper, Pagination },

  setup() {
    const route = useRoute();
    const applicationsCars: ComputedRef<IApplicationCar[]> = computed(() => Provider.store.getters['applicationsCars/items']);
    const create = () => Provider.router.push(`${route.path}/new`);
    const edit = (id: string) => Provider.router.push(`${route.path}/${id}`);

    // Для сортировки (SortList @load)
    // const loadApplications = async () => {
    //   Provider.store.commit('applicationsCars/resetItems');
    //   await Provider.store.dispatch('applicationsCars/getAll', Provider.filterQuery.value);
    // };

    const load = async () => {
      await Provider.store.dispatch('applicationsCars/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на пропуск',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load);

    return {
      applicationsCars,
      mounted: Provider.mounted,
      edit,
    };
  },
});
</script>
