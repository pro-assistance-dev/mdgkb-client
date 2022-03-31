<template>
  <el-form>
    <el-select v-model="selectedMode" class="m-2" placeholder="Выберите раздел" @change="$emit('selectMode', $event)">
      <el-option v-for="item in modes" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import IOption from '@/interfaces/schema/IOption';

export default defineComponent({
  name: 'DpoChoice',
  props: {
    modes: {
      type: Array as PropType<IOption[]>,
      required: false,
      default: () => [],
    },
  },
  emits: ['selectMode'],
  setup(props, { emit }) {
    const value = ref('');
    const selectedMode: Ref<string> = ref('');

    onBeforeMount(async () => {
      // selectedMode.value.value = props.modes[0].value;
      selectedMode.value = props.modes[0].label;
      emit('selectMode', props.modes[0].value);
    });

    return { selectedMode };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 5px;
  padding-left: 25px;
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  background: #2754eb;
  color: #ffffff;
}

:deep(.el-input__inner::placeholder) {
  color: #ffffff;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #ffffff;
}

:deep(.el-input__suffix) {
  top: -2px;
}
</style>
