<template>
  <div class="wrapper">
    <el-form ref="form" :key="page" :model="page">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>Заголовок</template>
              <el-form-item prop="title">
                <el-input v-model="page.title" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Контент</template>
              <el-form-item prop="content">
                <WysiwygEditor v-model:content="page.content" />
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
        <el-col :lg="8" :xl="6">
          <el-checkbox v-model="page.withComments">Включить комментарии</el-checkbox>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>
                <CardHeader :remove-button="false" :label="'Документы'" @add="addDocument" />
              </template>
              <div v-for="pageDocument in page.pageDocuments" :key="pageDocument.id">
                <el-form-item>
                  <el-input v-model="pageDocument.document.name" placeholder="Название документа"> </el-input>
                </el-form-item>
                <el-form-item>
                  <el-upload
                    ref="uploader"
                    action="#"
                    :auto-upload="false"
                    :limit="1"
                    :multiple="false"
                    accept="application/pdf"
                    :show-file-list="false"
                    @change="(file) => pageDocument.document.addFile(file)"
                  >
                    <el-popover placement="top-start" :width="200" trigger="hover" :content="pageDocument.document.fileInfo.originalName">
                      <template #reference>
                        <el-button>{{ pageDocument.document.fileInfo.originalName ? 'Заменить файл' : 'Приложить файл' }}</el-button>
                      </template>
                    </el-popover>
                  </el-upload>
                </el-form-item>
              </div>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
      <el-row>
        <el-card>
          <AdminGallery :store-module="'pages'" />
        </el-card>
      </el-row>
    </el-form>
  </div>
  <ImageCropper />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminGallery from '@/components/admin/AdminGallery.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IPage from '@/interfaces/page/IPage';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { AdminGallery, WysiwygEditor, CardHeader, ImageCropper },
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
        ],
      },
    };
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const page: Ref<IPage> = computed(() => store.getters['pages/page']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadNewsItem();
      store.commit('admin/closeLoading');
    });

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await store.dispatch('pages/getBySlug', route.params['slug']);
        store.commit('admin/setHeaderParams', { title: page.value.title, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('pages/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить страницу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(page, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['slug']) {
        await store.dispatch('pages/create', page.value);
        await router.push('/admin/pages');
        return;
      }
      await store.dispatch('pages/update', page.value);
      next ? next() : await router.push('/admin/pages');
    };

    const addDocument = () => store.commit('pages/addDocument');

    return {
      addDocument,
      editorOption,
      mounted,
      submit,
      page,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
