<template>
  <div class="date-range">
    <DateInput v-model:model-value="startDate" @change="setStart" />
    -
    <DateInput v-model:model-value="endDate" @change="setEnd" />
  </div>
</template>

<script setup lang="ts">
import DateInput from '@/services/components/DateInput.vue';

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
  if (!props.end || date > props.end) {
    PHelp.Notification.Error('Дата начала больше даты окончания');
    return;
  }
  emits('update:start', date);
  emits('setStart', date);
};

const setEnd = (date: Date) => {
  endDate.value = date;
  if (!props.start || date < props.start) {
    PHelp.Notification.Error('Дата начала больше даты окончания');
    return;
  }
  emits('update:end', date);
  emits('setEnd', date);
};
</script>

<style scoped lang="scss">
@import '@/services/assets/style/index.scss';

.date-range {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  // margin: 0 auto;
}
</style>
