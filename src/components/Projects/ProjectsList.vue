<template>
  <PageComponent v-if="mounted" :custom-sections="customSections" :get-page="false" title="Проекты" @select-menu="selectProject">
    <template v-for="section in customSections" :key="section" #[section.id]>
      <component :is="section.component"></component>
    </template>
  </PageComponent>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import CustomSection from '@/classes/CustomSection';
import Project from '@/classes/Project';
import PageComponent from '@/components/Page/PageComponent.vue';
import ProjectPage from '@/components/Projects/ProjectPage.vue';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProjectsList',
  components: {
    PageComponent,
    ProjectPage,
  },
  setup() {
    const projects: ComputedRef<Project[]> = computed(() => Provider.store.getters['projects/items']);
    const customSections: Ref<CustomSection[]> = ref([]);
    const mounted = ref(false);

    onBeforeMount(async () => {
      await Provider.store.dispatch('projects/getAll');
      const sections = projects.value.map((p: Project) => CustomSection.Create(p.id as string, p.title, 'ProjectPage'));
      customSections.value.push(...sections);
      mounted.value = true;
    });

    const selectProject = async (e: PageSideMenu) => {
      await Provider.store.dispatch('projects/get', e.id);
    };
    return {
      selectProject,
      customSections,
      projects,
      mounted,
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

/* Progect page */

/* Font */

.project-colomn-text {
  margin: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}

.project-colomn-text-h2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: bold;
  overflow-wrap: break-word;
  color: #343e5c;
  text-align: left;
  margin: 12px 0;
  justify-content: left;
}

.project-colomn-text-h3 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  margin: 0px;
  justify-content: left;
}

.project-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  height: 100px;
  background: #e4e5e7;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
  color: #343e5c;
}

.project-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-content-item {
  position: relative;
  max-width: 400px;
  height: 500px;
  background: #ffffff;
  margin-top: 20px;
  margin-left: 3%;
  margin-right: 3%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  overflow: hidden;
  transition: 0.3s;
}

.project-content-item:after {
  content: ' ';
  display: block;
  background-color: #ffffff;
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
}

.project-link {
  text-decoration: none;
}

.project-content-item:hover {
  box-shadow: 2px 4px 3px 3px rgba(0, 0, 0, 0.2);
}

.project-colomn-img {
  width: 400px;
  height: 300px;
  background: #c8c8c8;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-content-list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.project-add-button {
  display: flex;
  justify-content: center;
}

.add-button {
  display: flex;
  margin: 50px 0 50px 0;
  padding: 12px 20px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  background-clip: padding-box;
  background: #ffffff;
  color: #606266;
}

.add-button:hover {
  background: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}

.text {
  font-size: 14px;
  font-weight: normal;
  color: #4a4a4a;
  margin-top: 5px;
  :deep(p) {
    margin: 0;
  }
}

.indent-20 {
  height: 20px;
}

.project-colomn-img {
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    object-fit: cover;
  }
}
</style>
