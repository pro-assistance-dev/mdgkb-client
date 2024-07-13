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

<script lang="ts" setup>
import Project from '@/classes/Project';

const project: ComputedRef<Project> = ProjectsStore.Item();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
h2 {
  text-align: center;
  margin: 0;
}
</style>
