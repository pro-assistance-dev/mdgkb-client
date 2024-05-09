<template>
  <div class="date-range">
    <DateInput v-model:model-value="startDate" @change="setStart" />
    &nbsp-&nbsp
    <DateInput v-model:model-value="endDate" @change="setEnd" />
  </div>
</template>

<script setup lang="ts">
import DateInput from '@/services/components/DateInput.vue';

import Message from '../classes/Message';

const props = defineProps({
  start: {
    type: Date,
    default: undefined,
  },
  end: {
    type: Date,
    default: undefined,
  },
});

const emits = defineEmits(['update:start', 'update:end', 'setStart', 'setEnd']);
watch(
  () => [props.start, props.end],
  () => {
    console.log('watchDate');
    if (!props.start) {
      startDate.value = undefined;
    }
    if (!props.end) {
      endDate.value = undefined;
    }
  }
);
const startDate = ref(props.start);
const endDate = ref(props.end);

const setStart = (date: Date) => {
  startDate.value = date;
  if (date > props.end) {
    Message.Error('Дата начала больше даты окончания');
    return;
  }
  emits('update:start', date);
  emits('setStart', date);
};

const setEnd = (date: Date) => {
  endDate.value = date;
  if (date < props.start) {
    Message.Error('Дата начала больше даты окончания');
    return;
  }
  emits('update:end', date);
  emits('setEnd', date);
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';

.date-range {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  // margin: 0 auto;
}
</style>
