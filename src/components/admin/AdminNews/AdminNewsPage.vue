<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="news" :model="news" label-position="top" :rules="rules">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <el-form-item prop="title" label="Заголовок:">
                <el-input v-model="news.title" placeholder="Заголовок" />
              </el-form-item>
              <el-form-item prop="previewText" label="Превью новости:">
                <el-input v-model="news.previewText" placeholder="Превью новости" type="textarea" :autosize="{ minRows: 2 }" />
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header> Контент </template>
              <el-form-item prop="content">
                <WysiwygEditor v-model="news.content" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Основное изображение </template>
              <el-form-item prop="mainImage.fileSystemPath" :rules="rules.mainImage">
                <UploaderSingleScan
                  :file-info="news.mainImage"
                  :height="200"
                  @remove-file="news.removeMainImage()"
                  @ratio="(e) => (element.ratio = e)"
                />
              </el-form-item>
              <el-form-item prop="mainImageDescription" label="Описание:">
                <el-input v-model="news.mainImageDescription" placeholder="Описание" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Галерея </template>
              <AdminGallery :file-list="news.newsImages" :file-list-for-delete="news.newsImagesForDelete" @add-image="news.addImage()" />
            </el-card>
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <el-card>
              <template #header> Время и статус публикации </template>
              <el-form-item label="Черновик" prop="isDraft">
                <el-switch v-model="news.isDraft" active-text="Да" inactive-text="Нет" />
              </el-form-item>
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
                <UploaderSingleScan
                  :file-info="news.previewImage"
                  :height="300"
                  @remove-file="news.removePreviewImage()"
                  @ratio="(e) => (element.ratio = e)"
                />
              </el-form-item>
            </el-card>
            <AdminNewsDoctors />
          </el-container>
        </el-col>
      </el-row>
      <AdminNewsPageEvent />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import NewsRules from '@/classes/news/NewsRules';
import AdminNewsDoctors from '@/components/admin/AdminNews/AdminNewsDoctors.vue';
import AdminNewsPageEvent from '@/components/admin/AdminNews/AdminNewsPageEvent.vue';
import AdminNewsPageTags from '@/components/admin/AdminNews/AdminNewsPageTags.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import INews from '@/interfaces/news/INews';
import AdminGallery from '@/services/components/AdminGallery.vue';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminNewsPage',
  components: {
    AdminGallery,
    UploaderSingleScan,
    AdminNewsPageEvent,
    WysiwygEditor,
    AdminNewsPageTags,
    AdminNewsDoctors,
  },
  setup() {
    const route = useRoute();
    let isCropGalleryOpen = ref(false);
    const form = ref();
    const rules = ref(NewsRules);

    const galleryList = computed(() => Provider.store.getters[`news/galleryList`]);
    const news: Ref<INews> = computed(() => Provider.store.getters['news/newsItem']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!route.params['slug']) {
        await Provider.store.dispatch('news/create', news.value);
        await Provider.router.push('/admin/news');
        return;
      }
      await Provider.store.dispatch('news/update', news.value);
      next ? next() : Provider.router.push('/admin/news');
    };

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await Provider.store.dispatch('news/get', route.params['slug']);
        Provider.store.commit('admin/setHeaderParams', {
          title: news.value.title,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        Provider.store.commit('news/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить новость', showBackButton: true, buttons: [{ action: submit }] });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(news, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(loadNewsItem);

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      mounted: Provider.mounted,
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
