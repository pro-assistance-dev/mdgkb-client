<template>
  <el-table v-if="mounted" :data="dpoApplications">
    <el-table-column label="Статус">
      <template #default="scope">
        <el-tag v-if="scope.row.isNew" size="small" type="warning">Новая</el-tag>
        <el-tag v-if="scope.row.isFieldValuesModChecked()" size="small" type="success">Данные проверены</el-tag>
        <el-tag v-else size="small" type="error">Данные не проверены</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Дата подачи заявления" sortable>
      <template #default="scope">
        {{ $dateFormatRu(scope.row.createdAt, true, true) }}
      </template>
    </el-table-column>
    <el-table-column label="Email заявителя" sortable>
      <template #default="scope">
        {{ scope.row.user.email }}
      </template>
    </el-table-column>
    <el-table-column label="ФИО заявителя" sortable>
      <template #default="scope">
        {{ scope.row.user.human.getFullName() }}
      </template>
    </el-table-column>
    <el-table-column label="Наименование курса" sortable>
      <template #default="scope">
        {{ scope.row.dpoCourse.name }}
      </template>
    </el-table-column>
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import SortModel from '@/classes/filters/SortModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoApplication from '@/interfaces/IDpoApplication';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminDpoApplicationsList',
  components: { TableButtonGroup },

  setup() {
    const mounted: Ref<boolean> = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const dpoApplications: ComputedRef<IDpoApplication[]> = computed(() => store.getters['dpoApplications/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterModel = ref();

    watch(route, async () => {
      setType();
      await store.dispatch('dpoApplications/getAll', filterQuery.value);
    });

    const setType = () => {
      filterModel.value.boolean = route.path === '/admin/nmo/applications';
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const setFilter = async () => {
      await store.dispatch('meta/getSchema');
      store.commit(`filter/resetQueryFilter`);
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(
          schema.value.dpoApplication.tableName,
          schema.value.dpoApplication.createdAt,
          Orders.Desc,
          'По дате',
          true
        )
      );

      filterModel.value = FilterModel.CreateFilterModel(
        schema.value.dpoApplication.tableName,
        schema.value.dpoApplication.isNmo,
        DataTypes.Boolean
      );

      filterQuery.value.pagination.cursorMode = false;
      setType();
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await setFilter();
      await store.dispatch('dpoApplications/getAll', filterQuery.value);
      store.commit('admin/setHeaderParams', {
        title: 'Заявки ДПО',
        // buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    // const create = () => router.push(`/admin/educational-organization/dpo/courses/new`);
    // const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const edit = (id: string) => router.push(`${route.path}/${id}`);

    return {
      mounted,
      dpoApplications,
      edit,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
  margin-right: 5px;
}
</style>
