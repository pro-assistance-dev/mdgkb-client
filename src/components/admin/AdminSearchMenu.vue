<template>
  <el-autocomplete
    ref="searchForm"
    v-model="queryString"
    style="width: 100%; margin-right: 10px"
    popper-class="wide-dropdown"
    placeholder="Поиск по меню"
    :fetch-suggestions="querySearch"
    size="small"
    @select="handleSelect"
  />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ISearchQuery from '@/interfaces/ISearchQuery';
export default defineComponent({
  name: 'AdminSearchMenu',

  setup() {
    const store = useStore();
    const router = useRouter();
    const searchForm = ref();
    const queryString: Ref<string> = ref('');
    const adminMenus: ComputedRef<ISearchQuery[]> = computed(() => store.getters['admin/adminMenus']);

    const createFilter = (queryString: string) => {
      return (menuItem: ISearchQuery) => {
        return menuItem.value.toLowerCase().includes(queryString.toLowerCase());
      };
    };
    const querySearch = (queryString: string, cb: (q: ISearchQuery[]) => ISearchQuery[]) => {
      const results = queryString ? adminMenus.value.filter(createFilter(queryString)) : adminMenus.value;
      // call callback function to return suggestions\
      cb(results);
    };
    const handleSelect = (item: ISearchQuery) => {
      router.push(item.link);
      queryString.value = '';
    };
    return {
      queryString,
      searchForm,
      querySearch,
      handleSelect,
    };
  },
});
</script>
