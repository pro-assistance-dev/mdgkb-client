<template>
  <el-card>
    <div v-html="project.content"></div>
    <el-tabs v-if="project.projectItems.length" type="border-card">
      <el-tab-pane v-for="item in project.projectItems" :key="item.id" :label="item.title">
        <div v-html="item.content"></div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Project from '@/classes/Project';

export default defineComponent({
  name: 'ProjectPage',

  setup() {
    const store = useStore();
    const project: ComputedRef<Project> = computed(() => store.getters['projects/item']);

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
