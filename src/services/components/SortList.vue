<template>
  <PSelect
    v-if="mounted"
    v-model="sortModel"
    :popper-append-to-body="false"
    :clearable="!sortModel?.default"
    value-key="label"
    @change="setSort"
    @clear="setSort(undefined)"
  >
    <option v-for="(item, i) in Provider.sortList" :key="i" :label="item.label" :value="item" />
  </PSelect>
</template>

<script lang="ts" setup>
import SortModel from '@/services/classes/SortModel';
import Provider from '@/services/Provider/Provider';

defineProps({
  maxWidth: {
    type: [Number, String],
    default: 250,
  },
});

const mounted = ref(false);

let defaultSortModel: SortModel | undefined = undefined;
const emits = defineEmits(['load']);

const setDefaultSortModel: Ref<boolean> = Store.Getters('filter/setDefaultSortModel');
const sortModel: Ref<SortModel | undefined> = ref();

onBeforeMount((): void => {
  defaultSortModel = Provider.sortList.find((s: SortModel) => s.default) ?? Provider.sortList[0];
  // changeModel(undefined);
  mounted.value = true;
});

watch(setDefaultSortModel, () => setSort());

const changeModel = async (): Promise<void> => {
  if (!sortModel.value) {
    sortModel.value = defaultSortModel;
  }
  Provider.ftsp.value.setSortModel(sortModel.value as SortModel);
  Provider.ftsp.value.p.drop();
  emits('load');
};

const setSort = async () => {
  Provider.dropPagination();
  await changeModel();
};
</script>

<style lang="scss" scoped>
:deep(.el-select__wrapper) {
  min-height: 38px;
  margin-top: 7px;
}

.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;

  &:hover {
    color: #5cb6ff;
  }
}

.set {
  color: #5cb6ff;
}

:deep(.el-input__inner) {
  border-radius: 5px;
  padding-left: 10px;
  height: 40px;
  // width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

// :deep(.el-form-item) {
//   padding: 10px;
//   margin: 10px 0 0 0;
// }
</style>
