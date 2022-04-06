<template>
  <ul v-if="mounted" class="menu-center-list">
    <li v-for="menu in menus" :key="menu.id">
      <router-link class="link-menu" :to="menu.getLink()">
        {{ menu.name }}
      </router-link>
      <ul v-if="!menu.withoutChildren()" class="dropmenu">
        <div class="subMenu-place">
          <li v-for="subMenu in menu.subMenus" :key="subMenu.id">
            <router-link class="link-colomn" :to="subMenu.link">
              <div class="index-about-column">
                <div class="index-about-colomn-icon">
                  <div class="icon">
                    <BaseIcon width="50" height="50" :color="subMenu.background" :icon-name="subMenu.iconName">
                      <HelpProfileIcon :svg-code="subMenu.svgCode" />
                    </BaseIcon>
                  </div>
                </div>
                <div class="index-about-colomn-text" :style="{ color: subMenu.background }">
                  {{ subMenu.name }}
                </div>
              </div>
            </router-link>
          </li>
        </div>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch, WritableComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import BaseIcon from '@/components/Base/MedicalIcons/BaseIconMedicalProfiles.vue';
import HelpProfileIcon from '@/components/Base/MedicalIcons/icons/HelpProfileIcon.vue';
import IMenu from '@/interfaces/IMenu';

export default defineComponent({
  name: 'NavMenu',
  components: {
    BaseIcon,
    HelpProfileIcon,
  },
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
    const mounted = ref(false);
    const menus: WritableComputedRef<IMenu[]> = computed(() => store.getters['menus/menus']);

    const isAuth = computed(() => store.getters['auth/isAuth']);

    const route = useRoute();

    const menuClickHandler = (link: string) => {
      emit('changeDrawerStatus', false);
      router.push(link);
    };

    onBeforeMount(async () => {
      await store.dispatch('menus/getAll');
      setColors();
      activePath.value = route.path;
      mounted.value = true;
    });

    const setColors = (): void => {
      const colors: string[] = ['#31af5e', '#ff4d3b', '#006BB5', '#f3911c'];

      for (let menuIndex = 0; menuIndex < menus.value.length; menuIndex++) {
        for (let subMenuIndex = 0; subMenuIndex < menus.value[menuIndex].subMenus.length; subMenuIndex++) {
          menus.value[menuIndex].subMenus[subMenuIndex].background = colors[subMenuIndex % 4];
        }
      }
    };

    watch(
      () => route.path,
      () => (activePath.value = route.path)
    );
    watch(isAuth, () => {
      store.commit(`menus/setMenus`);
      setColors();
    });

    return {
      isAuth,
      mounted,
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

.menu-center {
  min-width: 792px;
  height: 58px;
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
  padding: 21px 0px 19px 0px;
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
  padding: 22px 20px 21px 20px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  background: #f0f2f7;
}

.link-menu:hover {
  background: #ffffff;
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
  background: #ffffff;
  overflow: hidden;
  box-shadow: 2px 4px 3px 3px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  margin: 5px;
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
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  margin-top: 22px;
  cursor: pointer;
}

.link-menu:focus ~ .dropmenu,
.link-menu:active ~ .dropmenu,
.dropmenu:hover {
  display: block;
}

.link-menu:focus-within {
  background: #ffffff;
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
  width: 636px;
}

li:hover {
  cursor: pointer;
}

@media screen and (max-width: 1025px) {
  .menu-center {
    display: block;
  }
}
</style>
