<template>
  <div v-if="mounted" class="menu">
    <div v-for="menu in page.menus" :key="menu.slug ? menu.slug : menu.id" class="menu-item">
      <div
        class="item-style"
        :class="isActive(menu.slug ? menu.slug : String(menu.id))"
        @click="changeMenu(menu.slug ? menu.slug : String(menu.id), menu.slug ? false : true)"
      >
        {{ menu.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Page from '@/services/classes/page/Page';

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true,
  },
});
const emits = defineEmits(['selectMenu']);
const mounted = ref(false);
const activeMenu: Ref<string | undefined> = ref('');

const setMenuFromRoute = () => {
  // let slug = Router.Route().query.menus as string;
  const id = Router.Route().query.menud as string;
  const slug = Router.Route().query.menus as string;
  if (id) {
    changeMenu(id, true);
  } else {
    changeMenu(slug, false);
  }
};

const isActive = (value: string): string => {
  return value === activeMenu.value ? 'is-active' : '';
};

const changeMenu = (value: string, isId: boolean) => {
  props.page.selectSideMenu(value, isId);
  const selectedMenu = props.page.getSelectedSideMenu();
  activeMenu.value = selectedMenu.slug ? selectedMenu.slug : selectedMenu.id;
  emits('selectMenu', selectedMenu);
  // if (isId) {
  //   Router.Replace({ query: { menud: activeMenu.value as string } });
  // } else {
  //   Router.Replace({ query: { menus: activeMenu.value as string } });
  // }
};

onBeforeMount(() => {
  setMenuFromRoute();
  mounted.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$side-cotainer-max-width: 300px;

.menu {
  border-radius: $border-radius;
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
