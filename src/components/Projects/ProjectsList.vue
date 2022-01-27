<template>
  <div class="projects-container">
    <h2>Проекты</h2>
    <div class="project-content">
      <ul class="project-content-list">
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
        <li>
          <div class="project-content-item">
            <a class="project-link" href="#">
              <div class="project-colomn-img">Img</div>
              <div class="project-colomn-text">
                <h2>Заголовок</h2>
                <h3>Превью текст</h3>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="project-add-button">
      <button class="add-button">Загрузить еще</button>
    </div>

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

/* Progect page */

/* Font */
.project-colomn-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  overflow-wrap: break-word;
  h2 {
    color: #343e5c;
    padding: 0px 12px;
    text-align: left;
    margin: 12px 0;
  }
  h3 {
    color: #4a4a4a;
    padding: 0px 12px;
    margin: 0px;
  }
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

.project-content-list {
  display: flex;
  justify-content: space-around;
}

.project-content-item {
  display: flex;
  max-width: 402px;
  height: 500px;
  background: #ffffff;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-clip: padding-box;
  overflow: hidden;
  transition: 0.3s;
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
  justify-content: space-between;
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
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
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
</style>
