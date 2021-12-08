<template>
  <div class="wrapper">
    <el-form ref="form" :key="news" :model="news" :rules="rules">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>Заголовок</template>
              <el-form-item prop="title">
                <el-input v-model="news.title" placeholder="Заголовок"></el-input>
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
                ></QuillEditor>
              </el-form-item>
            </el-card>
            <AdminNewsPageMainImage v-if="mounted" />
            <AdminNewsPageGallery v-if="mounted" />
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <!-- <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button> -->
            <el-card>
              <template #header>Статус</template>
              <el-space direction="vertical" alignment="start" :size="10">
                <el-form-item prop="publishedOn">
                  <el-date-picker v-model="news.publishedOn" format="DD.MM.YYYY H:m:s" type="datetime" placeholder="Дата публикации" />
                </el-form-item>
              </el-space>
            </el-card>
            <AdminNewsPageTags />
            <AdminNewsPagePreviewImage v-if="mounted" title="Загрузить превью новости" />
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
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import NewsRules from '@/classes/news/NewsRules';
import AdminNewsPageEvent from '@/components/admin/AdminNews/AdminNewsPageEvent.vue';
import AdminNewsPageGallery from '@/components/admin/AdminNews/AdminNewsPageGallery.vue';
import AdminNewsPageMainImage from '@/components/admin/AdminNews/AdminNewsPageMainImage.vue';
import AdminNewsPagePreviewImage from '@/components/admin/AdminNews/AdminNewsPagePreviewImage.vue';
import AdminNewsPageTags from '@/components/admin/AdminNews/AdminNewsPageTags.vue';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import INews from '@/interfaces/news/INews';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminNewsPage',
  components: {
    AdminNewsPageEvent,
    ImageCropper,
    QuillEditor,
    AdminNewsPageTags,
    AdminNewsPagePreviewImage,
    AdminNewsPageGallery,
    AdminNewsPageMainImage,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    let isCropGalleryOpen = ref(false);
    const form = ref();
    const rules = ref(NewsRules);

    const galleryList = computed(() => store.getters[`news/galleryList`]);
    const news: Ref<INews> = computed(() => store.getters['news/newsItem']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
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
      if (!news.value.fileInfo.fileSystemPath) {
        ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
        saveButtonClick.value = false;
        return;
      }
      if (!news.value.mainImage.originalName) {
        ElMessage({ message: 'Пожалуйста, добавьте основную картинку', type: 'error' });
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
      mounted,
      isCropGalleryOpen,
      galleryList,
      submit,
      news,
      rules,
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
