<template>
  <el-form>
    <el-form-item>
      <el-autocomplete
        v-model="queryString"
        style="width: 100%; margin-right: 10px"
        popper-class="wide-dropdown"
        :placeholder="placeHolder"
        :fetch-suggestions="find"
        @select="handleSelect"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
import ISearch from '@/interfaces/ISearchObject';

export default defineComponent({
  name: 'RemoteSearch',
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
    placeHolder: {
      type: String as PropType<string>,
      default: 'Начните вводить запрос',
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const store = useStore();
    const queryString: Ref<string> = ref(props.modelValue);

    const searchModel: Ref<ISearchModel> = computed<ISearchModel>(() => store.getters['search/searchModel']);

    const find = async (query: string, resolve: (arg: any) => void): Promise<void> => {
      searchModel.value.searchObjects = [];
      searchModel.value.query = query;
      const groupForSearch = searchModel.value.searchGroups.find((group: ISearchGroup) => group.key === props.keyValue);
      if (groupForSearch) {
        searchModel.value.searchGroup = groupForSearch;
      }
      await store.dispatch(`search/search`, searchModel.value);
      resolve(searchModel.value.searchObjects);
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
      queryString.value = '';
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
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__suffix) {
  top: -2px;
}
</style>
