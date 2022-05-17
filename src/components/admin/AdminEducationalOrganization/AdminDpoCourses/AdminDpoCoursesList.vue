<template>
  <el-table v-if="mounted" :data="dpoCourses">
    <el-table-column label="Название" sortable>
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="Руководитель" sortable>
      <template #default="scope">
        <div v-if="scope.row.getMainTeacher()">
          {{ scope.row.getMainTeacher().doctor.human.getFullName() }}
        </div>
        <div v-else>Руководителя нет</div>
      </template>
    </el-table-column>
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.slug)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import SortModel from '@/classes/filters/SortModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminDpoCoursesList',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const dpoCourses: ComputedRef<IDpoCourse[]> = computed(() => store.getters['dpoCourses/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: ComputedRef<ISchema> = computed(() => store.getters['meta/schema']);
    const filterModel = ref();
    const title = ref('');

    watch(route, async () => {
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
    });

    const setProgramsType = () => {
      if (route.path === '/admin/nmo/courses') {
        filterModel.value.boolean = true;
        title.value = 'НМО';
      } else {
        filterModel.value.boolean = false;
        title.value = 'ДПО - дополнительные программы';
      }
      store.commit('filter/setFilterModel', filterModel.value);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filters/replaceSortModel',
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true)
      );
      filterModel.value = FilterModel.CreateFilterModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.isNmo, DataTypes.Boolean);
      filterQuery.value.pagination.cursorMode = false;
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
      store.commit('admin/setHeaderParams', {
        title: title,
        buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`${route.path}/new`);
    const edit = (id: string) => router.push(`${route.path}/${id}`);
    const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);

    return { mounted, dpoCourses, remove, edit, create };
  },
});
</script>

<style scoped></style>
