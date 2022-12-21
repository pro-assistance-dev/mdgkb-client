<template>
  <div class="wrapper">
    <el-form ref="form" :key="page" :model="page">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <template #header>Заголовок</template>
              <el-form-item prop="title">
                <el-input v-model="page.title" placeholder="Заголовок"></el-input>
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
        <el-col :lg="8" :xl="6">
          <el-checkbox v-model="page.withComments">Включить комментарии</el-checkbox>
        </el-col>
      </el-row>
      <el-button @click="page.addSideMenu()">Добавить меню</el-button>
      <el-card v-for="pageSideMenu in page.pageSideMenus" :key="pageSideMenu">
        <template #header>
          <div class="card-header">
            <el-input v-model="pageSideMenu.name" />
            <WysiwygEditor v-model="pageSideMenu.description" />
            <el-button type="success" @click="pageSideMenu.addPageSection()">Добавить тип</el-button>
          </div>
        </template>
        <el-collapse>
          <draggable
            class="groups"
            :list="pageSideMenu.pageSections"
            item-key="id"
            handle=".el-icon-s-grid"
            @end="sort(pageSideMenu.pageSections)"
          >
            <template #item="{ element }">
              <el-collapse-item :title="element.name" :name="element.name">
                <template #title>
                  <i class="el-icon-s-grid drug-icon" />
                  {{ element.name }}
                </template>
                <el-card>
                  <template #header>
                    <div class="card-header">
                      <el-form-item style="margin: 0 10px 0 0; width: 100%">
                        <el-input v-model="element.name" placeholder="Название типа документов"></el-input>
                      </el-form-item>
                      <!--                      <el-button type="danger" icon="el-icon-close" @click="removeDocType(index)"></el-button>-->
                    </div>
                    <div>
                      <el-form-item prop="description">
                        <WysiwygEditor v-model="element.description" />
                      </el-form-item>
                    </div>
                  </template>
                  <AdminDocumentsForm :document-type="element" />
                </el-card>
              </el-collapse-item>
            </template>
          </draggable>
        </el-collapse>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import AdminDocumentsForm from '@/components/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IPage from '@/interfaces/page/IPage';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { WysiwygEditor, draggable, AdminDocumentsForm },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();

    const page: Ref<IPage> = computed(() => store.getters['pages/page']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadNewsItem();
      store.commit('admin/closeLoading');
    });

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await store.dispatch('pages/getBySlug', route.params['slug']);
        store.commit('admin/setHeaderParams', { title: page.value.title, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('pages/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить страницу', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(page, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
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
      if (!route.params['slug']) {
        await store.dispatch('pages/create', page.value);
        await router.push('/admin/pages');
        return;
      }
      await store.dispatch('pages/update', page.value);
      next ? next() : await router.push('/admin/pages');
    };

    const addDocument = () => store.commit('pages/addDocument');

    return {
      addDocument,
      sort,
      mounted,
      submit,
      page,
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
