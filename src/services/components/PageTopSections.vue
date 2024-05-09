<template>
  <MenuContainer v-if="mounted" min-menu-item-width="160px" background="#DFF2F8">
    <template #menu>
      <div v-for="menu in sections" :key="menu.id">
        <div :class="{ 'selected-tab': activeMenu.id === menu.id, tab: activeMenu.id !== menu.id }" @click="changeMenu(menu.id)">
          {{ menu.name }}
        </div>
      </div>
    </template>
    <template #body>
      <component :is="component" :key="componentKey" />
    </template>
  </MenuContainer>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';

import CustomSection from '@/services/classes/page/CustomSection';
import MenuContainer from '@/services/components/MenuContainer.vue';
import Provider from '@/services/Provider/Provider';

const componentKey = ref(0);
const mounted = ref(false);
const customSections: ComputedRef<CustomSection[]> = computed(() => Provider.store.getters['customSections/items']);
const sections: Ref<CustomSection[]> = ref([]);
const activeMenu: Ref<CustomSection> = ref(sections.value[0]);
const props = defineProps({
  components: {
    type: Object as PropType<Object>,
    required: true,
  },
});

const component = shallowRef(props.components[props.components[0]]);

const setMenuFromRoute = () => {
  let menu = Provider.route().query.menu as string;
  if (!menu) {
    menu = customSections.value.find((c) => props.components[c.component])?.id;
  }
  changeMenu(menu);
};

const changeMenu = (customSectionId: string) => {
  console.log(customSectionId);
  const section = customSections.value.find((m: CustomSection) => {
    return m.id === customSectionId;
  });
  if (!section) {
    return;
  }
  activeMenu.value = section;
  component.value = props.components[activeMenu.value.component];
  Provider.router.replace({ query: { menu: section.id as string } });
  componentKey.value += 1;
};

const load = async () => {
  await Provider.store.dispatch('customSections/getAll', { withCache: true });
  sections.value = customSections.value.filter((item) => props.components[item.component]);
  setMenuFromRoute();
  mounted.value = true;
};

onBeforeMount(async () => {
  await load();
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/base-style.scss';

.field {
  width: 100%;
  height: 100%;
  background: red;
  padding: 10px;
}

.tab {
  font-size: 12px;
  text-transform: uppercase;
  color: #b0a4c0;
  border: 1px solid #999999;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: #f5f5f5;
  margin: -0.5px;
}

.tab:hover {
  background: $custom-background;
}

.selected-tab {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: $site_dark_gray;
  position: relative;
  border: 1px solid #343d5c;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: $custom-background;
  margin: -0.5px;
  z-index: 1;
}
</style>
