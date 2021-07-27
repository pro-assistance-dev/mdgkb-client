<template>
  <el-form :model="carousel">
    {{ carousel.carouselSlides }}
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
            <el-input v-model="carousel.key" placeholder="Ключ"></el-input>
          </el-form-item>
        </el-card>
      </el-col>
      <el-col :xl="2" :offset="1">
        <el-button @click="submit" type="success" style="margin-bottom: 20px">Сохранить</el-button>
      </el-col>
    </el-row>
    <el-row class="row-slides">
      <el-col style="height: 100%">
        <el-card class="content-card" style="height: 100%">
          <template #header>
            <span>Слайды</span>
            <el-button @click="addSlide" type="success" icon="el-icon-plus" circle></el-button>
          </template>
          <el-tabs @tab-click="chooseSlide" style="height: 100%" type="border-card" v-model="activeTab" :tab-position="'left'">
            <el-tab-pane
              @click="chooseSlide(i)"
              @change="chooseSlide(i)"
              @tab-click="chooseSlide(i)"
              v-for="(slide, i) in carousel.carouselSlides"
              :key="slide.id"
              :label="slide.title"
              :name="slide.id"
            >
              <template #label>
                <div>
                  <span style="width: 500px">{{ slide.title }}</span>
                </div>
              </template>
              <el-row>
                <el-upload
                  :file-list="fileList"
                  ref="uploader"
                  :multiple="false"
                  class="avatar-uploader-cover upload-demo"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="parseInt('1')"
                  :on-change="toggleUpload"
                  :class="{ hideUpload: !showUpload }"
                >
                  <template #default>
                    <i class="el-icon-plus"></i>
                  </template>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    </div>
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </template>
                </el-upload>
              </el-row>
              <el-row :gutter="20">
                <el-col :xl="10">
                  <el-form-item><el-input v-model="slide.title" placeholder="Заголовок"></el-input></el-form-item>
                </el-col>
                <el-col :xl="10" :offset="2">
                  {{ nowSlide }}
                  <el-form-item>
                    <QuillEditor style="height: 250px" v-model:content="slide.content" contentType="html" theme="snow"></QuillEditor>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-form>

  <el-dialog v-model="cropOpen">
    <ImageCropper :ratio="19 / 3" :src="imageCropSrc" @save="saveFromCropper" />
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CarouselSlide from '@/classes/carousel/CarouselSlide';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FileInfo from '@/classes/File/FileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'AdminCarouselPage',
  components: { ImageCropper, QuillEditor },
  async setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let showUpload = ref(true);
    let cropOpen = ref(false);
    let tagsVisible = ref(false);
    let imageCropSrc = ref('');
    let uploader = ref();
    let activeTab = ref('');
    let nowSlide = ref(0);
    let carousel = computed(() => store.getters['carousels/item']);

    if (route.params.id) {
      await store.dispatch('carousels/get', route.params['id']);
      carousel = computed(() => store.getters['carousels/item']);
    }

    let fileList: Ref<IFilesList[]> = ref([]);

    const fileToUpload = () => {
      if (carousel.value.fileInfo && carousel.value.fileInfo.fileSystemPath != '') {
        fileList.value.push({
          name: carousel.value.fileInfo,
          url: `${process.env.VUE_APP_STATIC_URL}/${carousel.value.fileInfo?.fileSystemPath}`,
        });
        if (fileList.value.length > 0) showUpload.value = false;
      }
    };

    const addSlide = () => {
      let slide = new CarouselSlide();
      slide.title = 'Новый слайд ' + carousel.value.carouselSlides.length.toString();
      carousel.value.carouselSlides.push(slide);
    };

    const toggleUpload = (file: any) => {
      if (!nowSlide.value) nowSlide.value = 0;
      if (!carousel.value.carouselSlides[nowSlide.value].fileInfo) {
        carousel.value.carouselSlides[nowSlide.value].fileInfo = new FileInfo();
      }
      showUpload.value = !showUpload.value;
      carousel.value.carouselSlides[nowSlide.value].fileInfo = new FileInfo({
        id: carousel.value.carouselSlides[nowSlide.value].fileInfo.id,
        originalName: file.name,
        file: file.raw,
        fileSystemPath: file.name,
        category: 'file',
      });

      imageCropSrc.value = file.url;
      cropOpen.value = true;
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

    const saveFromCropper = (file: any) => {
      if (!nowSlide.value) nowSlide.value = 0;
      carousel.value.carouselSlides[nowSlide.value].fileInfo.file = file.blob;
      carousel.value.carouselSlides[nowSlide.value].fileInfo.originalName = uuidv4();
      fileList.value = [];
      cropOpen.value = false;
      fileList.value.push({ name: carousel.value.carouselSlides[nowSlide.value].fileInfo.fileSystemPath, url: file.src });
      if (fileList.value.length > 0) showUpload.value = false;
    };

    const handleRemove = (file: File) => {
      uploader.value.clearFiles();
      setTimeout(() => {
        showUpload.value = !showUpload.value;
      }, 800);
    };

    const handlePictureCardPreview = (file: any) => {
      imageCropSrc.value = file.url;
      cropOpen.value = true;
    };
    const chooseSlide = (slideIndex: any) => {
      nowSlide.value = slideIndex.paneName;
    };

    fileToUpload();
    return {
      fileList,
      nowSlide,
      chooseSlide,
      activeTab,
      addSlide,
      tagsVisible,
      uploader,
      handlePictureCardPreview,
      handleRemove,
      saveFromCropper,
      submit,
      cropOpen,
      carousel,
      showUpload,
      toggleUpload,
      imageCropSrc,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.row-slides) {
  height: 100%;
  margin-top: 50px;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 100%;
  background: white;
}

:deep(.el-upload) {
  width: 100%;
  height: 100%;
  background: white;
}

.upload-demo {
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  background: white;
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
</style>
