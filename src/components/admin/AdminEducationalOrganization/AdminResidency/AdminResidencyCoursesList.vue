<template>
  <el-table v-if="mounted" :data="residencyCourses">
    <el-table-column label="Код специализации" sortable>
      <template #default="scope">
        <div v-for="residencyCoursesSpecialization in scope.row.residencyCoursesSpecializations" :key="residencyCoursesSpecialization.id">
          {{ residencyCoursesSpecialization.specialization.code }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Специализация" sortable>
      <template #default="scope">
        <router-link :to="`/admin/residency/courses/${scope.row.getMainSpecialization().slug}`">
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
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'AdminResidencyCoursesList',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const residencyCourses: Ref<IResidencyCourse[]> = computed(() => store.getters['residencyCourses/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit(
        'filters/replaceSortModel',
        SortModel.CreateSortModel(
          schema.value.residencyCourse.tableName,
          schema.value.residencyCourse.name,
          Orders.Asc,
          'По алфавиту',
          true
        )
      );
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('residencyCourses/getAll', filterQuery.value);
      store.commit('admin/setHeaderParams', {
        title: 'Программы ординатуры',
        buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`${route.path}/new`);
    const edit = (id: string) => router.push(`${route.path}/${id}`);
    const remove = async (id: string) => await store.dispatch('residencyCourses/remove', id);

    return { mounted, residencyCourses, remove, edit, create };
  },
});
</script>

<style scoped></style>
