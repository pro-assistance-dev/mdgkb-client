<template>
  <div class="drop-burger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>
    <div class="menu__box">
      <div class="menu">
        <ul>
          <li v-for="menu in menus" :id="menu.id" :key="menu.id" class="item">
            <a v-if="!menu.withoutChildren()" :href="`#${menu.id}`" class="btn">{{ menu.name }}</a>
            <a v-else :href="menu.getLink()" class="btn">{{ menu.name }}</a>
            <div class="submenu">
              <ul v-if="!menu.withoutChildren()">
                <li v-for="subMenu in menu.subMenus" :key="subMenu.id">
                  <router-link :to="subMenu.link">{{ subMenu.name }}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol id="Main_menu_burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3 12H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M3 6H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M3 18H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
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
  z-index: 999;
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #616161;
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
  width: calc(100% - 20px);
  height: 100vh;
  margin: 0;
  padding: 150px 10px;
  list-style: none;
  text-align: left;
  z-index: 100;
}

.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
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
  max-width: 450px;
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
  transition: max-height 0.25s ease-out;
}

.menu .submenu a {
  display: block;
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
}

.menu .submenu a::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 5px;
  background: #ff4e3c;
  opacity: 0;
  transition: all 0.5s;
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
  max-height: 20rem;
}
</style>
