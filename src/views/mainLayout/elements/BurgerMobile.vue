<template>
  <div class="burger-drop">
    <button class="burger-menu">
      <svg class="icon-menu">
        <use xlink:href="#Main_menu_burger"></use>
      </svg>
    </button>
    <div class="drop-burger-menu">
      <ul class="drop-burger-menu-item">
        <li v-for="menu in menus" :key="menu.id">
          <router-link :to="menu.getLink()">{{ menu.name }}</router-link>
          <ul v-if="!menu.withoutChildren()">
            <li v-for="subMenu in menu.subMenus" :key="subMenu.id">
              <router-link class="link-colomn" :to="subMenu.link">{{ subMenu.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
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

.hidden {
  display: none;
}

.burger-drop {
  align-content: center;
  display: flex;
}

.burger-menu {
  position: relative;
  display: inline-block;
  align-content: center;
}

.drop-burger-menu {
  display: none;
  position: absolute;
  top: 60px;
}

.burger-menu:focus ~ .drop-burger-menu,
.burger-menu:active ~ .drop-burger-menu,
.drop-burger-menu:hover {
  display: block;
}

.burger-menu:focus-within {
  stroke: #379fff;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  display: flex;
}

.icon-menu {
  width: 28px;
  height: 28px;
  stroke: #343e5c;
  transition: 0.25s;
  padding-right: 7px;
  padding-left: 7px;
  display: flex;
}

.icon-menu:hover {
  stroke: #0671ba;
}

ul {
  margin: 0;
  padding: 0;
}
ul.drop-burger-menu-item li {
  background: #f0f2f7;
  border-bottom: 1px solid #dfe4ee;
  list-style: none;
  width: 166px;
}

ul.drop-burger-menu-item li a {
  text-decoration: none;
  display: block;
  padding: 5px 5px 5px 15px;
  color: #343e5c;
  transition: color 0.3s ease 0s;
  text-transform: uppercase;
  align-items: center;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
}

ul.drop-burger-menu-item li ul {
  display: none;
}

ul.drop-burger-menu-item li:hover {
  position: relative;
  background: #ffffff;
}

ul.drop-burger-menu-item li:hover > ul {
  display: block;
}

ul.drop-burger-menu-item li:hover ul {
  position: absolute;
  top: 0;
  left: 165px;
}
</style>
