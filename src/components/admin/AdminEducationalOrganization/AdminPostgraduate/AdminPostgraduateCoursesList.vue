<template>
  <el-table v-if="mounted" :data="postgraduateCourses">
    <el-table-column label="Код специализации" sortable>
      <template #default="scope">
        <div
          v-for="postgraduateCoursesSpecialization in scope.row.postgraduateCoursesSpecializations"
          :key="postgraduateCoursesSpecialization.id"
        >
          {{ postgraduateCoursesSpecialization.specialization.code }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Специализация" sortable>
      <template #default="scope">
        <div
          v-for="postgraduateCoursesSpecialization in scope.row.postgraduateCoursesSpecializations"
          :key="postgraduateCoursesSpecialization.id"
        >
          <router-link :to="`admin/postgraduate-courses/${scope.row.id}`">
            {{ postgraduateCoursesSpecialization.specialization.name }}
          </router-link>
        </div>
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
        <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
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
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminPostgraduateCoursesList',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const postgraduateCourses: Ref<IPostgraduateCourse[]> = computed(() => store.getters['postgraduateCourses/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterModel = ref();

    watch(route, async () => {
      setProgramsType();
      await store.dispatch('postgraduateCourses/getAll', filterQuery.value);
    });

    const setProgramsType = () => {
      filterModel.value.boolean = route.path === '/admin/nmo/courses';
      store.commit('filter/setFilterModel', filterModel.value);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true)
      );
      filterModel.value = FilterModel.CreateFilterModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.isNmo, DataTypes.Boolean);
      filterQuery.value.pagination.cursorMode = false;
      setProgramsType();
      await store.dispatch('postgraduateCourses/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Программы аспирантуры',
        buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`${route.path}/new`);
    const edit = (id: string) => router.push(`${route.path}/${id}`);
    const remove = async (id: string) => await store.dispatch('postgraduateCourses/remove', id);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');

    return { mounted, postgraduateCourses, remove, edit, create, fillDateFormat };
  },
});
</script>

<style scoped></style>
