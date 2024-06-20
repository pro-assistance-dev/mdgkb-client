<template>
  <div class="menu-icon" @click="openMenuBar()">
    <IconMenuLines hover-color="#343D5C" size="32px" margin="0 0 0 9px" />
  </div>
  <div class="admin-side-menu" :style="{
    marginLeft: showMenuBar ? '0px' : '-350px',
    boxShadow: shadow ? '0 0 6px rgba(0, 0, 0, 0.3)' : 'none',
    borderRight: border ? '1px solid #c4c4c4' : 'none',
  }">
    <div class="menu-tools">
      <AdminSearchMenu />
    </div>
    <div class="menu-body">
      <div> 
        <DropListItem v-for="item in menus" :key="item.title" :name="item.title" >
          <template v-for="children in item.children" :key="children.to">
            <div :index="children.to" @click="Router.To(children.to)"
              :class="{ 'selected-menu-item': children.to === activePath, 'menu-item': children.to !== activePath }"
              >
              {{ children.title }}
            </div>
          </template>
        </DropListItem>
      </div>
    </div>
    <div class="exit-button-container">
      <PButton skin="base" type="primary" text="На главную"  height="30px" margin="10px" @click="$router.push('/')" width="120px"/>
      <PButton skin="base" text="Выйти"  height="30px" margin="10px" @click="logout" width="120px" /> 
    </div>
  </div>


  <!-- <div v-if="mounted" class="admin-side-menu">
    <el-menu :default-active="activePath" :collapse="isCollapseSideMenu" background-color="whitesmoke" unique-opened
      @select="closeDrawer">
      <template v-for="item in menus" :key="item.title">
        <el-sub-menu v-if="item?.children?.length" :index="item.title">
          <template #title>
            <div class="sub-menu-container">
              <el-badge v-if="item.children.some((i) => i.count && i.count > 0)" is-dot type="danger"> </el-badge>
              <i :class="item.icon"></i>
              <span class="row-menu-title">{{ item.title }}</span>
            </div>
          </template>

          <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to"
            @click="$router.push(children.to)">
            <div class="menu-item-container">
              {{ children.title }}
              <el-badge v-if="children.count && children.count > 0" :value="children.count" type="danger"></el-badge>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <div v-else>
          <el-menu-item v-if="item.to !== '/'" :index="item.to" @click="$router.push(item.to)">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
  </div> -->
</template>

<script lang="ts" setup>

import IAdminMenu from '@/interfaces/IAdminMenu';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const props = defineProps({
  shadow: { type: Boolean as PropType<Boolean>, default: true },
  border: { type: Boolean as PropType<Boolean>, default: true },
});
  const store = useStore();
  const route = useRoute();
  const activePath: Ref<string> = ref('');
  const mounted = ref(false);
  const menus: ComputedRef<IAdminMenu[]> = computed<IAdminMenu[]>(() => store.getters['admin/menus']);
  const showMenuBar: Ref<boolean> = ref(true);
  const auth = Store.Getters('auth/auth')
  watch(
    () => route.path,
    () => {
      activePath.value = route.path;
    }
  );

  const openMenuBar = async () => {
    showMenuBar.value = !showMenuBar.value;
  };

  onBeforeMount(async () => {
    await store.dispatch('admin/updateApplicationsCounts');
    activePath.value = route.path;
    mounted.value = true;
  });

  const logout = async () => {
    auth.value.logout()
    await Router.To('/');
  };

  // onBeforeUnmount(async () => {
  // });
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.menu-icon {
  position: absolute;
  top: 14px;
  left: 2px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.admin-side-menu {
  box-sizing: border-box;
  min-width: 300px;
  position: relative;
  min-height: inherit;
  height: 100%;
  float: left;
  background-color: $menu-background;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  border-right: 1px solid #c4c4c4;
  z-index: 999;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

.menu-header {
  box-sizing: border-box;
  margin: 0 20px;
  height: 65px;
  border-bottom: 1px solid #E3E7FB;
}

.menu-tools {
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 10px 0 55px;
  cursor: pointer;
}

.menu-item {
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
  cursor: pointer;
  color: $base-font-color;
  font-family: $base-font;
  font-size: $base-font-size;
}

.menu-item:hover {
  color: $site_dark_gray;
}

.selected-menu-item {
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
  color: $site_dark_gray;
  font-family: $base-font;
  text-decoration: underline;
  font-size: $base-font-size;
}

.selected-menu-item:hover {
  background: #ffffff;
}

.exit-button-container {
  margin: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  box-sizing: border-box;
  width: 100%;
}

.exit-button {
  border: none;
  background: inherit;
  color: $base-font-color;
  font-family: $base-font;
  margin: 0 0 0 20px;
  font-size: $base-font-large-size;
  cursor: pointer;
}

.exit-button:hover {
  color: $site_dark_gray;
}

.menu-body {
  padding: 0 20px;
}
</style>
