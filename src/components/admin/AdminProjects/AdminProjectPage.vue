<template>
  <div v-if="mounted" class="project-page-container">
    <el-form ref="form" :rules="rules" :model="project" label-position="top">
      <el-card>
        <el-form-item label="Заголовок" prop="title">
          <el-input v-model="project.title" placeholder="Заголовок"></el-input>
        </el-form-item>
        <el-form-item label="Контент" prop="content">
          <WysiwygEditor v-model:content="project.content" />
        </el-form-item>
      </el-card>
      <el-card header="Вкладки">
        <el-button style="margin-bottom: 10px" type="success" size="small" @click="addTab">Добавить вкладку</el-button>
        <el-tabs v-model="editableTabsIndex" type="card" closable @tab-remove="removeTab">
          <el-tab-pane v-for="(item, index) in projectItems" :key="index" :label="item.title" :name="String(index)">
            <el-form-item label="Название вкладки" :rules="rules.tabTitle" :prop="'projectItems.' + index + '.title'">
              <el-input v-model="item.title" placeholder="Название вкладки"></el-input>
            </el-form-item>
            <el-form-item label="Контент" :prop="'projectItems.' + index + '.content'" :rules="rules.tabContent">
              <WysiwygEditor v-model:content="item.content" :options="editorOption" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IProject from '@/interfaces/projects/IProject';
import IProjectItem from '@/interfaces/projects/IProjectItem';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminProjectPage',
  components: { WysiwygEditor },

  setup() {
    const editorOption = {
      modules: {
        toolbar: [
          ['полужирный', 'курсив', 'подчеркивание', 'зачеркивание'], // полужирный, курсив, подчеркивание, зачеркивание
          ['blockquote', 'code-block'], // цитата, кодовый блок
          [{ header: 1 }, { header: 2 }], // Заголовок в виде пар ключ-значение; 1, 2 означает размер шрифта
          [{ script: 'sub' }, { script: 'super' }], // нижний индекс и нижний индекс
          [{ indent: '- 1' }, { indent: '+ 1' }], // отступ
          [{ direction: 'rtl' }], // направление текста
          [{ size: ['small', false, 'large', 'huge'] }], // размер шрифта
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Несколько уровней заголовка
          [{ color: [] }, { background: [] }], // цвет шрифта, цвет фона шрифта
          [{ font: [] }], // шрифт
          [{ align: [] }], // Выравнивание
          ['clean'], // Очистить стиль шрифта
          ['image', 'video'], // Загрузить изображения, загрузить видео
          ['link'],
        ],
      },
    };
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const project: ComputedRef<IProject> = computed(() => store.getters['projects/item']);
    const projectItems: ComputedRef<IProjectItem[]> = computed(() => store.getters['projects/projectItems']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const editableTabsIndex: Ref<string> = ref('0');
    const rules = {
      title: [{ required: true, message: 'Необходимо указать заголовок', trigger: 'blur' }],
      tabTitle: [{ required: true, message: 'Необходимо указать название вкладки', trigger: 'blur' }],
      tabContent: [{ required: true, message: 'Необходимо указать заполнить контент влкадки', trigger: 'blur' }],
    };

    const addTab = () => {
      store.commit('projects/addProjectItem');
      editableTabsIndex.value = String(projectItems.value.length - 1);
    };
    const removeTab = (tabName: string) => {
      store.commit('projects/removeProjectItem', Number(tabName));
      editableTabsIndex.value = String(projectItems.value.length ? projectItems.value.length - 1 : projectItems.value.length);
    };

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('projects/update', project.value);
        } else {
          await store.dispatch('projects/create', project.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/projects');
    };

    onBeforeMount(async () => {
      store.commit('projects/resetItem');
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('projects/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить проект', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить проект', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(project, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      form,
      mounted,
      project,
      editorOption,
      editableTabsIndex,
      projectItems,
      removeTab,
      addTab,
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
.project-page-container {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
</style>
