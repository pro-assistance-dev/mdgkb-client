<template>
  <el-form v-if="mounted" ref="form" :key="page" :rules="rules" :model="page" label-position="top">
    <div class="wrapper" style="margin-right: 20px">
      <div style="min-width: 300px">
        <el-card style="margin-right: 20px; padding-right: 20px">
          <div :class="{ 'side-menu': true, 'side-menu-active': showMainSettings }" @click="selectMainSettings">Основные настройки</div>
          <draggable :list="page.pageSideMenus" item-key="id" @end="sort(page.pageSideMenus)">
            <template #item="{ element, index }">
              <div style="display: flex; align-items: center" class="side-menu-row">
                <div :class="{ 'side-menu': true, 'side-menu-active': element.id === activeMenuId }" @click="selectSideMenu(element.id)">
                  <div>{{ element?.name }}</div>
                  <el-popconfirm
                    confirm-button-text="Да"
                    cancel-button-text="Отмена"
                    icon="el-icon-info"
                    icon-color="danger"
                    title="Вы уверен, что хотите удалить это?"
                    @confirm="removePageSideMenu(index)"
                    @cancel="() => {}"
                  >
                    <template #reference>
                      <el-icon>
                        <Close />
                      </el-icon>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
          </draggable>
          <div class="side-menu side-menu-new" @click="addSideMenu">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </el-card>
      </div>
      <div style="min-width: 1000px; flex: 1; box-sizing: border-box; height: 90vh; overflow-y: scroll">
        <div v-if="showMainSettings">
          <el-card>
            <template #header> Заголовок </template>
            <el-form-item prop="title" label="Заголовок">
              <el-input v-model="page.title" placeholder="Заголовок" />
            </el-form-item>
            <el-form-item prop="title" label="Группа страниц">
              <el-select v-model="page.pagesGroup" placeholder="Группа страниц">
                <el-option label="Без группы" value="Без группы" />
                <el-option label="Образование" value="Образование" />
                <el-option label="Сведения об организации" value="Сведения об организации" />
              </el-select>
            </el-form-item>
            <el-form-item label="Доступно для роли">
              <el-select v-model="page.role" value-key="id" label="Роль">
                <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-checkbox v-model="page.withComments"> Включить комментарии </el-checkbox>
            <el-checkbox v-model="page.showContacts"> Показать контакты </el-checkbox>
            <el-checkbox v-model="page.collaps"> Сделать разделы свернутыми </el-checkbox>
            <WysiwygEditor v-model="page.content" />
          </el-card>
          <div v-if="page.showContacts" style="margin-bottom: 20px">
            <CollapseItem title="Контакты">
              <template #inside-content>
                <ContactForm :contact="page.contact" full />
              </template>
            </CollapseItem>
          </div>
        </div>
        <div v-else>
          <el-card style="margin-bottom: 20px">
            <el-input v-model="pageSideMenu.name" placeholder="Название меню" />
            <WysiwygEditor :key="pageSideMenu.name" v-model="pageSideMenu.description" />
            <div>
              <el-checkbox v-model="pageSideMenu.showContent" class="line"> Показывать содержание </el-checkbox>
            </div>
            <el-button type="success" @click="addPageSection">Добавить раздел</el-button>
          </el-card>
          <div v-if="pageSideMenu?.pageSections.length">
            <el-card style="margin-bottom: 20px">
              <h1 style="text-align: center">Разделы</h1>
            </el-card>
            <draggable :list="pageSideMenu.pageSections" item-key="id" handle=".handle" @end="sort(pageSideMenu.pageSections)">
              <template #item="{ element, index }">
                <div class="page-section-row">
                  <el-icon class="handle">
                    <Grid />
                  </el-icon>
                  <CollapseItem :title="element.name">
                    <template #inside-content>
                      <div style="padding: 20px">
                        <el-input v-model="element.name" placeholder="Название раздела страницы"></el-input>
                        <WysiwygEditor v-model="element.description" />
                        <AdminDocumentsForm :document-type="element" />
                      </div>
                    </template>
                  </CollapseItem>
                  <el-popconfirm
                    confirm-button-text="Да"
                    cancel-button-text="Отмена"
                    icon="el-icon-info"
                    icon-color="danger"
                    title="Вы уверен, что хотите удалить это?"
                    class="close"
                    @confirm="$classHelper.RemoveFromClassByIndex(index, pageSideMenu.pageSections, pageSideMenu.pageSectionsForDelete)"
                    @cancel="() => {}"
                  >
                    <template #reference>
                      <el-icon>
                        <Close />
                      </el-icon>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </draggable>
          </div>

          <!-- <el-card v-for="pageSection in pageSideMenu.pageSections" :key="pageSection.name" style="margin-bottom: 20px">
            <el-input v-model="pageSection.name" placeholder="Название раздела страницы"></el-input>
            <WysiwygEditor v-model="pageSection.description" />
            <AdminDocumentsForm :document-type="pageSection" />
          </el-card> -->
        </div>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { Close, Grid, Plus } from '@element-plus/icons-vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';
