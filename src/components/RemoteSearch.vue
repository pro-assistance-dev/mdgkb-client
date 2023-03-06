<template>
  <el-form :style="{ maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }" @submit.prevent="onEnter">
    <el-form-item style="margin: 0">
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
          <i class="el-icon-search"> </i>
        </template>
      </el-autocomplete>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/classes/SearchModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import ISearch from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';
import StringsService from '@/services/Strings';

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
    mustBeTranslated: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    maxWidth: {
      type: [Number, String],
      default: 300,
    },
  },
  emits: ['select', 'load', 'input'],
  setup(props, { emit }) {
    const queryString: Ref<string> = ref(props.modelValue);
    const searchForm = ref();
    const searchModel: Ref<SearchModel> = computed<SearchModel>(() => Provider.store.getters['search/searchModel']);

    const find = async (query: string, resolve: (arg: any) => void): Promise<void> => {
      if (query.length < 2) {
        resolve([]);
        return;
      }
      searchForm.value.activated = true;
      searchModel.value.searchObjects = [];
      searchModel.value.query = StringsService.translit(query);
      searchModel.value.mustBeTranslated = props.mustBeTranslated;
      const groupForSearch = searchModel.value.searchGroups.find((group: SearchGroup) => group.key === props.keyValue);
      if (groupForSearch) {
        searchModel.value.searchGroup = groupForSearch;
      }
      await Provider.store.dispatch(`search/search`, searchModel.value);

      emit('input', searchModel.value.searchObjects);
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

    const createModel = (): IFilterModel => {
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

    const handleInput = (i: string) => {
      if (i.length === 0) {
        emit('input', []);
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
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  // width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__suffix) {
  top: -2px;
}

:deep(.el-form-item) {
  margin: 0;
}

.el-form {
  padding: 0 10px;
  width: 100%;
}

.el-icon-search {
  margin-right: 5px;
}
</style>
