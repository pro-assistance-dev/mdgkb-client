<template>
  <el-form-item>
    <el-autocomplete
      v-model="queryString"
      style="width: 100%; margin-right: 10px"
      popper-class="wide-dropdown"
      :fetch-suggestions="find"
      placeholder="Введите ФИО врача"
      @select="handleSelect"
      @input="handleSearchInput"
    />
  </el-form-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import SearchModel from '@/classes/SearchModel';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearch from '@/interfaces/ISearchObject';
import { SearchModes } from '@/interfaces/SearchModes';

export default defineComponent({
  name: 'RemoteSearchV2',
  props: {
    keyValue: {
      type: String as PropType<string>,
      default: '',
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const store = useStore();
    const queryString: Ref<string> = ref(props.modelValue);

    const searchGroups: ComputedRef<ISearchGroup[]> = computed<ISearchGroup[]>(() => store.getters['search/searchGroups']);

    const find = async (query: string, resolve: CallableFunction): Promise<void> => {
      const searchModel = new SearchModel();
      searchModel.searchMode = SearchModes.SearchModeObjects;
      if (query.length > 2) {
        searchModel.query = query;
        const groupForSearch = searchGroups.value.find((group: ISearchGroup) => group.key === props.keyValue);
        if (groupForSearch) {
          searchModel.searchGroup = groupForSearch;
        }
        await store.dispatch(`search/search`, searchModel);
      }
      resolve(searchModel.searchObjects);
    };

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch(`search/search`, store.getters['filter/filterQuery']);
      }
      store.commit('pagination/setCurPage', 0);
    };

    const handleSelect = async (item: ISearch): Promise<void> => {
      if (props.storeModule != '') {
        await store.dispatch(`${props.storeModule}/getAllById`, item.id);
        return;
      }
      emit('select', item);
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

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 38px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}
</style>
