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
            <el-card>
              <template #header>
                <div class="flex-row-between">
                  <span> Тэги </span>
                  <el-popover placement="top" :width="160" :visible="tagsVisible">
                    <el-input v-model="tag.label" />
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="createTag">Создать</el-button>
                      <el-button type="primary" size="mini" @click="tagsVisible = false">Отмена</el-button>
                    </div>
                    <template #reference>
                      <el-button size="small" @click="tagsVisible = !tagsVisible" type="success" icon="el-icon-plus" circle></el-button>
                    </template>
                  </el-popover>
                </div>
              </template>

              <el-form-item>
                <div class="vertical-wrap">
                  <el-checkbox
                    :checked="findTag(tag.id)"
                    icon="el-icon-arrow-left"
                    @change="chooseTag(tag)"
                    v-for="tag in tags"
                    :key="tag.id"
                    :label="tag.label"
                    border
                    >{{ tag.label }} <i @click.prevent="removeTag(tag.id)" class="el-icon-close delete-tag-icon"></i
                  ></el-checkbox>
                </div>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Загрузить превью новости </template>
              <el-upload
                ref="uploader"
                :multiple="false"
                class="avatar-uploader-cover"
                action="#"
                list-type="picture-card"
                :file-list="fileList"
                :auto-upload="false"
                :limit="parseInt('1')"
                :on-change="toggleUpload"
                :class="{ hideUpload: !showUpload }"
                accept="image/jpeg,image/png,image/jng"
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
                    <!--                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">-->
                    <!--                    <i class="el-icon-download"></i>-->
                    <!--                  </span>-->
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </template>
              </el-upload>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
      <el-row>
        <el-container>
          <el-card class="galerry">
            <template #header> Галерея </template>
            <el-upload
              ref="uploader"
              :multiple="false"
              class="avatar-uploader"
              action="#"
              list-type="picture-card"
              :file-list="galleryList"
              :auto-upload="false"
              :on-change="toggleUploadGallery"
              accept="image/jpeg,image/png,image/jng"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
            </el-upload>
          </el-card>
        </el-container>
      </el-row>
    </el-form>

    <el-dialog v-model="isCropGalleryOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <ImageCropper :src="imageCropSrc" @save="saveFromCropperGallery" @cancel="cancelCropper" :ratio="1" />
    </el-dialog>

    <el-dialog v-model="isCropOpen" title="Кроппер" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <ImageCropper :src="imageCropSrc" @save="saveFromCropper" @cancel="cancelCropper" :ratio="1" />
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
import ITag from '@/interfaces/news/ITag';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FileInfo from '@/classes/File/FileInfo';
import News from '@/classes/news/News';
import IFilesList from '@/interfaces/files/IFIlesList';
import NewsRules from '@/classes/news/NewsRules';
import INewsImage from '@/interfaces/news/INewsImage';
import NewsImage from '@/classes/news/NewsImage';

