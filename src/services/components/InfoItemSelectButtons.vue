<template>
  <InfoItem :close="closeFlag" :title="title" close-window-overflow="hidden" :with-hover="true" :with-open-window="true">
    <StringItem :string="selected" font-size="14px" width="100%" />
    <template #open-inside-content>
      <Button v-for="item in list" :key="item" button-class="save-button" :text="item" @click="select(item)" />
      <Button button-class="save-button" text="Сбросить" @click="select(undefined)" />
    </template>
  </InfoItem>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

import Button from '@/services/components/Button.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';

const props = defineProps({
  selected: {
    type: String as PropType<string>,
    required: true,
  },
  list: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
});

const closeFlag = ref(false);
const emit = defineEmits(['select', 'reset']);
const select = (item?: string) => {
  closeFlag.value = !closeFlag.value;
  emit('select', item);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}
</style>
