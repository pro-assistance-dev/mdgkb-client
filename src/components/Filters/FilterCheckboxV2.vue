<template>
  <div class="filter-form">
    <el-form label-position="top">
      <el-form-item>
        <el-checkbox :model-value="filterModel.boolean" :label="filterModel.label" size="mini" @change="setFilterModel" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'FilterCheckboxV2',
  props: {
    filterModel: {
      type: Object as PropType<FilterModel>,
      default: () => new FilterModel(),
      required: true,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const setFilterModel = (value: boolean) => {
      props.filterModel.setBoolean(value);
      if (value) {
        Provider.setFilterModel(props.filterModel);
      } else {
        Provider.spliceFilterModel(props.filterModel.id);
      }
      emit('load');
    };
    return {
      setFilterModel,
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
