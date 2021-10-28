<template>
  <div class="wrapper">
    <el-form ref="form" :key="menu" :model="menu">
      <el-container direction="vertical">
        <el-card>
          <template #header>
            <CardHeader :label="'Меню'" :button-text="'Добавить подменю'" @add="addSubMenu" />
          </template>
          <el-form-item label-width="100px" label="Название">
            <el-input v-model="menu.name" placeholder="Название"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-space>
              <el-form-item v-if="menu.withoutChildren() && !menu.isPageLink()" label-width="100px" label="Ссылка">
                <el-input v-model="menu.link" placeholder="Ссылка"> </el-input>
              </el-form-item>
              <el-form-item v-if="menu.withoutChildren() && !menu.isLink()" label-width="250px" label="Выбрать страницу">
                <el-select v-model="menu.pageId" clearable filterable placeholder="Страница">
                  <el-option v-for="page in pages" :key="page.id" :label="page.title" :value="page.id"> </el-option>
                </el-select>
              </el-form-item>
            </el-space>
          </el-form-item>
          <el-form-item label-width="100px" label="Иконка">
            <el-upload
              ref="uploader"
              action="#"
              :auto-upload="false"
              :limit="1"
              :multiple="false"
              accept="image/svg+xml"
              :show-file-list="false"
              @change="(file) => menu.addFile(file, menu.icon)"
            >
              <el-button>{{ menu.icon.originalName ? 'Заменить файл' : 'Приложить файл' }}</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label-width="100px" label="Другие опции">
            <el-space>
              <el-form-item>
                <el-checkbox v-model="menu.top"> Показывать в верхнем меню</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="menu.side"> Показывать в боковом меню</el-checkbox>
              </el-form-item>
            </el-space>
          </el-form-item>
        </el-card>

        <div v-if="!menu.isLink()">
          <h1>Подменю</h1>
          <el-card v-for="(subMenu, subMenuIndex) in menu.subMenus" :key="subMenu.id">
            <template #header>
              <CardHeader
                :remove-button="true"
                :button-text="'Добавить подподменю'"
                @add="addSubSubMenu(subMenuIndex)"
                @remove="removeSubMenu(subMenuIndex)"
              />
              <el-form-item label="Название">
                <el-input v-model="subMenu.name" placeholder="Название"> </el-input>
              </el-form-item>
              <el-button v-if="subMenuIndex > 0" @click="moveUp(menu.subMenus, subMenuIndex)">Вверх </el-button>
              <el-button v-if="subMenuIndex < menu.subMenus.length - 1" @click="moveDown(menu.subMenus, subMenuIndex)">Вниз </el-button>
            </template>

            <el-space>
              <el-form-item v-if="subMenu.withoutChildren() && !subMenu.isPageLink()" label="Ссылка">
                <el-input v-model="subMenu.link" placeholder="Ссылка"> </el-input>
              </el-form-item>
              <el-form-item v-if="subMenu.withoutChildren() && !subMenu.isLink()">
                <el-select v-model="subMenu.pageId" clearable filterable placeholder="Страница">
                  <el-option v-for="page in pages" :key="page.id" :label="page.title" :value="page.id"> </el-option>
                </el-select>
              </el-form-item>
              <el-upload
                ref="uploader"
                action="#"
                :auto-upload="false"
                :limit="1"
                :multiple="false"
                accept="image/svg+xml"
                :show-file-list="false"
                @change="(file) => subMenu.addFile(file, subMenu.icon)"
              >
                <el-button>{{ subMenu.icon.originalName ? 'Заменить файл' : 'Приложить файл' }}</el-button>
              </el-upload>
            </el-space>

            <el-card v-for="(subSubMenu, subSubMenuIndex) in subMenu.subSubMenus" :key="subSubMenu.id">
              <template #header>
                <CardHeader
                  :add-button="false"
                  :remove-button="true"
                  :label="'Подподменю'"
                  @remove="removeSubSubMenu(subMenuIndex, subSubMenuIndex)"
                />
                <el-button v-if="subSubMenuIndex > 0" @click="moveUp(subMenu.subSubMenus, subSubMenuIndex)">Вверх </el-button>
                <el-button v-if="subSubMenuIndex < subMenu.subSubMenus.length - 1" @click="moveDown(subMenu.subSubMenus, subSubMenuIndex)"
                  >Вниз
                </el-button>
              </template>
              <el-space>
                <el-form-item>
                  <el-input v-model="subSubMenu.name" placeholder="Название подподменю"> </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="subSubMenu.link" placeholder="Ссылка"> </el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="subSubMenu.pageId" filterable placeholder="Страница">
                    <el-option v-for="page in pages" :key="page.id" :label="page.title" :value="page.id"> </el-option>
                  </el-select>
                </el-form-item>
                <el-upload
                  ref="uploader"
                  action="#"
                  :auto-upload="false"
                  :limit="1"
                  :multiple="false"
                  accept="image/svg+xml"
                  :show-file-list="false"
                  @change="(file) => subSubMenu.addFile(file, subSubMenu.icon)"
                >
                  <el-button>{{ subSubMenu.icon.originalName ? 'Заменить файл' : 'Приложить файл' }}</el-button>
                </el-upload>
              </el-space>
            </el-card>
          </el-card>
        </div>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import NewsRules from '@/classes/news/NewsRules';
import CardHeader from '@/components/admin/CardHeader.vue';
import IMenu from '@/interfaces/menu/IMenu';
import { moveDown, moveUp } from '@/mixins/moves';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminMenusPage',
  components: { CardHeader },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();
    const rules = ref(NewsRules);

    const menu: Ref<IMenu> = computed<IMenu>(() => store.getters['menus/menu']);
    const pages = computed(() => store.getters['pages/pages']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await store.dispatch('pages/getAll');
      await loadMenu();
    });

    const loadMenu = async () => {
      if (route.params['id']) {
        await store.dispatch('menus/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: menu.value.name, saveButton: true });
      } else {
        store.commit('menus/resetState');
        store.commit('admin/setPageTitle', { title: 'Добавить меню', saveButton: true });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(menu, formUpdated, { deep: true });
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
      if (!route.params['id']) {
        await store.dispatch('menus/create', menu.value);
        await router.push('/admin/menus');
        return;
      }
      await store.dispatch('menus/update', menu.value);
      next ? next() : await router.push('/admin/menus');
    };

    const addSubMenu = () => store.commit('menus/addSubMenu');
    const removeSubMenu = (index: number) => store.commit('menus/removeSubMenu', index);

    const addSubSubMenu = (subMenuIndex: number) => store.commit('menus/addSubSubMenu', subMenuIndex);
    const removeSubSubMenu = (subMenuIndex: number, subSubMenuIndex: number) => {
      menu.value.subMenus[subMenuIndex].subSubMenus.splice(subSubMenuIndex, 1);
    };

    return {
      moveUp,
      moveDown,

      pages,
      removeSubSubMenu,
      addSubMenu,
      removeSubMenu,
      addSubSubMenu,
      mounted,
      submit,
      menu,
      rules,
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
