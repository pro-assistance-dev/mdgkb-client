<template>
  <PAutocomplete
    ref="searchForm"
    v-model="queryString"
    :value-key="'label'"
    style="width: 100%; margin-right: 10px"
    :placeholder="placeholder"
    :search-func="find"
    :trigger-on-focus="showSuggestions"
    :suggestions="searchModel.searchObjects"
    @select="handleSelect"
    @input="handleInput"
  >
    <template #suffix>
      <i class="el-icon-search" />
    </template>
  </PAutocomplete>
</template>

<script lang="ts" setup>
import SearchGroup from '@/services/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';
import ISearchObject from '@/services/interfaces/ISearchObject';
import ISearch from '@/services/interfaces/ISearchObject';

const props = defineProps({
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
});
const emit = defineEmits(['select', 'load', 'input']);
const queryString: Ref<string> = ref(props.modelValue);
const searchForm = ref();
const searchModel: SearchModel = SearchStore.SearchModel();

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

const find = async (query: string): Promise<ISearchObject[] | undefined> => {
  if (query.length < 2) {
    return;
  }
  searchForm.value.activated = true;
  searchModel.searchObjects = [];
  searchModel.query = query;
  searchModel.key = props.keyValue;
  const groupForSearch = searchModel.searchGroups.find((group: SearchGroup) => group.key === props.keyValue);
  if (groupForSearch) {
    searchModel.searchGroup = groupForSearch;
  }
  await SearchStore.Search(searchModel);

  console.log(searchModel);
  // emit('input', searchModel.searchObjects);
  // if (props.showSuggestions) {
  //   resolve(searchModel.searchObjects);
  //   return;
  // }
  return searchModel.searchObjects;
};

const handleSelect = async (item: ISearch): Promise<void> => {
  emit('select', item);
  queryString.value = '';
};

const handleInput = (value: string) => {
  emit('input', value);
  if (value.length === 0) {
    emit('input', '');
  }
};
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
