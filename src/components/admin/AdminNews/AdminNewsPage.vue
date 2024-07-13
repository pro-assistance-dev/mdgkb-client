<template>
  <div v-if="Provider.mounted" class="wrapper">
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
                <WysiwygEditor v-model="news.content" :hide-tg-button="false" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Основное изображение </template>
              <el-form-item prop="mainImage.fileSystemPath" :rules="rules.mainImage">
                <UploaderImage
                  :file-info="news.mainImage"
                  :height="300"
                  @remove-file="news.removeMainImage()"
                  @ratio="(e) => (element.ratio = e)"
                />
              </el-form-item>
              <el-form-item prop="mainImageDescription" label="Описание:">
                <el-input v-model="news.mainImageDescription" placeholder="Описание" />
              </el-form-item>
            </el-card>

            <CollapseItem :collapsed="false">
              <template #inside-title>
                <div class="title-in">Фотографии</div>
              </template>
              <template #inside-content>
                <div class="tools-buttons">
                  <button class="admin-add" @click.prevent="news.addImage()">+ Добавить</button>
                </div>
                <div v-if="news.newsImages.length" class="background-container">
                  <AdminGallery :default-ratio="4 / 3" :file-list="news.newsImages" :file-list-for-delete="news.newsImagesForDelete" />
                </div>
              </template>
            </CollapseItem>
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
                <UploaderImage
                  :file-info="news.previewImage"
                  :height="300"
                  :default-ratio="1 / 1"
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
    <ChartsModal ref="ChartsModalRef" :ids="chartsModalIds" />
  </div>
</template>

<script lang="ts" setup>
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import News from '@/classes/News';
import NewsRules from '@/classes/NewsRules';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const isCropGalleryOpen = ref(false);
const form = ref();
const rules = ref(NewsRules);

const galleryList = Store.Getters('news/galleryList');
const news: Ref<News> = Store.Item('news');

const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

const submit = async (next?: NavigationGuardNext) => {
  saveButtonClick.value = true;
  if (!validate(form)) {
    saveButtonClick.value = false;
    return;
  }
  if (!Router.Id()) {
    await Store.Create('news');
    await Router.ToAdmin('/news');
    return;
  }
  await Store.Update('news');
  next ? next() : Router.ToAdmin('news');
};

const loadNewsItem = async () => {
  if (Router.Id()) {
    await Store.Get('news', Router.Id());
    PHelp.AdminUI.Head.Set(news.value.title, [Button.Success('Статистика', open), Button.Success('Сохранить', submit)]);
  } else {
    Store.Commit('news/resetState');
    PHelp.AdminUI.Head.Set('Добавить новость', [Button.Success('Сохранить', submit)]);
  }
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(news, formUpdated, { deep: true });
};

Hooks.onBeforeMount(loadNewsItem);

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(submit, next);
});

interface ChartsModalType extends InstanceType<typeof ChartsModal> {
  open(): void;
}

const ChartsModalRef: Ref<ChartsModalType | null> = ref(null);

const open = () => {
  ChartsModalRef.value?.open();
};

const chartsModalIds: string[] = Router.Id() ? Router.Id() : [];
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  // max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: $border-radius;
  border: 1px solid #c3c3c3;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

:deep(.el-upload--picture-card) {
  width: 300px;
  font-size: 50px;
  margin: 10px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 54px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  margin: 10px;
}
</style>