import draggable from 'vuedraggable';

import Page from '@/services/classes/page/Page';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import Role from '@/services/classes/Role';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const form = ref();
const rules = {
  title: [{ required: true, message: 'Необходимо указать наименование страницы', trigger: 'blur' }],
};
const page: ComputedRef<Page> = Store.Item('pages');
const roles: ComputedRef<Role[]> = Store.Items('roles');
const pageSideMenu: ComputedRef<PageSideMenu> = Store.Getters('pages/sideMenu');
const activeMenuId: ComputedRef<string> = Store.Getters('pages/activeMenuId');
// const activeMenu: Ref<number> = ref(999);
const mounted = ref(false);
const openPage = () => {
  const route = Router.Resolve(page.value.getLink());
  window.open(route.href, '_blank');
};

const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

const loadNewsItem = async () => {
  const buttons = [Button.Success('Сохранить', submit), Button.Success('Сохранить и выйти', submitAndExit)];
  if (Router.Slug()) {
    await Store.Dispatch('pages/getBySlug', Router.Slug());
    PHelp.AdminHead().Set(page.value.title, [...buttons, Button.Success('Посмотреть страницу', openPage)]);
  } else {
    Store.Commit('pages/resetState');
    PHelp.AdminHead().Set('Добавить страницу', buttons);
  }
  await Store.GetAll('roles');
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(page, formUpdated, { deep: true });
  mounted.value = true;
};

Hooks.onBeforeMount(loadNewsItem);

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(submit, next);
});

const submit = async () => {
  saveButtonClick.value = true;
  if (!validate(form)) {
    saveButtonClick.value = false;
    return;
  }
  if (!Provider.route().params['slug']) {
    await Store.Create('pages');
    await Router.ToAdmin('pages');
    return;
  }
  await Store.Dispatch('pages/updateAndSet', page.value);
  PHelp.Notification().Success('Успешно сохранено');
};

const submitAndExit = async (next?: NavigationGuardNext) => {
  await submit();
  next ? next() : await Router.ToAdmin('/pages');
};

const addSideMenu = () => {
  showMainSettings.value = false;
  const id = page.value.addSideMenu();
  selectSideMenu(id);
};

const selectSideMenu = (id: string) => {
  showMainSettings.value = false;
  Store.Commit('pages/setActiveMenuId', id);
};

const showMainSettings: Ref<boolean> = ref(true);
const selectMainSettings = () => {
  showMainSettings.value = true;
  Store.Commit('pages/setActiveMenuId', '999999');
};

const addPageSection = async () => {
  pageSideMenu.value.addPageSection();
  const main = document.querySelector('.el-main');
  if (main) {
    main.scrollTop = main.scrollHeight;
  }
};

const removePageSideMenu = (index: number) => {
  ClassHelper.RemoveFromClassByIndex(index, page.value.pageSideMenus, page.value.pageSideMenusForDelete);
  Store.Commit('pages/setActiveMenuId', '999999');
  showMainSettings.value = true;
};

onBeforeUnmount(() => {
  Store.Commit('pages/setActiveMenuId', '999999');
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  display: flex;
  box-sizing: border-box;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: scroll;
}

:deep(.side-menu) {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid;
  margin: 5px;
  line-height: 1;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

:deep(.side-menu-row) {
  position: relative;

  .handle {
    position: absolute !important;
    cursor: pointer;
    right: -20px;
  }
}

:deep(.side-menu-new) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #67c23a;

  .el-icon {
    font-size: 25px !important;
  }
}

.side-menu-active {
  background-color: lightblue;
}

.page-section-row {
  padding: 0 20px;
  position: relative;

  .handle,
  .close {
    position: absolute;
    z-index: 99;
    font-size: 25px;
    cursor: pointer;
  }

  .handle {
    left: -15px;
    top: 10px;
  }

  .close {
    right: -15px;
    top: 0;
  }
}
</style>
