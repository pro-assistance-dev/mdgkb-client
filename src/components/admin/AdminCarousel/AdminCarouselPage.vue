<template>
  <el-form :model="carousel">
    <el-row :gutter="10">
      <el-col :xl="10">
        <el-card>
          <el-form-item>
            <el-input v-model="carousel.title" placeholder="Название карусели"></el-input>
          </el-form-item>
        </el-card>
      </el-col>
      <el-col :xl="9" :offset="1">
        <el-card>
          <el-form-item>
            <el-input v-model="carousel.systemKey" placeholder="Ключ"></el-input>
          </el-form-item>
        </el-card>
      </el-col>
      <!-- <el-col :xl="2" :offset="1">
        <el-button type="success" style="margin-bottom: 20px;" @click="submit">Сохранить</el-button>
      </el-col> -->
    </el-row>
    <el-row class="row-slides">
      <el-col style="height: 100%">
        <el-card class="content-card" style="height: 100%">
          <template #header>
            <div class="flex-row-between">
              <span style="text-align: left">Слайды</span>
              <div>
                <el-button type="success" icon="el-icon-plus" circle @click="addSlide"></el-button>
              </div>
            </div>
          </template>
          <div v-for="(slide, i) in carousel.carouselSlides" :key="slide.id">
            <el-row style="text-align: center">
              <el-col :span="16">
                <el-upload
                  :ref="
                    (el) => {
                      if (el) uploaders[i] = el;
                    }
                  "
                  :file-list="fileLists[i]"
                  :multiple="false"
                  accept="image/jpeg,image/png"
                  class="avatar-uploader-cover upload-demo"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="parseInt('1')"
                  :class="{ hideUpload: !showUpload[i] }"
                  @click="nowSlide = i"
                  @change="toggleUpload"
                >
                  <template #default>
                    <i class="el-icon-plus custom-plus"></i>
                  </template>
                  <template #file="{ file }">
                    <div class="carousel-container">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <div class="carousel-body">
                        <div class="carousel-title" v-html="$sanitize(slide.title)" />
                        <div class="carousel-content" v-html="slide.content" />
                        <button v-if="slide.buttonShow" :style="{ background: slide.buttonColor }" class="carousel-button">
                          Подробнее
                        </button>
                      </div>
                    </div>
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="openCropper(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file, i)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </template>
                </el-upload>
                <el-row style="text-align: center">
                  <el-col :span="4" :offset="2">
                    <el-form-item :label-width="60" label="Показать кнопку:">
                      <el-checkbox v-model="slide.buttonShow"></el-checkbox>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="slide.buttonShow" :span="4">
                    <el-form-item label-width="60" label="Цвет кнопки">
                      <el-color-picker v-model="slide.buttonColor"></el-color-picker>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="slide.buttonShow" :span="12">
                    <el-form-item label-width="60" label="Ссылка">
                      <el-input v-model="slide.link" placeholder="Ссылка"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="1" :offset="2">
                    <el-button type="danger" @click="removeSlide(i)">Удалить слайд</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <QuillEditor
                    v-model:content="slide.title"
                    :options="editorOptions"
                    style="height: 100px"
                    content-type="html"
                    theme="snow"
                  ></QuillEditor
                ></el-form-item>
                <el-form-item>
                  <QuillEditor
                    v-model:content="slide.content"
                    :options="editorOptions"
                    style="height: 200px"
                    content-type="html"
                    theme="snow"
                  ></QuillEditor>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider v-if="i < carousel.carouselSlides.length" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-form>

  <ImageCropper />
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import sanitizeHtml from 'sanitize-html';
import { computed, defineComponent, onBeforeMount, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CarouselSlide from '@/classes/carousel/CarouselSlide';
import Cropper from '@/classes/cropper/Cropper';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
import IFile from '@/interfaces/files/IFile';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'AdminCarouselPage',
  components: { ImageCropper, QuillEditor },
  setup() {
    const editorOptions = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      },
    };

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let showUpload = ref([true]);
    let tagsVisible = ref(false);
    let uploaders = ref([]);
    let activeTab = ref('');
    let carousel = computed(() => store.getters['carousels/item']);

    let fileLists: Ref<Array<IFilesList[]>> = computed(() => store.getters['carousels/fileLists']);
    let nowSlide: Ref<number> = computed(() => store.getters['carousels/nowSlide']);

    onBeforeMount(() => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
    });

    const loadCarouselItem = async () => {
      store.commit('admin/setPageTitle', { title: 'Карусель', saveButton: true });
      if (route.params.id) {
        await store.dispatch('carousels/get', route.params['id']);
        carousel = computed(() => store.getters['carousels/item']);
      }
      carousel.value.carouselSlides.forEach((slide: ICarouselSlide, i: number) => {
        if (fileLists.value[i].length > 0) showUpload.value[i] = false;
      });
    };

    onMounted(loadCarouselItem);

    const addSlide = () => {
      let slide = new CarouselSlide();
      slide.title = 'Новый слайд ' + carousel.value.carouselSlides.length.toString();
      carousel.value.carouselSlides.push(slide);
      showUpload.value.push(true);
      fileLists.value.push([]);
    };

    const openCropper = (file: IFile) => {
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'carousels', 'saveFromCropper', 1300 / 300));
    };

    const toggleUpload = (file: IFile) => {
      if (!nowSlide.value) nowSlide.value = 0;
      showUpload.value[nowSlide.value] = !showUpload.value;
      store.commit('carousels/setSlide', file);
      openCropper(file);
    };

    const submit = async () => {
      if (!route.params['id']) {
        await store.dispatch('carousels/create', carousel.value);
        await router.push('/admin/carousels');
        return;
      }
      await store.dispatch('carousels/update', carousel.value);
      await router.push('/admin/carousels');
    };

    const saveFromCropper = (file: IFile) => {
      if (!nowSlide.value) nowSlide.value = 0;
      carousel.value.carouselSlides[nowSlide.value].fileInfo.file = file.blob;
      carousel.value.carouselSlides[nowSlide.value].fileInfo.category = 'slide';
      if (fileLists.value[nowSlide.value].length > 0) showUpload.value[nowSlide.value] = false;
    };

    const handleRemove = (file: File, i: number) => {
      fileLists.value[i] = [];
      setTimeout(() => {
        showUpload.value[i] = !showUpload.value[i];
      }, 800);
    };

    const handlePictureCardPreview = (file: IFile): void => {
      openCropper(file);
    };

    const removeSlide = (i: number) => {
      if (carousel.value.carouselSlides[i].id) {
        carousel.value.carouselSlidesForDelete.push(carousel.value.carouselSlides[i].id);
      }
      carousel.value.carouselSlides.splice(i, 1);
      fileLists.value.splice(i, 1);
    };

    return {
      sanitizeHtml,
      removeSlide,
      editorOptions,
      openCropper,
      fileLists,
      nowSlide,
      activeTab,
      addSlide,
      tagsVisible,
      uploaders,
      handlePictureCardPreview,
      handleRemove,
      saveFromCropper,
      submit,
      carousel,
      showUpload,
      toggleUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 1300px;
$news-content-max-height: 300px;

.color-picker-input {
  margin: 0;
  text-align: left;
  position: relative;
  vertical-align: middle;

  .label {
    display: inline-block;
    vertical-align: middle;
  }
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.row-slides) {
  height: 100%;
  margin-top: 50px;
}

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  text-align: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}

.carousel-container {
  margin: 20px 80px;

  .carousel-body {
    overflow: hidden;
  }

  .carousel-title {
    margin-top: 0;
    z-index: 1;
    position: absolute;
  }

  .carousel-content {
    margin-top: 0px;
    font-size: 80%;
    z-index: 1;
    position: absolute;
  }

  img {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  .carousel-button {
    z-index: 1;
    position: absolute;
    left: 20px;
    bottom: 40px;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-left: 60px;
    border-radius: 30px;
    height: 40px;
    width: 150px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background-color: black;
      color: white;
    }
  }
}
</style>
