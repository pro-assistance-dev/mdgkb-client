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

<script lang="ts" setup>
import ISearchQuery from '@/services/interfaces/ISearchQuery';
const searchForm = ref();
const queryString: Ref<string> = ref('');
const searchMenus: ComputedRef<ISearchQuery[]> = Store.Getters('admin/searchMenus');

const querySearch = (queryString: string, cb: (q: ISearchQuery[]) => ISearchQuery[]) => {
  Store.Commit('admin/filterMenus');
  console.log(searchMenus.value);
  if (!queryString) {
    cb(searchMenus.value);
    return;
  }
  const res = searchMenus.value.filter((searchMenu: ISearchQuery) => {
    return Strings.SearchIn(searchMenu.value, queryString);
  });
  console.log(res);
  cb(res);
  // call callback function to return suggestions\
};

const handleSelect = async (item: ISearchQuery) => {
  await Router.To(item.link);
  queryString.value = '';
};
</script>
