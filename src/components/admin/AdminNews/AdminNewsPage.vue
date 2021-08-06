<template>
  <div class="wrapper">
    <el-form :model="news" ref="form" :rules="rules" :key="news">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
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
                  style="min-height: 200px; max-height: 700px"
                  v-model:content="news.content"
                  contentType="html"
                  theme="snow"
                ></QuillEditor>
              </el-form-item>
            </el-card>
            <AdminNewsPageMainImage
              v-if="mounted"
              :fileList="mainImage"
              :fileInfo="news.mainImage"
              @toggleUpload="toggleUploadMain"
              @handlePictureCardPreview="handlePictureCardPreviewMain"
            />
            <AdminNewsPageGallery
              :fileList="galleryList"
              @toggleUpload="toggleUploadGallery"
              @handlePictureCardPreview="handlePictureCardPreviewGallery"
              @handleRemove="removeFromGallery"
            />
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
          <el-container direction="vertical">
            <el-button @click="submit" type="success" style="margin-bottom: 20px">Сохранить</el-button>
            <el-card>
              <template #header>Статус</template>
              <el-space direction="vertical" alignment="start" :size="10">
                <el-form-item prop="publishedOn">
                  <el-date-picker format="DD.MM.YYYY H:m:s" v-model="news.publishedOn" type="datetime" placeholder="Дата публикации" />
                </el-form-item>
              </el-space>
            </el-card>
            <AdminNewsPageTags />
            <AdminNewsPagePreviewImage
              v-if="mounted"
              :fileList="fileList"
              :fileInfo="news.fileInfo"
              @toggleUpload="toggleUpload"
              @handlePictureCardPreview="handlePictureCardPreview"
            />
          </el-container>
        </el-col>
      </el-row>
      <el-row>
        <el-container direction="vertical"> </el-container>
      </el-row>
    </el-form>

    <el-dialog v-model="isCropOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <ImageCropper :src="imageCropSrc" @save="saveFromCropper" @cancel="cancelCropper" :ratio="1" />
    </el-dialog>

    <el-dialog v-model="isCropMainOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <ImageCropper :src="imageCropSrcMain" @save="saveFromCropperMain" @cancel="cancelCropper" :ratio="2 / 1" />
    </el-dialog>

    <el-dialog v-model="isCropGalleryOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <ImageCropper :src="imageCropSrcGallery" @save="saveFromCropperGallery" @cancel="cancelCropper" :ratio="8 / 3.3" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { QuillEditor } from '@vueup/vue-quill';
