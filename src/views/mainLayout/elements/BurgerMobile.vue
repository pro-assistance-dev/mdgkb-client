<template>
  <div class="drop-burger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label
      :style="{ visibility: isDrawerOpen ? 'hidden' : 'visible', 'transition-delay': !isDrawerOpen ? '0.25s' : '' }"
      class="menu__btn"
      for="menu__toggle"
      @click="toggleDrawer(true)"
    >
      <span></span>
    </label>
    <div
      id="menu__box"
      :style="{ visibility: !isDrawerOpen ? 'hidden' : 'visible' }"
      class="menu__box"
      @click="(e) => drawerLeaveHandler(e)"
    >
      <div id="menu-zone" class="menu-zone" :style="{ left: !isDrawerOpen ? '-100%' : '0' }">
        <div class="menu">
          <ul>
            <li
              v-for="menu in menus"
              :id="menu.id"
              :key="menu.id"
              class="item"
              :class="{ background_active: menu.link === activePath || isHighlightRoute(menu.subMenus, activePath) }"
            >
              <a v-if="!menu.withoutChildren()" :href="`#${menu.id}`" class="btn" @click="(e) => test(e, menu)"
                >{{ menu.name }}
                <svg class="icon-arrow">
                  <use xlink:href="#arrow-down"></use>
                </svg>
              </a>
              <router-link v-else :to="menu.getLink()" class="btn" @click="menuClickHandler">{{ menu.name }}</router-link>
              <div
                class="submenu"
                :style="{
                  transition: menu.show ? '2s' : '1s',
                  maxHeight: menu.show ? '40rem' : 0,
                  opacity: menu.show ? 1 : 0,
                }"
              >
                <ul v-if="!menu.withoutChildren()">
                  <li v-for="subMenu in menu.subMenus" :key="subMenu.id" :class="{ background_active: subMenu.link === activePath }">
                    <router-link :to="subMenu.link" @click="menuClickHandler">{{ subMenu.name }}</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Menu from '@/services/classes/Menu';

export default defineComponent({
  name: 'BurgerMobile',

  emits: ['changeDrawerStatus'],
  setup(prop, { emit }) {
    let expand = ref(false);
    const activePath: Ref<string> = ref('');

    const isDrawerOpen: Ref<boolean> = ref(false);
    const menus = Store.Items('menus');
    const route = useRoute();

    const toggleDrawer = (open?: boolean) => {
      isDrawerOpen.value = open ? open : !isDrawerOpen.value;
    };
    const drawerLeaveHandler = (e: any) => {
      if (e.target.id !== 'menu__box') return;
      toggleDrawer(false);
    };
    const menuClickHandler = () => {
      toggleDrawer(false);
    };

    onBeforeMount(async () => {
      activePath.value = route.path;
    });
    const test = (e: any, menu: Menu) => {
      menus.value.forEach((menuEl: Menu) => {
        if (menu.id !== menuEl.id) {
          menuEl.show = false;
        }
      });
      menu.show = menu.show ? false : true;
    };
    const isHighlightRoute = (subMenus: Menu[], activePath: string) => {
      if (subMenus?.length === 0) {
        return false;
      } else {
        return !!subMenus?.find((item) => item?.link === activePath);
      }
    };
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    return {
      menus,
      expand,
      activePath,
      menuClickHandler,
      isDrawerOpen,
      toggleDrawer,
      drawerLeaveHandler,
      test,
      isHighlightRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
* {
  text-decoration: none;
  color: white;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}

.drop-burger-menu {
  position: relative;
  width: 60px;
}

#menu__toggle {
  opacity: 0;
}

.menu__btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 20px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 101;
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #343e5c;
}

.menu__btn:hover > span,
.menu__btn:hover > span::before,
.menu__btn:hover > span::after {
  background-color: #22abe2;
}

.menu__btn > span::before {
  content: '';
  top: -8px;
}
.menu__btn > span::after {
  content: '';
  top: 8px;
}

.menu__box {
  display: block;
  position: fixed;
  // visibility: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}

.menu-zone {
  position: fixed;
  // left: -100%;
  max-width: 450px;
  width: 90%;
  height: 100%;
  z-index: 100;
  background: #eceff1;
  /* padding: 150px 0 0 0; */
}

.menu__item {
  display: block;
  padding: 12px 24px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
}
.menu__item:hover {
  background-color: #cfd8dc;
}
// #menu__toggle:checked ~ .menu__btn {
//   transition-duration: 1s;
// }
// #menu__toggle:checked ~ .menu__btn > span {
//   transform: rotate(45deg);
// }
// #menu__toggle:checked ~ .menu__btn > span::before {
//   top: 0;
//   transform: rotate(0);
// }
// #menu__toggle:checked ~ .menu__btn > span::after {
//   top: 0;
//   transform: rotate(90deg);
// }
#menu__toggle:checked ~ .menu__box {
  visibility: visible;
  .menu-zone {
    visibility: visible;
    left: 0;
  }
}
.is-active {
  left: 0;
}

// .menu__btn > span,
// .menu__btn > span::before,
// .menu__btn > span::after {
//   transition-duration: 0.25s;
// }
.menu__box,
.menu-zone {
  transition-duration: 0.25s;
}
.menu__item {
  transition-duration: 0.25s;
}

ul.submenu li {
  text-decoration: none;
  display: block;
  transition: color 0.25s ease 0s;
  text-transform: uppercase;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
}

:root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  width: 100%;
  height: auto;
  background: #0671ba;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.menu .btn {
  display: block;
  padding: 0.5rem 0 0.5rem 1rem;
  border-bottom: solid 1px #e9e9e9;
  position: relative;
}

a.btn:hover {
  color: #ffffff;
  background: $active_color_menu;
}

a.btn:active {
  color: #ffffff;
  background: #22abe2;
}

.menu .submenu {
  background: #22abe2;
  overflow: hidden;
  /* max-height: 0; */
  /* max-height: 40rem; */
  transition: max-height 0.3s ease-out;
  transition-duration: 0.25s;
}

.menu .submenu a {
  display: block;
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
}

.menu .submenu a:hover {
  // padding-left: calc(1rem + 5px);
  color: #343e5c;
  background: #eceff1;
}

.menu .submenu a:hover::before {
  opacity: 1;
}

/* .item:target .submenu {
  max-height: 40rem;
} */

.icon-arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 15px;
  fill: #ffffff;
}

.background_active {
  background: $active_color_menu;
}
</style>
