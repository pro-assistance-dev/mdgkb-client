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
          <i :class="item.icon"><el-badge v-if="item.children.some((i) => i.count > 0)" is-dot type="primary"></el-badge></i>
          <span class="row-menu-title">{{ item.title }}</span>
          <el-badge v-if="item.children.some((i) => i.count > 0)" is-dot type="primary"></el-badge>
        </template>

        <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
          <div>
            {{ children.title }}
            <el-badge v-if="children.count > 0" :value="children.count" type="primary"></el-badge>
          </div>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="item.to" @click="$router.push(item.to)">
        <i :class="item.icon"></i>
        <template #title> {{ item.title }}asdfsdf </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    const applicationsCounts: Ref<IApplicationsCount[]> = computed(() => store.getters['meta/applicationsCounts']);
    const mounted = ref(false);
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );
    const menus: ComputedRef<IAdminMenu[]> = computed<IAdminMenu[]>(() => store.getters['admin/menus']);

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      await store.dispatch('meta/getApplicationsCounts');
      console.log(menus);
      store.commit('admin/setApplicationsCounts', applicationsCounts.value);
      await store.dispatch('admin/subscribeApplicationsCountsGet');
      activePath.value = route.path;
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
