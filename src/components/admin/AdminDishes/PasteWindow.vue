<template>
  <ClickWindow :width="'120px'">
    <template #title> Вставить: </template>
    <template #info>
      <div class="attention">Вкладки с такими названиями уже есть в меню!</div>
      <Button :text="'Вставить'" :color="'#1979CF'" :margin-top="'5px'" :width="'80px'" @click="$emit('onClick')" />
      <Button :text="'Заменить'" :margin-top="'5px'" :width="'80px'" @click="$emit('onClick')" />
      <Button :text="'Отмена'" :color="'#838385'" :margin-top="'5px'" :width="'80px'" @click="$emit('onClick')" />
    </template>
  </ClickWindow>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ClickWindow from '@/components/admin/AdminDishes/ClickWindow.vue';
import Button from '@/components/Base/Button.vue';

export default defineComponent({
  name: 'PasteWindow',
  components: { Button, ClickWindow },
  emits: ['onClick'],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.attention {
  font-size: 10px;
  color: #f3911c;
  width: 100%;
}
</style>
