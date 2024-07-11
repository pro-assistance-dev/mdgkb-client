<template>
  <el-card v-if="mounted">
    <el-table :data="projects">
      <el-table-column label="Название проекта">
        <template #default="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Project from '@/classes/Project';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminProjectList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const projects: ComputedRef<Project[]> = computed(() => store.getters['projects/items']);
    const mounted: Ref<boolean> = ref(false);

    const edit = (id: string): void => {
      router.push(`/admin/projects/${id}`);
    };
    const create = () => {
      router.push('/admin/projects/new');
    };
    const remove = (id: string) => {
      store.dispatch('projects/remove', id);
    };

    onBeforeMount(async () => {
      await store.dispatch('projects/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Наши проекты',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
      mounted.value = true;
    });

    return {
      mounted,
      projects,
      edit,
      remove,
    };
  },
});
</script>
