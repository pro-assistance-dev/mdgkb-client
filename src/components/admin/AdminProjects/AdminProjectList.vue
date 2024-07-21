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
import { useRouter } from 'vue-router';

import Project from '@/classes/Project';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminProjectList',
  components: { TableButtonGroup },

  setup() {
    const router = useRouter();
    const projects: Project[] = ProjectsStore.Items();
    const mounted: Ref<boolean> = ref(false);

    const edit = (id: string): void => {
      router.push(`/admin/projects/${id}`);
    };
    const remove = async (id: string) => {
      await ProjectsStore.Remove(id);
    };

    onBeforeMount(async () => {
      await ProjectsStore.GetAll();
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
