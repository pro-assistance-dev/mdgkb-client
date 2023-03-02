<template>
  <div v-if="mounted">
    <div v-for ="menu in page.pageSideMenus" :key="menu.id">
      <div class="menu-item" :class="isActive(menu.id)" @click="changeMenu(menu.id)">
        {{ menu.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Page from '@/classes/page/Page';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PageSideMenu',
  props: {
    page: {
      type: Object as PropType<Page>,
      required: true,
    },
  },
  emits: ['selectMenu', 'close'],
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
      emit('close',close);
      return id === activeMenuId.value ? 'is-active' : '';
    };

    const changeMenu = (id: string) => {
      // close.value = true;
      // emit('close',close);
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

.menu-item {
  padding: 10px 20px;
  min-width: calc($side-cotainer-max-width - 40px);
  width: calc(100% - 40px);
  cursor: pointer;
  border-bottom: $normal-border;
  background: #ffffff;
}

.menu-item:hover {
  background: #F0F2F7;
}

.is-active {
  background: #F0F2F7;
}

</style>
