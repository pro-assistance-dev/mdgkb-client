<template>
  <div
    class="style-container"
    :style="{
      width: width,
      position: 'relative',
    }"
  >
    <el-date-picker
      v-model="date"
      type="date"
      format="DD.MM.YY"
      :placeholder="placeholder"
      :style="{
        width: width,
        position: 'relative',
        cursor: 'pointer',
      }"
      @change="changeHandler"
    ></el-date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import dateFormat from '@/services/DateMask';

export default defineComponent({
  name: 'SmallDatePicker',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Выберите дату',
    },
    width: { type: String as PropType<string>, required: false, default: 'auto' },
    readonly: { type: Boolean, required: false, default: false },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const date: Ref<Date> = ref(new Date());
    const changeHandler = (value: Date) => {
      const date = new Date(value);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      emit('update:modelValue', new Date(date.getTime() - userTimezoneOffset));
      emit('change');
    };
    onBeforeMount(() => {
      date.value = props.modelValue;
    });

    return {
      open,
      date,
      dateFormat,
      changeHandler,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
  width: 100%;
}

:deep(.el-input) {
  border: none;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  height: 34px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: $site_dark_gray;
  // padding-left: 20px;
  padding-right: 0;
  border: none;
  width: 100%;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

// :deep(.el-input__inner) {
//   padding-left: 10px;
// }

:deep(.el-input__prefix) {
  left: 0;
  top: -3px;
}

// :deep(.el-input--prefix .el-input__inner) {
//   padding-left: 23px;
// }

:deep(.el-input__suffix) {
  top: -3px;
  right: 0;
  display: none;
}

:deep(.el-input--suffix .el-input__inner) {
  padding-right: 0;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: #b0a4c0;
  width: auto;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

:deep(.disable) {
  display: none;
}
</style>
