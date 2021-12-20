<template>
  <el-card>
    <template #header>
      <h2>{{ project.title }}</h2>
    </template>
    <div v-html="project.content"></div>
    <el-tabs v-if="project.projectItems.length" type="border-card">
      <el-tab-pane v-for="item in project.projectItems" :key="item.id" :label="item.title">
        <div v-html="item.content"></div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IProject from '@/interfaces/projects/IProject';

export default defineComponent({
  name: 'ProjectPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const project: ComputedRef<IProject> = computed(() => store.getters['projects/item']);

    onBeforeMount(async () => {
      console.log(route.params['slug']);
      await store.dispatch('projects/getBySlug', route.params['slug']);
    });

    return {
      project,
    };
  },
});
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 0;
}
</style>
