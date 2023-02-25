<template>
  <el-form :gutter="12" label-position="top" :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item>
      <el-select
        multiple
        :model-value="filterModel.set"
        :filterable="filterable"
        clearable
        :placeholder="placeholder"
        round
        @change="addFilterModel"
      >
        <el-option v-for="(option, optionIndex) in options" :key="optionIndex" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IOption from '@/interfaces/schema/IOption';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'FilterMultipleSelect',
  props: {
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
    filterModel: {
      type: Object as PropType<IFilterModel>,
      default: () => new FilterModel(),
      required: true,
    },
    filterable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    maxWidth: {
      type: [Number, String],
      default: 250,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const addFilterModel = (values: string[]) => {
      props.filterModel.replaceSet(...values);
      if (!values.length) {
        reloadModel();
      } else {
        Provider.setFilterModel(props.filterModel);
      }
      emit('load');
    };

    const reloadModel = () => {
      Provider.spliceFilterModel(props.filterModel.id);
    };

    return {
      addFilterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
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

// .filter-form {
// width: 100%;
// }
</style>
