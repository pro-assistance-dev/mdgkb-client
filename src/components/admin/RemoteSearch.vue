<template>
  <el-autocomplete
    v-model="queryString"
    style="width: 100%; margin-bottom: 20px; margin-right: 10px"
    popper-class="wide-dropdown"
    :fetch-suggestions="find"
    :placeholder="placeholder"
    @select="handleSelect"
    @input="handleSearchInput"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ISearch from '@/interfaces/ISearchObject';
import ISearchObject from '@/interfaces/ISearchObject';

export default defineComponent({
  name: 'RemoteSearch',
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Поиск',
    },
  },
  setup() {
    const store = useStore();
    const queryString: Ref<string> = ref('');
    const storeModule: string = store.getters['filter/storeModule'];

    const find = async (query: string, resolve: CallableFunction): Promise<void> => {
      const searchObjects: ISearchObject[] = [];
      if (query.length > 2) {
        await store.dispatch(`${storeModule}/search`, { query: query, searchObjects: searchObjects });
      }
      resolve(searchObjects);
    };

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch(`${storeModule}/getAll`, store.getters['filter/filterQuery']);
      }
      store.commit('pagination/setCurPage', 0);
    };

    const handleSelect = async (item: ISearch): Promise<void> => {
      await store.dispatch(`${storeModule}/getAllById`, item.id);
    };

    return { queryString, handleSelect, find, handleSearchInput };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
