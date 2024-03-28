<template>
  <div class="switch-container">
    <div class="line">
      <StringItem :string="firstModel.label" font-size="12px" padding="0" :style="getStyle(firstModel)" @click="selectModel(firstModel)" />
      <StringItem string="Все" font-size="12px" padding="0" :style="getStyle()" @click="selectModel()" />
      <StringItem
        :string="secondModel.label"
        font-size="12px"
        padding="0"
        :style="getStyle(secondModel)"
        @click="selectModel(secondModel)"
      />
    </div>
    <div class="line">
      <div
        class="switch-knob1"
        :style="getKnobStyle1()"
        :class="{ active: firstModel.valueEq(filterModel) }"
        @click="selectModel(firstModel)"
      />
      <div class="switch-knob2" :style="getKnobStyle2()" :class="{ active: !filterModel }" @click="selectModel()" />
      <div
        class="switch-knob3"
        :style="getKnobStyle3()"
        :class="{ active: secondModel.valueEq(filterModel) }"
        @click="selectModel(secondModel)"
      />

      <div class="switch-axis"></div>
      <div class="switch-axis-dash1"></div>
      <div class="switch-axis-dash2"></div>
      <div class="switch-axis-dash3"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  firstModel: {
    type: Object as PropType<FilterModel>,
    required: true,
  },
  secondModel: {
    type: Object as PropType<FilterModel>,
    required: true,
  },
  defaultLabel: {
    type: String as PropType<string>,
    default: 'Все',
  },
});
const emptyStyle = {
  background: 'inherit',
  border: '1px solid #c4c4c4',
};
const getKnobStyle1 = () => (props.firstModel.valueEq(filterModel.value) ? undefined : emptyStyle);
const getKnobStyle2 = () => (filterModel.value ? emptyStyle : undefined);
const getKnobStyle3 = () => (props.secondModel.valueEq(filterModel.value) ? undefined : emptyStyle);

const getStyle = (model?: FilterModel) => {
  const color = filterModel.value?.valueEq(model) ? '#006bb4' : '#B0A4C0';
  return { color: color };
};
const emits = defineEmits(['load']);
const filterModel: Ref<FilterModel | undefined> = ref(undefined);

const selectModel = async (model?: FilterModel): void => {
  if (filterModel.value?.valueEq(model)) {
    return;
  }
  Provider.ftsp.value.replaceF(model, filterModel.value);
  filterModel.value = model;
  await Provider.router.replace({ query: {} });
  emits('load');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.active {
  background: inherit;
  border: 1px solid #c4c4c4;
}

.switch-container {
  width: calc(100% - 2px);
  height: 74px;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  background: $base-background;
}

.line {
  position: relative;
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.line:last-child {
  margin-top: 5px;
}

.switch-axis {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: 1px;
  background: #b0a4c0;
}

.switch-axis-dash1 {
  position: absolute;
  top: 6px;
  left: 14px;
  width: 1px;
  height: 9px;
  background: #b0a4c0;
}

.switch-axis-dash2 {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 0.5px;
  height: 9px;
  background: #b0a4c0;
}

.switch-axis-dash3 {
  position: absolute;
  top: 6px;
  right: 14px;
  width: 1px;
  height: 9px;
  background: #b0a4c0;
}

.switch-knob1 {
  position: absolute;
  left: 6px;
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}

.switch-knob2 {
  position: absolute;
  left: calc(50% - 9px);
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}

.switch-knob3 {
  position: absolute;
  right: 6px;
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}
</style>
