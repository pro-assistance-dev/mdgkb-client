<template>
  <div class="menu-icon" @click="PHelp.AdminUI.Menu.Toggle()">
    <IconMenuLines hover-color="#343D5C" size="32px" margin="0 0 0 9px" />
  </div>
  <div
    class="admin-side-menu"
    :style="{
      marginLeft: PHelp.AdminUI.Menu.IsOpen() ? '0px' : '-344px',
      boxShadow: shadow ? '0 0 6px rgba(0, 0, 0, 0.3)' : 'none',
      borderRight: border ? '1px solid #c4c4c4' : 'none',
    }"
  >
    <div class="menu-tools">
      <PInput v-model="PHelp.AdminUI.Menu.filterString" style="width: 100%; margin-right: 10px" placeholder="Поиск по меню" />
    </div>
    <div v-if="mounted" class="menu-body">
      <div>
        <DropListItem v-for="item in PHelp.AdminUI.Menu.Get()" :key="item.name" :name="item.name">
          <div
            v-for="children in PHelp.AdminUI.Menu.GetChildren(item)"
            :key="children.to"
            :index="children.to"
            :class="{
              'selected-menu-item': children.to === PHelp.AdminUI.Menu.GetPath(),
              'menu-item': children.to !== PHelp.AdminUI.Menu.GetPath(),
            }"
            @click="Router.To(children.to)"
          >
            {{ children.name }}
          </div>
        </DropListItem>
      </div>
    </div>
    <div class="exit-button-container">
      <PButton skin="base" type="primary" text="На главную" height="30px" margin="10px" width="120px" @click="Router.To('/')" />
      <PButton skin="base" text="Выйти" height="30px" margin="10px" width="120px" @click="logout" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import menuList from './menuList';

defineProps({
  shadow: { type: Boolean as PropType<Boolean>, default: true },
  border: { type: Boolean as PropType<Boolean>, default: true },
});

// const activePath: Ref<string> = ref('');
const mounted = ref(false);

watch(
  () => Router.GetPath(),
  () => {
    PHelp.AdminUI.Menu.SetPath(Router.GetPath());
  }
);

onBeforeMount(async () => {
  PHelp.AdminUI.Menu.Set(menuList);
  PHelp.AdminUI.Menu.SetPath(Router.GetPath());
  mounted.value = true;
});

const logout = async () => {
  PHelp.Auth.Logout();
  await Router.To('/');
};
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
  transition: $transition;
}

.menu-header {
  box-sizing: border-box;
  margin: 0 20px;
  height: 65px;
  border-bottom: 1px solid #e3e7fb;
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