export default defineComponent({
  name: 'AdminNewsPage',
  components: { ImageCropper, QuillEditor },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let showUpload = ref(true);
    let isCropOpen = ref(false);
    let isCropGalleryOpen = ref(false);
    let tagsVisible = ref(false);
    let imageCropSrc = ref('');
    let curGalleryCropIndex = ref(0);
    let uploader = ref();
    const form = ref();
    const rules = ref(NewsRules);

    let fileList: Ref<IFilesList[]> = ref([]);
    let galleryList: Ref<IFilesList[]> = ref([]);

    const news = computed(() => store.getters['news/newsItem']);

    const loadNewsItem = async () => {
      await store.dispatch('tags/getAll');
      if (route.params['slug']) {
        await store.dispatch('news/get', route.params['slug']);
        store.commit('admin/setPageTitle', news.value.title);
        fileToUpload();
      } else {
        store.commit('news/set', new News());
        store.commit('admin/setPageTitle', 'Добавить новость');
      }
    };

    onMounted(loadNewsItem);

    const fileToUpload = () => {
      if (news.value.fileInfo?.fileSystemPath != '') {
        fileList.value.push({ name: news.value.fileInfo, url: `${process.env.VUE_APP_STATIC_URL}/${news.value.fileInfo?.fileSystemPath}` });
        if (fileList.value.length > 0) showUpload.value = false;
      }
      galleryList.value = news.value.newsImages.map((image: INewsImage) => {
        if (image.fileInfo)
          return { name: image.fileInfo?.fileSystemPath, url: `${process.env.VUE_APP_STATIC_URL}/${news.value.fileInfo?.fileSystemPath}` };
      });
    };

    let tags = computed(() => store.getters['tags/items']);
    let tag = computed(() => store.getters['tags/item']);

    const toggleUpload = (file: any) => {
      showUpload.value = !showUpload.value;

      news.value.fileInfo = new FileInfo({
        id: news.value.fileInfo.id,
        originalName: file.name,
        file: file.raw,
        fileSystemPath: file.name,
        category: 'previewFile',
      });

      imageCropSrc.value = file.url;
      isCropOpen.value = true;
    };

    const toggleUploadGallery = (file: any) => {
      const image = new FileInfo({
        id: news.value.fileInfo.id,
        originalName: file.name,
        file: file.raw,
        fileSystemPath: file.name,
        category: 'gallery',
      });
      news.value.newsImages.push(new NewsImage({ fileInfo: image }));
      curGalleryCropIndex.value = news.value.newsImages.length - 1;
      imageCropSrc.value = file.url;
      isCropGalleryOpen.value = true;
    };

    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;
      if (!news.value.fileInfo.fileSystemPath) {
        ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
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

    const createTag = async () => {
      tagsVisible.value = false;
      await store.dispatch('tags/create', tag.value);
      // TODO переписать tags/create на сервере, чтобы возвращал id в том числе, чтобы не делать tags/getAll
      await store.dispatch('tags/getAll');
    };

    const chooseTag = async (tag: ITag) => {
      const index = news.value.tags.findIndex((t: ITag) => tag.id === t.id);
      index === -1 ? news.value.tags.push(tag) : news.value.tags.splice(index, 1);
    };

    const removeTag = async (tagId: string) => {
      await store.dispatch('tags/remove', tagId);
    };

    const findTag = (tagId: string): boolean => {
      const index = news.value.tags.findIndex((tag: ITag) => tag.id === tagId);
      return index > -1;
    };

    const saveFromCropperGallery = (file: any) => {
      news.value.newsImages[curGalleryCropIndex.value].fileInfo.file = file.blob;
      news.value.newsImages[curGalleryCropIndex.value].fileInfo.originalName = uuidv4();
      isCropGalleryOpen.value = false;
      galleryList.value[curGalleryCropIndex.value] = {
        name: news.value.newsImages[curGalleryCropIndex.value].fileInfo.fileSystemPath,
        url: file.src,
      };
    };

    const saveFromCropper = (file: any) => {
      news.value.fileInfo.file = file.blob;
      news.value.fileInfo.originalName = uuidv4();
      fileList.value = [];
      isCropOpen.value = false;
      fileList.value.push({ name: news.value.fileInfo.fileSystemPath, url: file.src });
      if (fileList.value.length > 0) showUpload.value = false;
    };

    const cancelCropper = () => {
      handleRemove();
      fileList.value = [];
      isCropOpen.value = false;
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      setTimeout(() => {
        showUpload.value = !showUpload.value;
      }, 800);
    };

    const handlePictureCardPreview = (file: any) => {
      imageCropSrc.value = file.url;
      isCropOpen.value = true;
    };

    return {
      saveFromCropperGallery,
      isCropGalleryOpen,
      toggleUploadGallery,
      galleryList,
      fileList,
      findTag,
      removeTag,
      chooseTag,
      createTag,
      tags,
      tag,
      tagsVisible,
      uploader,
      handlePictureCardPreview,
      handleRemove,
      saveFromCropper,
      submit,
      isCropOpen,
      news,
      showUpload,
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
.galerry {
  width: 100%;
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
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
