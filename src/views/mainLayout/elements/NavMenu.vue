<template>
  <div v-if="vertical" style="margin: 10px">
    <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="menuClickHandler('/')" />
  </div>
  <el-menu :ellipsis="false" class="header-bottom-menu" :mode="vertical ? 'vertical' : 'horizontal'" :router="true" default-active="1x">
    <template v-for="(menu, i) in menus" :key="menu.id">
      <el-menu-item
        v-if="menu.withoutChildren()"
        :index="String(menu.getLink())"
        class="header-bottom-menu-item"
        @click="menuClickHandler(menu.getLink())"
      >
        <div class="icon">
          <object v-if="menu.icon.fileSystemPath" :data="menu.icon.getImageUrl()" class="menu-img" />
          <strong>{{ menu.name }}</strong>
        </div>
      </el-menu-item>
      <el-sub-menu
        v-else
        :popper-class="'sub-menu-popover'"
        :show-timeout="50"
        :hide-timeout="100"
        :index="String(i)"
        class="header-bottom-menu-item"
      >
        <template #title
          ><span class="header-bottom-menu-item">
            <strong>{{ menu.name }}</strong></span
          ></template
        >
        <template v-for="subMenu in menu.subMenus" :key="subMenu.id">
          <el-menu-item :index="String(subMenu.link)" class="header-bottom-submenu-item" @click="menuClickHandler(subMenu.getLink())">
            <div class="icon">
              <object v-if="subMenu.icon.fileSystemPath" :data="subMenu.icon.getImageUrl()" class="menu-img" />
            </div>
            <strong> {{ subMenu.name }}</strong>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
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
/* layout */
.gridcontainer {
  width: 50vw;

  .grid {
    padding: 2%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    grid-auto-rows: 9rem;
    grid-gap: 16px;
    grid-auto-flow: dense;
  }

  .grid--big-columns {
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  }

  .grid--big-gap {
    grid-gap: 2.5rem;
  }

  /* styling */

  .card--expanded {
    grid-column: span 3;
    grid-row: span 3;
    .card__img {
      transform: scale(1.03);
    }
  }
}

.icon svg {
  width: 20px;
  margin-right: 10px;
}

.icon {
  fill: #ffffff;
  display: flex;
  align-items: center;
  color: black;
}

.menu-img {
  height: 18px;
  width: 18px;
  margin-right: 5px;
}
:deep(.el-drawer__body) {
  padding: 0 !important;
}
</style>
