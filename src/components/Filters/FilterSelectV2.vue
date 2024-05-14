<template>
  <el-form :gutter="12" label-position="top" :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item>
      <el-select v-model="selectedModel" clearable :placeholder="placeholder" round @change="setFilterModel">
        <el-option v-for="filterModel in filterModels" :key="filterModel.id" :label="filterModel.label" :value="filterModel.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'FilterSelectV2',
  props: {
    filterModels: {
      type: Array as PropType<FilterModel[]>,
      default: () => [],
      required: true,
    },
    maxWidth: {
      type: [Number, String],
      default: 250,
    },
    placeholder: {
      type: String as PropType<string>,
      default: 'Начните фильтр',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const selectedModel: Ref<string | undefined> = ref(undefined);
    const prevModel: Ref<string | undefined> = ref(undefined);

    const setFilterModel = (filterModelId: string) => {
      if (filterModelId === '' && prevModel.value) {
        Provider.spliceFilterModel(prevModel.value);
        prevModel.value = undefined;
        emit('load');
        return;
      }
      const newFilter = props.filterModels.find((f: FilterModel) => f.id === filterModelId);
      if (newFilter && selectedModel.value) {
        Provider.replaceFilterModel(newFilter, prevModel.value);
        prevModel.value = newFilter.id;
      }
      emit('load');
    };
    return {
      selectedModel,
      setFilterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// @import '@/assets/elements/filterForm.scss';

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  // width: 100%;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__suffix) {
  top: -2px;
}

:deep(.el-form-item) {
  padding: 0 10px;
  margin: 0;
}

.el-form {
  width: 100%;
}

// :deep(.el-select__popper) {
//   width: inherit;
// }
</style>
