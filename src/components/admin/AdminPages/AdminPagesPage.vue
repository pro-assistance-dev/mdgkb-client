<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="page" :model="page">
      <el-container direction="vertical">
        <el-card>
          <template #header>Заголовок</template>
          <el-form-item prop="title">
            <el-input v-model="page.title" placeholder="Заголовок"></el-input>
          </el-form-item>
          <el-checkbox v-model="page.withComments">Включить комментарии</el-checkbox>
          <WysiwygEditor v-model="page.content" />
        </el-card>
      </el-container>
      <el-button @click="() => openDialog()">Добавить меню</el-button>
      <el-card style="margin-top: 10px">
        <draggable class="groups" :list="page.pageSideMenus" item-key="id" handle=".el-icon-s-grid" @end="sort(page.pageSideMenus)">
          <template #item="{ element, index }">
            <div class="side-menu-row">
              <i style="margin-right: 5px; cursor: pointer" class="el-icon-s-grid drug-icon" />
              <div style="width: 100%">
                <a @click="openDialog(index)"> {{ element.name }} </a>
              </div>
              <TableButtonGroup
                :show-remove-button="true"
                @remove="removeFromClass(index, page.pageSideMenus, page.pageSideMenusForDelete)"
              />
            </div>
          </template>
        </draggable>
      </el-card>
      <!-- <el-card v-for="pageSideMenu in page.pageSideMenus" :key="pageSideMenu">
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
      </el-card> -->
      <AdminPageSideMenuDialog />
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import draggable from 'vuedraggable';

import AdminPageSideMenuDialog from '@/components/admin/AdminPages/AdminPageSideMenuDialog.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IPage from '@/interfaces/page/IPage';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPagesPage',
  components: { WysiwygEditor, TableButtonGroup, draggable, AdminPageSideMenuDialog },
  setup() {
    const form = ref();
    const route = useRoute();

    const page: Ref<IPage> = computed(() => Provider.store.getters['pages/page']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const loadNewsItem = async () => {
      if (route.params['slug']) {
        await Provider.store.dispatch('pages/getBySlug', route.params['slug']);
        Provider.store.commit('admin/setHeaderParams', { title: page.value.title, showBackButton: true, buttons: [{ action: submit }] });
      } else {
        Provider.store.commit('pages/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить страницу', showBackButton: true, buttons: [{ action: submit }] });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(page, formUpdated, { deep: true });
    };

    Hooks.onBeforeMount(loadNewsItem);

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
        await Provider.store.dispatch('pages/create', page.value);
        await Provider.router.push('/admin/pages');
        return;
      }
      await Provider.store.dispatch('pages/update', page.value);
      next ? next() : await Provider.router.push('/admin/pages');
    };

    const addDocument = () => Provider.store.commit('pages/addDocument');
    const openDialog = async (index?: number) => {
      if (index !== undefined) {
        Provider.store.commit('pages/setIndex', index);
      } else {
        await page.value.addSideMenu();
        Provider.store.commit('pages/setIndex', page.value.pageSideMenus.length - 1);
      }
      Provider.store.commit('pages/setSideMenuDialogActive', true);
    };

    return {
      addDocument,
      sort,
      mounted: Provider.mounted,
      submit,
      page,
      form,
      openDialog,
      removeFromClass,
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

.side-menu-row {
  padding: 5px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: lightblue;
  }
}
</style>
