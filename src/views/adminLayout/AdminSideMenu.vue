<template>
  <div v-if="mounted" class="admin-side-menu">
    <el-menu
      v-for="item in menus"
      :key="item.title"
      :default-active="activePath"
      :collapse="isCollapseSideMenu"
      background-color="whitesmoke"
      @select="closeDrawer"
    >
      <el-sub-menu v-if="item.children" :index="item.title">
        <template #title>
          <i :class="item.icon"></i>
          <span class="row-menu-title">{{ item.title }}</span>
        </template>
        <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
          {{ children.title }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="item.to" @click="$router.push(item.to)">
        <i :class="item.icon"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import UserService from '@/services/User';
import menuList from '@/views/adminLayout/menuList';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    const mounted = ref(false);
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );
    const menus: Ref<IAdminMenu[]> = ref(menuList);

    onBeforeMount(() => {
      activePath.value = route.path;
      const user = UserService.getUser();
      if (!user) {
        return;
      }
      menus.value = menus.value.filter((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
      menus.value.forEach((m: IAdminMenu) => {
        if (!m.children) {
          return;
        }
        m.children = m.children.filter((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
      });
      mounted.value = true;
    });

    return { menus, closeDrawer, isCollapseSideMenu, activePath, mounted };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}

.admin-side-menu {
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;

  :deep(.el-sub-menu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-sub-menu__icon-arrow) {
    font-size: unset;
  }
}
.el-menu,
.el-menu-item {
  border: none;
}
.row-menu-title {
  margin-right: 20px;
}
</style>
