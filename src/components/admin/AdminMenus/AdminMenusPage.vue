<template>
  <div class="wrapper">
    <el-form ref="form" :key="menu" :model="menu">
      <el-row :gutter="40">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Меню'" :button-text="'Добавить подменю'" @add="addSubMenu" />
            </template>
            <el-space>
              <el-input v-model="menu.name" placeholder="Название"> </el-input>
              <el-input v-model="menu.link" placeholder="Ссылка"> </el-input>
            </el-space>
            <div v-for="(subMenu, subMenuIndex) in menu.subMenus" :key="subMenu.id">
              <el-space>
                <el-input v-model="subMenu.name" placeholder="Название подменю"> </el-input>
                <el-input v-model="subMenu.link" placeholder="Ссылка"> </el-input>
                <el-button type="success" style="margin: 20px" @click="addSubSubMenu(subMenuIndex)">Добавить подподменю</el-button>
                <el-button icon="el-icon-delete" type="danger" @click="removeSubMenu(subMenuIndex)"></el-button>
              </el-space>

              <div v-for="subSubMenu in subMenu.subSubMenus" :key="subSubMenu.id">
                <el-space>
                  <el-form-item>
                    <el-input v-model="subSubMenu.name" placeholder="Название подподменю"> </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="subSubMenu.link" placeholder="Ссылка"> </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-delete" type="danger" @click="removeSubSubMenu(subSubMenu)"></el-button>
                  </el-form-item>
                </el-space>
              </div>
              <el-divider />
            </div>
          </el-card>
        </el-container>
      </el-row>
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
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
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

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
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
    const removeSubSubMenu = (subSubMenu: ISubSubMenu) => store.commit('menus/removeSubSubMenu', subSubMenu);

    return {
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
