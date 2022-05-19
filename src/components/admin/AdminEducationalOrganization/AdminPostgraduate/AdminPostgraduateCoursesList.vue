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
        <router-link :to="`/admin/postgraduate-courses/${scope.row.getMainSpecialization().slug}`">
          {{ scope.row.getMainSpecialization().name }}
        </router-link>
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
        <TableButtonGroup
          :show-edit-button="true"
          :show-remove-button="true"
          @remove="remove(scope.row.id)"
          @edit="edit(scope.row.getMainSpecialization().slug)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
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

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filter/replaceSortModel',
        SortModel.CreateSortModel(
          schema.value.postgraduateCourse.tableName,
          schema.value.postgraduateCourse.name,
          Orders.Asc,
          'По алфавиту',
          true
        )
      );
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('postgraduateCourses/getAll', filterQuery.value);
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

    return { mounted, postgraduateCourses, remove, edit, create };
  },
});
</script>

<style scoped></style>
