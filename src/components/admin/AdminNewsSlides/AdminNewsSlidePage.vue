<template>
  <el-form v-if="mounted" ref="form" :model="slide" label-position="top" :rules="rules" :inline-message="true">
    <div class="admin-news-slide">
      <el-card header="Редактор">
        <el-form-item label="Название новости" prop="title">
          <el-input v-model="slide.title" placeholder="Название новости"></el-input>
        </el-form-item>
        <el-form-item label="Текст новости">
          <el-input v-model="slide.content" :autosize="{ minRows: 3, maxRows: 6 }" type="textarea" placeholder="Текст новости"></el-input>
        </el-form-item>
        <el-form-item label="Цвет текста">
          <el-color-picker v-model="slide.color"></el-color-picker>
        </el-form-item>
      </el-card>
      <el-card>
        <template #header>
          <div class="flex-row-between">
            <span>Кнопки</span>
            <el-button size="small" type="success" icon="el-icon-plus" circle @click="addButton"></el-button>
          </div>
        </template>
        <el-table :data="slide.newsSlideButtons">
          <el-table-column width="50" fixed="left" align="center">
            <template #default="scope">
              <TableMover :store-module="'newsSlides'" :store-getter="'itemButtons'" :index="scope.$index" />
            </template>
          </el-table-column>
          <el-table-column label="Текст" sortable>
            <template #default="scope">
              <el-form-item style="margin: 0" :rules="rules.buttonName" :prop="'newsSlideButtons.' + scope.$index + '.name'">
                <el-input v-model="scope.row.name" placeholder="Текст"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="Ссылка" sortable>
            <template #default="scope">
              <el-form-item style="margin: 0" :rules="rules.buttonLink" :prop="'newsSlideButtons.' + scope.$index + '.link'">
                <el-input v-model="scope.row.link" placeholder="Ссылка"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="Цвет фона" sortable width="150" align="center">
            <template #default="scope">
              <el-color-picker v-model="scope.row.backgroundColor"></el-color-picker>
            </template>
          </el-table-column>
          <el-table-column label="Цвет текста" sortable width="150" align="center">
            <template #default="scope">
              <el-color-picker v-model="scope.row.color"></el-color-picker>
            </template>
          </el-table-column>
          <el-table-column width="50" fixed="right" align="center">
            <template #default="scope">
              <TableButtonGroup :show-remove-button="true" @remove="removeButton(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card header="Фон под разные разрешения">
        <el-form-item label="Desktop:" prop="desktopImg.fileSystemPath" :rules="rules.desktopImg">
          <UploaderSingleScan :file-info="slide.desktopImg" :height="300" :width="1920" />
        </el-form-item>
        <el-form-item label="Laptop:" prop="laptopImg.fileSystemPath" :rules="rules.laptopImg">
          <UploaderSingleScan :file-info="slide.laptopImg" :height="300" :width="1200" />
        </el-form-item>
        <el-form-item label="Tablet:" prop="tabletImg.fileSystemPath" :rules="rules.tabletImg">
          <UploaderSingleScan :file-info="slide.tabletImg" :height="300" :width="768" />
        </el-form-item>
        <el-form-item label="Mobile:" prop="mobileImg.fileSystemPath" :rules="rules.mobileImg">
          <UploaderSingleScan :file-info="slide.mobileImg" :height="300" :width="480" />
        </el-form-item>
      </el-card>
    </div>
    <el-dialog v-model="showPreview" title="Предварительный просмотр" :fullscreen="previewFullScreen" width="80%">
      <AdminNewsSlidePreview />
      <template #footer>
        <el-button type="success" @click="() => submit()">Сохранить</el-button>
      </template>
    </el-dialog>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminNewsSlidePreview from '@/components/admin/AdminNewsSlides/AdminNewsSlidePreview.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminNewsSlidePage',
  components: { TableMover, TableButtonGroup, UploaderSingleScan, AdminNewsSlidePreview },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const rules = {
      title: [{ required: true, message: 'Необходимо указать название', trigger: 'blur' }],
      buttonName: [{ required: true, message: 'Необходимо указать текст кнопки', trigger: 'blur' }],
      buttonLink: [{ required: true, message: 'Необходимо указать ссылку', trigger: 'blur' }],
      desktopImg: [{ required: true, message: 'Необходимо загрузить desktop версию изображения', trigger: 'change' }],
      laptopImg: [{ required: true, message: 'Необходимо загрузить laptop версию изображения', trigger: 'change' }],
      tabletImg: [{ required: true, message: 'Необходимо загрузить tablet версию изображения', trigger: 'change' }],
      mobileImg: [{ required: true, message: 'Необходимо загрузить mobile версию изображения', trigger: 'change' }],
    };
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const showPreview: Ref<boolean> = ref(false);
    const previewFullScreen: Ref<boolean> = ref(false);
    const slide: ComputedRef<INewsSlide> = computed<INewsSlide>(() => store.getters['newsSlides/item']);
    const slides: ComputedRef<INewsSlide[]> = computed<INewsSlide[]>(() => store.getters['newsSlides/items']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const addButton = () => {
      store.commit('newsSlides/addButton');
    };
    const removeButton = (index: number) => {
      store.commit('newsSlides/removeButton', index);
    };

    const openPreview = () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      showPreview.value = true;
    };

    const submit = async (next?: NavigationGuardNext) => {
      store.commit('newsSlides/setOrder', slides.value.length);
      try {
        if (route.params['id']) {
          await store.dispatch('newsSlides/update', slide.value);
        } else {
          await store.dispatch('newsSlides/create', slide.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/news-slides');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      if (!slides.value.length) {
        store.dispatch('newsSlides/getAll');
      }
      if (route.params['id']) {
        await store.dispatch('newsSlides/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: 'Обновить новость (слайдер)',
          showBackButton: true,
          buttons: [{ action: openPreview }],
        });
      } else {
        store.commit('admin/setHeaderParams', {
          title: 'Добавить новость (слайдер)',
          showBackButton: true,
          buttons: [{ action: openPreview }],
        });
      }
      previewFullScreen.value = window.innerWidth < 1200;
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(slide, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeUnmount(() => {
      store.commit('newsSlides/resetState');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      slide,
      mounted,
      addButton,
      removeButton,
      showPreview,
      openPreview,
      previewFullScreen,
      submit,
      rules,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.avatar-uploader-cover) {
  text-align: start;
}
</style>
