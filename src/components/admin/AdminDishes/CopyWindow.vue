<template>
  <ClickWindow :width="'120px'">
    <template #title> Копировать: </template>
    <template #info>
      <div class="line">
        <input id="scales" type="checkbox" name="Все" checked />
        <label for="scales">Все</label>
      </div>
      <div class="line">
        <input id="scales" type="checkbox" name="ЗАВТРАК" checked />
        <label for="scales">ЗАВТРАК</label>
      </div>
      <div class="line">
        <input id="scales" type="checkbox" name="ОБЕД" checked />
        <label for="scales">ОБЕД</label>
      </div>
      <Button :text="Ok" :margin-top="'5px'" @click="$emit('onClick')" />
    </template>
  </ClickWindow>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ClickWindow from '@/components/admin/AdminDishes/ClickWindow.vue';
import Button from '@/components/Base/Button.vue';

export default defineComponent({
  name: 'CopyWindow',
  components: { Button, ClickWindow },
  emits: ['onClick'],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.info {
  display: block;
  width: 100%;
  margin-top: 5px;
}

.line {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

p,
label {
  font: 1rem 'Fira Sans', sans-serif;
}

input {
  margin: 0.4rem;
}
</style>
