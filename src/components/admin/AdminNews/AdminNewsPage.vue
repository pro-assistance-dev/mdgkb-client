<template>
  <el-form :model="news">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-container direction="vertical">
          <el-card>
            <template #header>Заголовок</template>
            <el-form-item>
              <el-input v-model="news.title" placeholder="Заголовок"></el-input>
            </el-form-item>
          </el-card>
          <el-card class="content-card">
            <template #header>Контент</template>
            <el-form-item>
              <QuillEditor style="height: 250px" v-model:content="news.content" contentType="html" theme="snow"></QuillEditor>
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
              <!--              <el-form-item>-->
              <!--                <el-select v-model="select" placeholder="Статус">-->
              <!--                  <el-option label="Черновик" value="Черновик"></el-option>-->
              <!--                  <el-option label="Опубликована" value="Опубликована"></el-option>-->
              <!--                  <el-option label="Запланировать дату" value="Запланировать дату"></el-option>-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
              <el-form-item>
                <el-date-picker
                  format="DD.MM.YYYY H:m:s"
                  v-model="news.publishedOn"
                  type="datetime"
                  placeholder="Дата публикации"
                  v-if="select !== 'Черновик'"
                />
              </el-form-item>
            </el-space>
          </el-card>
          <el-card>
            <template #header>
              Тэги
              <el-popover placement="top" :width="160" :visible="tagsVisible">
                <el-input v-model="tag.label" />
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="createTag">Создать</el-button>
                  <el-button type="primary" size="mini" @click="tagsVisible = false">Отмена</el-button>
                </div>
                <template #reference>
                  <el-button @click="tagsVisible = !tagsVisible" type="success" icon="el-icon-plus" circle></el-button>
                </template>
              </el-popover>
            </template>

            <el-form-item>
              <el-checkbox-group size="small" wrap style="width: 100%">
                <div class="vertical-wrap">
                  <el-checkbox-group v-model="news.tags">
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
                  </el-checkbox-group>
                </div>
              </el-checkbox-group>
            </el-form-item>
          </el-card>
          <el-card>
            <template #header> Загрузить картинку </template>
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
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </template>
            </el-upload>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>

  <el-dialog v-model="cropOpen">
    <ImageCropper :src="imageCropSrc" @save="saveFromCropper" :ratio="1" />
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import PreviewThumbnailFile from '@/classes/File/PreviewThumbnailFile';
import ImageCropper from '@/components/admin/ImageCropper.vue';
import ITag from '@/interfaces/news/ITag';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import FileInfo from '@/classes/File/FileInfo';

export default defineComponent({
  name: 'AdminNewsPage',
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
    interface IFilesList {
      name: string;
      url: string;
    }
    let fileList: Ref<IFilesList[]> = ref([]);

    let news = computed(() => store.getters['news/newsItem']);
    await store.dispatch('tags/getAll');
    if (route.params['slug']) {
      await store.dispatch('news/get', route.params['slug']);
      news = computed(() => store.getters['news/newsItem']);
    }
    const fileToUpload = () => {
      if (news.value.fileInfo?.filenameDisk != '') {
        fileList.value.push({ name: news.value.fileInfo, url: `${process.env.VUE_APP_STATIC_URL}/${news.value.fileInfo?.filenameDisk}` });
        if (fileList.value.length > 0) showUpload.value = false;
      }
    };

    let tags = computed(() => store.getters['tags/items']);
    let tag = computed(() => store.getters['tags/item']);

    const toggleUpload = (file: any) => {
      showUpload.value = !showUpload.value;

      news.value.fileInfo = new FileInfo({
        id: news.value.fileInfo.id,
        originalName: file.name,
        file: file.raw,
        filenameDisk: file.name,
        category: 'file',
      });

      imageCropSrc.value = file.url;
      cropOpen.value = true;
    };

    const submit = async () => {
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
    };

    const chooseTag = async (tag: ITag) => {
      const index = news.value.tags.findIndex((t: ITag) => tag.id === t.id);
      if (index === -1) {
        await store.dispatch('news/addTag', { tagId: tag.id, newsId: news.value.id });
        news.value.tags.push(tag);
      } else {
        await store.dispatch('news/removeTag', { tagId: tag.id, newsId: news.value.id });
        news.value.tags.splice(index, 1);
      }
    };

    const removeTag = async (tagId: string) => {
      await store.dispatch('tags/remove', tagId);
    };

    const findTag = (tagId: string): boolean => {
      const index = news.value.tags.findIndex((tag: ITag) => tag.id === tagId);
      return index > -1;
    };

    const saveFromCropper = (file: any) => {
      news.value.fileInfo.file = file.blob;
      fileList.value = [];
      cropOpen.value = false;
      fileList.value.push({ name: news.value.fileInfo.filenameDisk, url: file.src });
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

    // const handleDownload(file) {
    //   console.log(file)
    // },

    fileToUpload();

    return {
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
      cropOpen,
      news,
      showUpload,
      toggleUpload,
      imageCropSrc,
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
