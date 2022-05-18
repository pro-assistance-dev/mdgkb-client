<template>
  <div class="wrapper">
    <el-form ref="form" :key="news" :model="news" label-position="top" :rules="rules">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item prop="title" label="Заголовок:">
                <el-input v-model="news.title" placeholder="Заголовок"></el-input>
              </el-form-item>
              <el-form-item prop="previewText" label="Превью новости:">
                <el-input v-model="news.previewText" placeholder="Превью новости" type="textarea" :autosize="{ minRows: 2 }"></el-input>
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header>Контент</template>
              <el-form-item prop="content">
                <QuillEditor
                  v-model:content="news.content"
                  style="min-height: 200px; max-height: 700px"
                  content-type="html"
                  theme="snow"
                  :options="editorOption"
                ></QuillEditor>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Основное изображение </template>
              <el-form-item prop="mainImage.fileSystemPath" :rules="rules.mainImage">
                <UploaderSingleScan :file-info="news.mainImage" :height="200" :width="400" @remove-file="news.removeMainImage()" />
              </el-form-item>
              <el-form-item prop="mainImageDescription" label="Описание:">
                <el-input v-model="news.mainImageDescription" placeholder="Описание"></el-input>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Галерея </template>
              <AdminGallery
                :file-list="news.newsImages"
                :file-list-for-delete="news.newsImagesForDelete"
                @add-element="news.addNewsImage()"
              />
            </el-card>
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
            <el-card>
              <template #header>Время и статус публикации</template>
              <el-space direction="vertical" alignment="start" :size="10">
                <el-form-item prop="publishedOn">
                  <el-date-picker v-model="news.publishedOn" format="DD.MM.YYYY HH:mm" type="datetime" placeholder="Дата публикации" />
                </el-form-item>
              </el-space>
            </el-card>
            <AdminNewsPageTags />
            <el-card>
              <template #header> Загрузить превью новости </template>
              <el-form-item prop="previewImage.fileSystemPath" :rules="rules.previewImage">
                <UploaderSingleScan :file-info="news.previewImage" :height="300" :width="300" @remove-file="news.removePreviewImage()" />
              </el-form-item>
            </el-card>
            <AdminNewsDoctors />
          </el-container>
        </el-col>
      </el-row>
      <AdminNewsPageEvent />
    </el-form>

    <ImageCropper />
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import NewsRules from '@/classes/news/NewsRules';
import AdminGallery from '@/components/admin/AdminGallery.vue';
import AdminNewsDoctors from '@/components/admin/AdminNews/AdminNewsDoctors.vue';
import AdminNewsPageEvent from '@/components/admin/AdminNews/AdminNewsPageEvent.vue';
import AdminNewsPageTags from '@/components/admin/AdminNews/AdminNewsPageTags.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import INews from '@/interfaces/news/INews';
import removeFromClass from '@/mixins/removeFromClass';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminNewsPage',
  components: {
    AdminGallery,
    UploaderSingleScan,
    AdminNewsPageEvent,
    ImageCropper,
    QuillEditor,
    AdminNewsPageTags,
    AdminNewsDoctors,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    let isCropGalleryOpen = ref(false);
    const form = ref();
    const rules = ref(NewsRules);
    const editorOption = {
      modules: {
        toolbar: [
          ['полужирный', 'курсив', 'подчеркивание', 'зачеркивание'], // полужирный, курсив, подчеркивание, зачеркивание
          ['blockquote'], // цитата, кодовый блок
          [{ header: 1 }, { header: 2 }], // Заголовок в виде пар ключ-значение; 1, 2 означает размер шрифта
          [{ script: 'sub' }, { script: 'super' }], // нижний индекс и нижний индекс
          [{ indent: '- 1' }, { indent: '+ 1' }], // отступ
          [{ direction: 'rtl' }], // направление текста
          [{ size: ['small', false, 'large', 'huge'] }], // размер шрифта
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Несколько уровней заголовка
          // [{ color: [] }, { background: [] }], // цвет шрифта, цвет фона шрифта
          // [{ font: [] }], // шрифт
          [{ align: [] }], // Выравнивание
          ['clean'], // Очистить стиль шрифта
          ['image', 'video'], // Загрузить изображения, загрузить видео
          ['link'],
        ],
      },
    };

    const galleryList = computed(() => store.getters[`news/galleryList`]);
    const news: Ref<INews> = computed(() => store.getters['news/newsItem']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('doctors/getAll');
      await loadNewsItem();
      store.commit('admin/closeLoading');
    });

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await store.dispatch('news/get', route.params['slug']);
        store.commit('admin/setHeaderParams', {
          title: news.value.title,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('news/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить новость', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(news, formUpdated, { deep: true });
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
        await store.dispatch('news/create', news.value);
        await router.push('/admin/news');
        return;
      }
      await store.dispatch('news/update', news.value);
      next ? next() : router.push('/admin/news');
    };

    return {
      removeFromClass,
      mounted,
      editorOption,
      isCropGalleryOpen,
      galleryList,
      submit,
      news,
      form,
      rules,
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
