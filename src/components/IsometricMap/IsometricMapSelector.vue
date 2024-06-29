<template>
  <div class="select-window">
    <StringItem string="Выберите точку назначения:" margin="10px" font-size="18px" />
    <div v-for="(step, key) in selectedSpep" :key="step" @click="selectStep(step)">
      {{ key }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import StringItem from '@/services/components/StringItem.vue';

const emit = defineEmits(['openMapRouter', 'selectObject']);

const steps = {
  Пациенты: {
    Экстренно: { nodeName: '24' },
    Планово: { nodeName: '24' },
    КДЦ: { nodeName: '24' },
    'Посещения, передачи, беседы с врачом': { nodeName: '24' },
  },
  Студенты: {},
  'Доноры крови': {},
  'Сотрудники МО': {},
  Доставка: {},
  'В кассу': {},
};

const selectedSpep: Ref<unknown> = ref(steps);

const selectStep = (step: unknown) => {
  if (step.nodeName) {
    emit('selectNode', step.nodeName);
    return;
  }
  selectedSpep.value = step;
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
