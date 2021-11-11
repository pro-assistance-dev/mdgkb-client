<template>
  <el-drawer v-model="isDrawerOpen" direction="ttb" title="Поиск по сайту" size="200px" @closed="closeDrawer" @opened="openDrawer">
    <el-input ref="searchInput" placeholder="Введите запрос">
      <template #append>
        <el-button icon="el-icon-search"></el-button>
      </template>
    </el-input>
  </el-drawer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'SearchDrawer',
  setup() {
    const store = useStore();
    const searchInput = ref<HTMLElement | null>(null);
    const isDrawerOpen: ComputedRef<boolean> = computed<boolean>(() => store.getters['search/isSearchDrawerOpen']);
    const openDrawer = () => {
      searchInput.value?.focus();
    };
    const closeDrawer = () => store.commit('search/toggleDrawer', false);

    return {
      searchInput,
      isDrawerOpen,
      closeDrawer,
      openDrawer,
    };
  },
});
</script>
