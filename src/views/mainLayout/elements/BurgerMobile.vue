<template>
  <div class="drop-burger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>
    <div class="menu__box">
      <div class="menu-zone">
        <div class="menu">
          <ul>
            <li v-for="menu in menus" :id="menu.id" :key="menu.id" class="item">
              <a v-if="!menu.withoutChildren()" :href="`#${menu.id}`" class="btn"
                >{{ menu.name }}
                <svg class="icon-arrow">
                  <use xlink:href="#arrow-down"></use>
                </svg>
              </a>
              <a v-else :href="menu.getLink()" class="btn">{{ menu.name }}</a>
              <div class="submenu">
                <ul v-if="!menu.withoutChildren()">
                  <li v-for="subMenu in menu.subMenus" :key="subMenu.id">
                    <a :href="subMenu.link">{{ subMenu.name }}</a>
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
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'BurgerMobile',

  emits: ['changeDrawerStatus'],
  setup(prop, { emit }) {
    let expand = ref(false);
    const activePath: Ref<string> = ref('');
    const store = useStore();
    const router = useRouter();

    const show = false;
    const menus = computed(() => store.getters['menus/items']);
    const route = useRoute();

    const menuClickHandler = (link: string) => {
      emit('changeDrawerStatus', false);
      router.push(link);
    };

    onBeforeMount(async () => {
      await store.dispatch('menus/getAll');
      activePath.value = route.path;
    });

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
    };
  },
});
</script>

<style lang="scss" scoped>
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
  visibility: hidden;
  top: -17px;
  left: -100%;
  width: 100%;
  height: 100%;
  margin: 0;
  list-style: none;
  text-align: left;
  z-index: 100;
  background: #000000;
  opacity: 0.96;
}

.menu-zone {
  max-width: 450px;
  height: 100%;
  z-index: 100;
  background: #eceff1;
  padding: 150px 10px 0 0;
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
#menu__toggle:checked ~ .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked ~ .menu__btn > span::before {
  top: 0;
  transform: rotate(0);
}
#menu__toggle:checked ~ .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  visibility: visible;
  left: 0;
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  transition-duration: 0.25s;
}

.menu__box {
  transition-duration: 0.15s;
}
.menu__item {
  transition-duration: 0.15s;
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
  background: #01528a;
}

a.btn:active {
  color: #ffffff;
  background: #22abe2;
}

.menu .submenu {
  background: #22abe2;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}

.menu .submenu a {
  display: block;
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
}

.menu .submenu a:hover {
  padding-left: calc(1rem + 5px);
  color: #343e5c;
  background: #eceff1;
}

.menu .submenu a:hover::before {
  opacity: 1;
}

.item:target .submenu {
  max-height: 40rem;
}

.icon-arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 15px;
  fill: #ffffff;
}
</style>
