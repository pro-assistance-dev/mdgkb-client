<template>
  <el-tag v-if="dpoApplications.some((app) => app.formValue.isNew)">Есть новые заявки</el-tag>
  <el-table v-if="mounted" :data="dpoApplications">
    <el-table-column label="Статус">
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
    <el-table-column label="ФИО заявителя" sortable>
      <template #default="scope">
        {{ scope.row.formValue.user.human.getFullName() }}
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
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
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
    const title = ref('');

    watch(route, async () => {
      setType();
      await unsubscribe();
      await subscribe();
      await store.dispatch('dpoApplications/getAll', filterQuery.value);
    });

    const setType = () => {
      if (route.path === '/admin/nmo/applications') {
        filterModel.value.boolean = true;
        title.value = 'Заявки НМО';
      } else {
        filterModel.value.boolean = false;
        title.value = 'Заявки ДПО';
      }
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
        title: title,
        buttons: [{ text: 'Подать заявление', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      await subscribe();
      window.addEventListener('beforeunload', unsubscribe);
      mounted.value = true;
    });

    const subscribe = async () => {
      const isNmo = route.path === '/admin/nmo/applications';
      await store.dispatch('dpoApplications/subscribeCreate', isNmo);
    };

    const unsubscribe = async () => {
      await store.dispatch('dpoApplications/unsubscribeCreate');
    };
    onBeforeUnmount(async () => {
      await store.dispatch('dpoApplications/unsubscribeCreate');
    });

    const create = () => router.push(`${route.path}/new`);
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
  margin: 2px;
}
</style>
