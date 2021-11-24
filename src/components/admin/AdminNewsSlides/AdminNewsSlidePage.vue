<template>
  <el-form v-if="mounted" :model="slide" label-position="top">
    <div class="admin-news-slide">
      <el-card header="Редактор">
        <el-form-item>
          <QuillEditor
            v-model:content="slide.title"
            :options="editorOptions"
            style="height: 100px"
            content-type="html"
            theme="snow"
            placeholder="Название новости"
          ></QuillEditor>
        </el-form-item>
        <el-form-item>
          <QuillEditor
            v-model:content="slide.content"
            :options="editorOptions"
            style="height: 100px"
            content-type="html"
            theme="snow"
            placeholder="Текст новости"
          ></QuillEditor>
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
          <el-table-column label="Текст" sortable>
            <template #default="scope">
              <el-input v-model="scope.row.name" placeholder="Текст"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Ссылка" sortable>
            <template #default="scope">
              <el-input v-model="scope.row.link" placeholder="Ссылка"></el-input>
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
        <el-form-item label="Desktop:">
          <UploaderSingleScan :file-info="slide.desktopImg" :height="300" :width="1920" />
        </el-form-item>
        <el-form-item label="Laptop:">
          <UploaderSingleScan :file-info="slide.laptopImg" :height="300" :width="1200" />
        </el-form-item>
        <el-form-item label="Tablet:">
          <UploaderSingleScan :file-info="slide.tabletImg" :height="300" :width="768" />
        </el-form-item>
        <el-form-item label="Mobile:">
          <UploaderSingleScan :file-info="slide.mobileImg" :height="300" :width="480" />
        </el-form-item>
      </el-card>
    </div>
    <el-dialog v-model="showPreview" title="Предварительный просмотр" :fullscreen="previewFullScreen" width="80%">
      <AdminNewsSlidePreview />
      <template #footer>
        <el-button type="success" @click="submit">Сохранить</el-button>
      </template>
    </el-dialog>
  </el-form>
</template>

<script lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminNewsSlidePreview from '@/components/admin/AdminNewsSlides/AdminNewsSlidePreview.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';

export default defineComponent({
  name: 'AdminNewsSlidePage',
  components: { QuillEditor, TableButtonGroup, UploaderSingleScan, AdminNewsSlidePreview },

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
    const mounted: Ref<boolean> = ref(false);
    const showPreview: Ref<boolean> = ref(false);
    const previewFullScreen: Ref<boolean> = ref(false);
    const slide: ComputedRef<INewsSlide> = computed<INewsSlide>(() => store.getters['newsSlides/item']);

    const addButton = () => {
      store.commit('newsSlides/addButton');
    };
    const removeButton = (index: number) => {
      store.commit('newsSlides/removeButton', index);
    };

    const openPreview = () => {
      showPreview.value = true;
    };

    const submit = async () => {
      if (route.params['id']) {
        await store.dispatch('newsSlides/update', slide.value);
      } else {
        await store.dispatch('newsSlides/create', slide.value);
      }
      await router.push('/admin/news-slides');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', openPreview);
      if (route.params['id']) {
        await store.dispatch('newsSlides/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: 'Обновить новость (слайдер)', saveButton: true });
      } else {
        store.commit('admin/setPageTitle', { title: 'Добавить новость (слайдер)', saveButton: true });
      }
      previewFullScreen.value = window.innerWidth < 1200;
      mounted.value = true;
    });

    onBeforeUnmount(() => {
      store.commit('newsSlides/resetState');
    });

    return {
      slide,
      editorOptions,
      mounted,
      addButton,
      removeButton,
      showPreview,
      openPreview,
      previewFullScreen,
      submit,
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
