<template>
  <el-autocomplete
    ref="searchForm"
    v-model="queryString"
    :value-key="'label'"
    style="width: 100%; margin-right: 10px"
    popper-class="wide-dropdown"
    :placeholder="placeholder"
    :fetch-suggestions="find"
    :trigger-on-focus="showSuggestions"
    @select="handleSelect"
    @input="handleInput"
  >
    <template #suffix>
      <i class="el-icon-search" />
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import { watch } from 'vue';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import SearchGroup from '@/services/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearch from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'RemoteSearch',
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
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
    placeholder: {
      type: String as PropType<string>,
      default: 'Начните вводить запрос',
    },
    showSuggestions: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    maxWidth: {
      type: [Number, String],
      default: 350,
    },
    focus: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['select', 'load', 'input'],
  setup(props, { emit }) {
    const queryString: Ref<string> = ref(props.modelValue);
    const searchForm = ref();
    const searchModel: Ref<SearchModel> = computed<SearchModel>(() => Provider.store.getters['search/searchModel']);

    watch(
      () => props.focus,
      () => {
        if (props.focus) {
          setTimeout(() => {
            searchForm.value.focus();
            queryString.value = '';
          }, 500);
        }
      }
    );

    const find = async (query: string, resolve: (arg: unknown) => void): Promise<void> => {
      if (query.length < 2) {
        resolve([]);
        return;
      }
      searchForm.value.activated = true;
      searchModel.value.searchObjects = [];
      searchModel.value.query = query;
      searchModel.value.key = props.keyValue;
      const groupForSearch = searchModel.value.searchGroups.find((group: SearchGroup) => group.key === props.keyValue);
      if (groupForSearch) {
        searchModel.value.searchGroup = groupForSearch;
      }
      await Provider.store.dispatch(`search/search`, searchModel.value);

      // emit('input', searchModel.value.searchObjects);
      if (props.showSuggestions) {
        resolve(searchModel.value.searchObjects);
        return;
      }
      resolve([]);
    };

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await Provider.store.dispatch(`search/search`, Provider.filterQuery.value);
        Provider.store.commit('pagination/setCurPage', 0);
      }
    };
    const handleSelect = async (item: ISearch): Promise<void> => {
      if (props.storeModule != '') {
        await Provider.store.dispatch(`${props.storeModule}/getAllById`, item.id);
        return;
      }
      emit('select', item);
      queryString.value = '';
    };

    const createModel = (): FilterModel => {
      const fm = FilterModel.CreateFilterModel(props.table, props.col, DataTypes.String);
      fm.operator = Operators.Like;
      return fm;
    };

    const filterModel = ref(createModel());

    const onEnter = async (): Promise<void> => {
      filterModel.value.value1 = queryString.value;
      Provider.store.commit('filter/setFilterModel', filterModel.value);
      emit('load');
      searchForm.value.close();
    };

    const handleInput = (value: string) => {
      emit('input', value);
      if (value.length === 0) {
        emit('input', '');
      }
    };

    return { searchForm, onEnter, queryString, handleSelect, find, handleSearchInput, handleInput };
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
  padding-left: 10px;
  height: 34px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
}

:deep(.el-input__suffix) {
  top: -2px;
}

:deep(.el-form-item) {
  margin: 0;
}

.el-form {
  width: 100%;
}

.el-icon-search {
  margin-right: 5px;
}
</style>
