<template>
  <ul v-if="mounted" class="menu-center-list">
    <li v-for="menu in menus" :key="menu.id" class="main-item">
      <div class="link-menu" :class="{ active: menu.active }" @click="menuClick(menu)">
        {{ menu.name }}
      </div>
      <ul v-if="!menu.withoutChildren() && menu.selected" class="dropmenu">
        <div class="subMenu-place">
          <li v-for="subMenu in menu.subMenus" :key="subMenu.id" class="sub">
            <div class="link-colomn" @click="Router.To(subMenu.link)">
              <div class="index-about-column">
                <div class="index-about-colomn-icon">
                  <div class="icon">
                    <BaseIcon :width="50" :height="50" :color="getColor(subMenu.background)">
                      <HelpProfileIcon :svg-code="subMenu.svgCode" />
                    </BaseIcon>
                  </div>
                </div>
                <div class="index-about-colomn-text" :style="{ color: getColor(subMenu.background) }">
                  {{ subMenu.name }}
                </div>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import Menu from '@/services/classes/Menu';

defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
});
const mounted = ref(false);
const menus: Menu[] = MenusStore.Items();

const clickOutsideMenu = (e: MouseEvent) => {
  const t = document.querySelectorAll('.link-menu');
  const withinBoundaries = [...t].find((element) => e.composedPath().includes(element));
  if (withinBoundaries) {
    return;
  }
  setActiveMenu();
  menus.forEach((m: Menu) => {
    m.selected = false;
  });
};

onBeforeMount(async () => {
  await MenusStore.FTSP({ ftsp: new FTSP() });
  setColors();
  window.addEventListener('click', clickOutsideMenu);
  setActiveMenu();
  mounted.value = true;
});

const setActiveMenu = () => {
  menus.forEach((m: Menu) => (m.active = false));
  const activeMenu = menus.find((m: Menu) => m.containPath(Router.Route().path));
  if (activeMenu) {
    activeMenu.active = true;
  }
};

const setColors = (): void => {
  const colors: string[] = ['#31af5e', '#ff4d3b', '#006BB5', '#f3911c'];
  for (let menuIndex = 0; menuIndex < menus.length; menuIndex++) {
    for (let subMenuIndex = 0; subMenuIndex < menus[menuIndex].subMenus.length; subMenuIndex++) {
      menus[menuIndex].subMenus[subMenuIndex].background = colors[subMenuIndex % 4];
    }
  }
};

watch(() => Router.Route().path, setActiveMenu);

const getColor = (color: string) => {
  return color;
};

const menuClick = (menu: Menu) => {
  menu.selected = true;
  menus.forEach((m: Menu) => {
    if (m.id === menu.id) {
      return;
    }
    m.selected = false;
  });
  setActiveMenu();
  if (menu.isLink()) {
    Router.To(menu.getLink());
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

ul.menu-center-list {
  display: flex;
  align-items: center;
  height: auto;
}

ul.menu-center-list li {
  display: inline;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  border-right: 1px solid #dfe4ee;
}

.main-item {
  white-space: nowrap;
}

.sub {
  white-space: normal;
}

ul.menu-center-list li:last-child {
  border-right: none;
}

ul.dropmenu li {
  border-right: none;
  padding: 0px;
}

.link-menu {
  color: #343e5c;
  text-decoration: none;
  transition: color 0.3s ease 0s;
  text-transform: uppercase;
  align-items: center;
  padding: 22px 20px 20px 20px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  background: #f0f2f7;
}

.link-menu:hover {
  background: #ffffff;
  cursor: pointer;
}

h3 {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 100%;
  color: #343e5c;
  font-weight: lighter;
}

.index-about-column {
  display: flex;
  width: 200px;
  height: 100px;
  background-clip: padding-box;
  border-radius: 10px;
  background-color: rgba(240, 242, 247);
  overflow: hidden;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 5px 5px,
    rgba(0, 0, 0, 0.1) 0px -1px 3px,
    rgba(0, 0, 0, 0.1) 0px 4px 6px,
    rgba(0, 0, 0, 0.1) 0px 2px 3px,
    rgba(0, 0, 0, 0.1) 0px -3px 5px;
  justify-content: space-between;
  margin: 5px;
  &:hover {
    cursor: pointer;
  }
}

.index-about-colomn-text {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: left;
  color: #ffffff;
  padding-right: 10px;
}

.index-about-colomn-icon {
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.icon-menu {
  width: 28px;
  height: 28px;
  stroke: #343e5c;
  transition: 0.25s;
  padding-right: 30px;
}

.icon-menu:hover {
  stroke: #379fff;
}

.icon-info {
  width: 20px;
  height: 20px;
  fill: #1979cf;
  transition: 0.25s;
}

.icon-info:hover {
  fill: #0034cf;
}

.link-colomn {
  text-decoration: none;
}

.icon-1 {
  width: 100px;
  height: 100px;
  fill: #0bae57;
  transition: 0.25s;
}

li .dropmenu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  margin-top: 22px;
}

.link-menu:focus-within {
  background: #ffffff;
}

.index-about-column {
  &:hover,
  &:active,
  &:focus {
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 5px 5px,
      rgba(0, 0, 0, 0.25) 0px -1px 3px,
      rgba(0, 0, 0, 0.25) 0px 4px 6px,
      rgba(0, 0, 0, 0.25) 0px 2px 3px,
      rgba(0, 0, 0, 0.25) 0px -3px 5px;
    background-color: white;
    z-index: 500;
  }
}

.subMenu-place {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-flow: row wrap;
  padding: 1px 0px 1px 4px;
  border-radius: 10px;
  backdrop-filter: blur(2px);
  width: 636px;
}

.active {
  background: #ffffff;
}
</style>
