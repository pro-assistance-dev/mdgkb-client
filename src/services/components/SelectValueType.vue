<template>
  asdfsadf
  <Button v-for="(value, type) in types" :key="value" :text="value" @click="select(type)" />
</template>

<script setup lang="ts">
import ValueTypes from '@/services/types/ValueTypes';

const props = defineProps({
  selectedType: {
    type: Object as PropType<ValueTypes>,
    required: true,
  },
});
const types = {
  [ValueTypes.String]: 'Строка',
  [ValueTypes.Number]: 'Число',
};
const emits = defineEmits(['select']);

const select = (t: ValueTypes) => {
  console.log(t);
  emits('select', t);
};
</script>

<style lang="scss" scoped></style>
