<template>
  <div v-if="mounted" class="menu">
    <div v-for="menu in page.getPageSideMenus()" :key="menu.id" class="menu-item">
      <div class="item-style" :class="isActive(menu.id)" @click="changeMenu(menu.id)">
        {{ menu.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Page from '@/services/classes/page/Page';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PageSideMenuV2',
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true,
    },
  },
  emits: ['selectMenu'],
  setup(props, { emit }) {
    const mounted = ref(false);
    const close = ref(false);
    const activeMenuId: Ref<string | undefined> = ref('');
    const setMenuFromRoute = () => {
      let menu = Provider.route().query.menu as string;
      changeMenu(menu);
    };

    const isActive = (id: string): string => {
      close.value = true;
      return id === activeMenuId.value ? 'is-active' : '';
    };

    const changeMenu = (id: string) => {
      props.page.selectSideMenu(id);
      const menu = props.page.getSelectedSideMenu();
      activeMenuId.value = menu.id;
      emit('selectMenu', menu);
      Provider.router.replace({ query: { menu: activeMenuId.value as string } });
    };

    onBeforeMount(() => {
      setMenuFromRoute();
      mounted.value = true;
    });

    return {
      activeMenuId,
      isActive,
      mounted,
      changeMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';
$side-cotainer-max-width: 300px;

.menu {
  border-radius: $normal-border-radius;
  border: $normal-border;
  background: $base-background;
}

.menu-item {
  min-width: $side-cotainer-max-width;
  width: 100%;
  cursor: pointer;
  border-bottom: $normal-border;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #f0f2f7;
}

.item-style {
  padding: 10px 20px;
}

.is-active {
  background: #f0f2f7;
}
</style>
