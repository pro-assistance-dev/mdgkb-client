<template>
  <TopSliderContainer slider-on-height="500px" title-background="#006BB4" title-color="#ffffff" :toggle="showDestinationStepper">
    <template #title>
      <span>Навигатор</span>
      <svg class="navi-icon">
        <use xlink:href="#Group 805"></use>
      </svg>
    </template>
    <StringItem string="Выберите точку назначения:" margin="10px" font-size="18px" />
    <MapCheckbox v-for="(step, key) in selectedStep" :key="step" :label="key" @click="selectStep(step)" @load="$emit('load')" />
    <PButton v-if="!root" text="Назад" @click="back" margin="25px auto 0 auto" width="120px" />
  </TopSliderContainer>
</template>

<script lang="ts" setup>
import StringItem from '@/services/components/StringItem.vue';
import MapCheckbox from './MapCheckbox.vue';

const emit = defineEmits(['selectNode']);

const showDestinationStepper = ref(false);
const closeStepper = () => {
  showDestinationStepper.value = !showDestinationStepper.value;
};
const root = ref(true);
const steps = {
  Пациенты: {
    Экстренно: { nodeName: '29' },
    Планово: { nodeName: '29' },
    'КДЦ. Амбулаторный приём': { nodeName: '146' },
    КДЦ: { nodeName: '140' },
    'Посещения, передачи, беседы с врачом. Корпус 1': { nodeName: '40' },
    'Посещения, передачи, беседы с врачом. Корпус 1А': { nodeName: '30' },
  },
  Студенты: { nodeName: '104' },
  'Доноры крови': { nodeName: '94' },
  // 'Сотрудники МО': {},
  // Доставка: {},
  // 'В кассу': {},
};

const selectedStep: Ref<unknown> = ref(steps);

const back = (): void => {
  selectedStep.value = steps;
  root.value = true;
};

const selectStep = (step: unknown) => {
  if (!step) {
    showDestinationStepper.value = !showDestinationStepper.value;
    return;
  }
  root.value = false;
  if (step.nodeName) {
    emit('selectNode', step.nodeName);
    showDestinationStepper.value = !showDestinationStepper.value;
    return;
  }
  selectedStep.value = step;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.select-window {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  min-width: 280px;
  max-width: 900px;
  min-height: 300px;
  max-height: 768px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #838385;
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.item-box {
  width: calc(100% - 40px);
  border: 1px solid rgb(black, 0.2);
  border-radius: $border-radius;
  margin: 10px 20px;
}
</style>