import { v4 as uuidv4 } from 'uuid';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FileInfo from '@/classes/File/FileInfo';
import News from '@/classes/news/News';
import IFilesList from '@/interfaces/files/IFIlesList';
import NewsRules from '@/classes/news/NewsRules';
import INewsImage from '@/interfaces/news/INewsImage';
import NewsImage from '@/classes/news/NewsImage';
import AdminNewsPageTags from '@/components/admin/AdminNews/AdminNewsPageTags.vue';
import AdminNewsPagePreviewImage from '@/components/admin/AdminNews/AdminNewsPagePreviewImage.vue';
import AdminNewsPageGallery from '@/components/admin/AdminNews/AdminNewsPageGallery.vue';
import AdminNewsPageMainImage from '@/components/admin/AdminNews/AdminNewsPageMainImage.vue';
export default defineComponent({
  name: 'AdminNewsPage',
  components: { ImageCropper, QuillEditor, AdminNewsPageTags, AdminNewsPagePreviewImage, AdminNewsPageGallery, AdminNewsPageMainImage },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let isCropOpen = ref(false);
    let mounted = ref(false);
    let isCropGalleryOpen = ref(false);
    let isCropMainOpen = ref(false);
    let imageCropSrc = ref('');
    let imageCropSrcMain = ref('');
    let imageCropSrcGallery = ref('');
    let curGalleryCropIndex = ref(0);
    let uploader = ref();
    const form = ref();
    const rules = ref(NewsRules);

    let fileList: Ref<IFilesList[]> = ref([]);
    let mainImage: Ref<IFilesList[]> = ref([]);
    let galleryList: Ref<IFilesList[]> = ref([]);

    const news = computed(() => store.getters['news/newsItem']);

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await store.dispatch('news/get', route.params['slug']);
        store.commit('admin/setPageTitle', news.value.title);
        fileToUpload();
      } else {
        store.commit('news/set', new News());
        store.commit('admin/setPageTitle', 'Добавить новость');
      }
      mounted.value = true;
    };

    onMounted(loadNewsItem);

    const fileToUpload = () => {
      if (news.value.fileInfo?.fileSystemPath) {
        fileList.value.push({ name: news.value.fileInfo, url: news.value.fileInfo.getImageUrl() });
      }
      if (news.value.mainImage?.fileSystemPath) {
        mainImage.value.push({ name: news.value.mainImage, url: news.value.mainImage.getImageUrl() });
      }
      galleryList.value = news.value.newsImages.map((image: INewsImage) => {
        if (image.fileInfo)
          return { name: image.fileInfo?.fileSystemPath, url: `${process.env.VUE_APP_STATIC_URL}/${image.fileInfo?.fileSystemPath}` };
      });
    };

    const toggleUpload = (url: string) => {
      imageCropSrc.value = url;
      isCropOpen.value = true;
    };

    const toggleUploadMain = (url: string) => {
      imageCropSrcMain.value = url;
      isCropMainOpen.value = true;
    };

    const removeFromGallery = (file: any) => {
      const index = galleryList.value.findIndex((i) => i.name === file.name);
      if (index > -1) {
        galleryList.value.splice(index, 1);
        news.value.newsImagesForDelete.push(news.value.newsImages[index].id);
        news.value.newsImages.splice(index, 1);
      }
    };

    const toggleUploadGallery = (file: any) => {
      const image = new FileInfo({
        originalName: file.name,
        file: file.raw,
        fileSystemPath: uuidv4(),
        category: 'gallery',
      });
      news.value.newsImagesNames.push(image.fileSystemPath);
      news.value.newsImages.push(new NewsImage({ fileInfo: image }));
      curGalleryCropIndex.value = news.value.newsImages.length - 1;
      imageCropSrcGallery.value = file.url;
      isCropGalleryOpen.value = true;
    };

    const saveFromCropperGallery = (file: any) => {
      news.value.newsImages[curGalleryCropIndex.value].fileInfo.file = file.blob;
      news.value.newsImages[curGalleryCropIndex.value].fileInfo.category = 'gallery';
      isCropGalleryOpen.value = false;
      galleryList.value[curGalleryCropIndex.value] = {
        name: news.value.newsImages[curGalleryCropIndex.value].fileInfo.fileSystemPath,
        url: file.src,
      };
    };

    const saveFromCropper = (file: any) => {
      news.value.fileInfo.file = file.blob;
      news.value.fileInfo.category = 'previewFile';
      fileList.value = [];
      isCropOpen.value = false;
      fileList.value.push({ name: news.value.fileInfo.fileSystemPath, url: file.src });
    };

    const saveFromCropperMain = (file: any) => {
      news.value.mainImage.file = file.blob;
      news.value.mainImage.category = 'mainImage';
      mainImage.value = [];
      isCropMainOpen.value = false;
      mainImage.value.push({ name: news.value.mainImage.fileSystemPath, url: file.src });
    };

    const cancelCropper = () => {
      isCropOpen.value = false;
      isCropGalleryOpen.value = false;
      isCropMainOpen.value = false;
    };

    const handlePictureCardPreview = (file: any) => {
      imageCropSrc.value = file.url;
      isCropOpen.value = true;
    };

    const handlePictureCardPreviewMain = (file: any) => {
      imageCropSrcMain.value = file.url;
      isCropMainOpen.value = true;
    };

    const handlePictureCardPreviewGallery = (file: any) => {
      const index = galleryList.value.findIndex((f) => f.name === file.name);
      if (index > -1) curGalleryCropIndex.value = index;
      imageCropSrc.value = file.url;
      isCropGalleryOpen.value = true;
    };

    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        valid ? (validationResult = true) : (validationResult = false);
      });
      if (!validationResult) return;
      if (!news.value.fileInfo.fileSystemPath) {
        ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
        return;
      }
      if (!news.value.mainImage.originalName) {
        ElMessage({ message: 'Пожалуйста, добавьте основную картинку', type: 'error' });
        return;
      }
      news.value.createSlug();
      if (!route.params['slug']) {
        await store.dispatch('news/create', news.value);
        await router.push('/admin/news');
        return;
      }
      await store.dispatch('news/update', news.value);
      await router.push('/admin/news');
    };

    return {
      handlePictureCardPreviewMain,
      imageCropSrcMain,
      imageCropSrcGallery,
      saveFromCropperMain,
      isCropMainOpen,
      toggleUploadMain,
      mainImage,
      mounted,
      removeFromGallery,
      handlePictureCardPreviewGallery,
      saveFromCropperGallery,
      isCropGalleryOpen,
      toggleUploadGallery,
      galleryList,
      fileList,
      uploader,
      handlePictureCardPreview,
      saveFromCropper,
      submit,
      isCropOpen,
      news,
      toggleUpload,
      imageCropSrc,
      rules,
      form,
      cancelCropper,
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
