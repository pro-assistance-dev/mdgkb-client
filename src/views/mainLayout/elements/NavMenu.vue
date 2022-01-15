<template>
  <div class="menu-center" :mode="vertical ? 'vertical' : 'horizontal'" :router="true" default-active="1x">
    <ul class="menu-center">
      <li v-for="menu in menus" :key="menu.id">
        <router-link class="link-menu" :to="menu.getLink()">{{ menu.name }}</router-link>
        <ul v-if="!menu.withoutChildren()" class="dropmenu">
          <div class="subMenu-place">
            <li v-for="subMenu in menu.subMenus" :key="subMenu.id">
              <router-link class="link-colomn" :to="subMenu.link">
                <div class="index-about-column">
                  <div class="index-about-colomn-icon"></div>
                  <div class="index-about-colomn-text">
                    <h3>{{ subMenu.name }}</h3>
                  </div>
                </div>
              </router-link>
            </li>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IMenu from '@/interfaces/elements/IMenu';

export default defineComponent({
  name: 'NavMenu',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
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

    const collapseCard = () => menus.value.forEach((v: IMenu) => v.collapseCard());

    return {
      menus,
      collapseCard,
      expand,
      activePath,
      menuClickHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
/*Общие свойства, свойства для главной*/

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

ul.menu-center {
  display: flex;
  height: 60px;
  align-items: center;
}

ul.menu-center li {
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  display: inline;
  text-align: center;
  color: #343e5c;
}

.link-menu {
  color: #343e5c;
  text-decoration: none;
  transition: color 0.3s ease 0s;
  border: solid 1px #f5f6f8;
  background: #f5f6f8;
  padding: 20px 20px;
  text-transform: uppercase;
}

.link-menu:hover {
  background: #ffffff;
}

.link-menu:active {
  background: #ffffff;
}

.link-menu-selected {
  color: var(--text-menu-color);
  text-decoration: none;
  transition: color 0.3s ease 0s;
  border: solid 1px var(--menu-bg-color);
  background: var(--main-bg-color);
  padding: 20px 25px;
}

.title-box {
  overflow: hidden;
}

.title {
  height: 60px;
  display: flex;
  align-items: center;
}

.title-box-text {
  display: flex;
  height: 80px;
  align-items: center;
  color: var(--text-menu-color);
  border: solid 1px var(--border-color);
  border-radius: 40px;
  padding-left: 80px;
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
  // border: rgba(0, 0, 0, 0.05) solid 1px;
  // border-radius: 5px;
  background-clip: padding-box;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 2px 4px 3px 3px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  margin: 5px;
  // position: relative;
}

.index-about-colomn-text {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: left;
  color: #343e5c;
}

.index-about-colomn-icon {
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
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
  // transition: color 0.3s ease 0s;
  // color: #343e5c;
}

.icon-1 {
  width: 100px;
  height: 100px;
  fill: #0bae57;
  transition: 0.25s;
}

li .dropmenu {
  display: none;
  position: absolute;
  left: 45%;
  transform: translateX(-45%);
  z-index: 99;
  margin-top: 22px;
  cursor: pointer;
}

.link-menu:focus ~ .dropmenu,
.link-menu:active ~ .dropmemu,
.dropmenu:hover {
  display: block;
}

.index-about-column:hover {
  transform: scale(1.03);
  transition: 0.1s;
}

.subMenu-place {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-flow: row wrap;
  padding: 1px 0px 1px 4px;
  background: #f5f6f8;
  width: 635px;
}

@media screen and (max-width: 1025px) {
  .menu-center {
    display: block;
  }

  .menu-center {
    width: 320px;
  }

  ul.menu-center {
    display: flex;
    width: auto;
    align-items: center;
  }

  .subMenu-place {
    width: 210px;
  }
}
</style>
