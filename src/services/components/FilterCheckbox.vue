<template>
  <PCheckBox v-model="checked" :label="model.label" size="mini" @change="setFilterModel" />
  <!-- <el-checkbox :model-value="model.boolean" :label="model.label" size="mini" -->
  <!--   @change="setFilterModel" /> -->
</template>

<script lang="ts" setup>
import FilterModel from '@/services/classes/filters/FilterModel';
const props = defineProps({
  model: {
    type: Object as PropType<FilterModel>,
    default: () => new FilterModel(),
    required: true,
  },
});
const checked = ref(false);
const emits = defineEmits(['load']);

const setFilterModel = () => {
  props.model.setBoolean(checked.value);
  if (checked.value) {
    FTSP.Get().setF(props.model);
  } else {
    FTSP.Get().removeF(props.model);
  }
  emits('load');
};
</script>

<style lang="scss" scoped>
@import '@/services/assets/style/index.scss';
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
