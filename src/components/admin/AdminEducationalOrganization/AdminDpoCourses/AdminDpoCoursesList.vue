<template>
  <el-table :data="dpoCourses">
    <el-table-column label="Название" sortable>
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="Преподаватель" sortable>
      <template #default="scope">
        {{ scope.row.teacher.doctor.human.getFullName() }}
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
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDpoCourse from '@/interfaces/IDpoCourse';

export default defineComponent({
  name: 'AdminDpoCoursesList',
  components: { TableButtonGroup },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const router = useRouter();

    const dpoCourses: Ref<IDpoCourse[]> = computed(() => store.getters['dpoCourses/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('dpoCourses/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'ДПО - дополнительные программы',
        buttons: [{ text: 'Добавить программу', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
      mounted.value = true;
    });

    const create = () => router.push(`/admin/educational-organization/dpo/courses/new`);
    const edit = (id: string) => router.push(`/admin/educational-organization/dpo/courses/${id}`);
    const remove = async (id: string) => await store.dispatch('dpoCourses/remove', id);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');

    return { mounted, dpoCourses, remove, edit, create, fillDateFormat };
  },
});
</script>

<style scoped></style>
