<template>
  <div class="projects-container">
    <h2>Проекты</h2>
    <el-card>
      <div class="project-list">
        <span v-for="item in projects" :key="item.id" @click="$router.push(`/projects/${item.slug}`)">
          <span class="project-link">{{ item.title }}</span>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IProject from '@/interfaces/projects/IProject';

export default defineComponent({
  name: 'ProjectsList',

  setup() {
    const store = useStore();
    const projects: ComputedRef<IProject[]> = computed(() => store.getters['projects/items']);

    onBeforeMount(async () => {
      await store.dispatch('projects/getAll');
    });

    return {
      projects,
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
.project-list {
  display: flex;
  flex-direction: column;
}
.project-link {
  text-decoration: underline;
  color: blue;
  &:hover {
    cursor: pointer;
  }
}
</style>
