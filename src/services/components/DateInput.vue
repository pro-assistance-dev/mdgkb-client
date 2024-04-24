<template>
  <div
    class="style-container"
    :style="{
      width: width,
      position: 'relative',
    }"
  >
    <el-input v-model="date" :placeholder="placeholder" @change="changeHandler" @input="inputHandler" @keydown.enter.prevent="undefined" />
  </div>
</template>

<script lang="ts" setup>
import Message from '@/services/classes/Message';
import DatesFormatter from '@/services/DatesFormatter';

const props = defineProps({
  modelValue: {
    type: Date,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: 'Укажите дату',
  },
  width: { type: String as PropType<string>, required: false, default: 'auto' },
});

const emits = defineEmits(['update:modelValue', 'change', 'beforeChange']);

const modelValueString = DatesFormatter.Format(props.modelValue);
const date: Ref<string> = ref(modelValueString);

watch(
  () => props.modelValue,
  () => {
    date.value = DatesFormatter.Format(props.modelValue);
  }
);

const changeHandler = (value: string) => {
  if (!valid(value)) {
    return;
  }
  const dateObj = DatesFormatter.FromRuStr(value);
  emits('beforeChange', dateObj);
  emits('change', dateObj);
};

const valid = (value: string): boolean => {
  if (value.length != 10) {
    date.value = modelValueString;
    Message.Error('Неверный формат даты');
    return false;
  }

  if (Number(date.value.slice(0, 2)) > 31) {
    date.value = modelValueString;
    Message.Error('Неверный день месяца');
    return false;
  }

  if (Number(date.value.slice(3, 5)) > 12) {
    date.value = modelValueString;
    Message.Error('Неверный месяц');
    return false;
  }

  if (Number(date.value.slice(6, 10)) > 2100) {
    date.value = modelValueString;
    Message.Error('Неверный год');
    return false;
  }
  return true;
};

const inputHandler = (value: string) => {
  date.value = value.replace(/[^0-9.]/g, '');

  if ((date.value.length == 3 || date.value.length == 6) && date.value[date.value.length - 1] !== '.') {
    date.value = date.value.substring(0, date.value.length - 1) + '.' + date.value.substring(date.value.length - 1);
  }
  if (date.value.length > 10) {
    date.value = date.value.substring(0, date.value.length - 1);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

:deep(.el-input__wrapper) {
  box-shadow: none;
  height: 36px;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 0;
  top: -3px;
}

:deep(.el-input--prefix .el-input__inner) {
  padding-left: 0;
}

:deep(.el-input__suffix) {
  top: -3px;
  right: 0;
  display: none;
}

:deep(.el-input--suffix .el-input__inner) {
  padding: 0;
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

// :deep(.el-input__inner) {
//   height: 34px;
//   display: flex;
//   font-family: Comfortaa, Arial, Helvetica, sans-serif;
//   font-size: 14px;
//   color: $site_dark_gray;
//   padding-left: 0;
//   padding-right: 0;
//   border: none;
//   width: 100%;
// }
</style>
