<template>
  <div class="slot-container">
    <div v-for="slot in slots" :key="slot" class="slot" :class="{ 'with-background': selectedSlot === slot }" @click="chooseSlot(slot)">
      {{ slot }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
export default defineComponent({
  name: 'AppointmentsSlots',
  emits: ['chooseSlot'],
  setup(props, { emit }) {
    const mount = ref(false);
    // eslint-disable-next-line no-undef
    const slots: Ref<string[]> = ref([]);
    const selectedSlot: Ref<string> = ref('');
    const addMinutes = (time: string, minsToAdd: number): string => {
      function z(n: number) {
        return (n < 10 ? '0' : '') + n;
      }
      let bits = time.split(':');
      let mins = Number(bits[0]) * 60 + +bits[1] + +minsToAdd;
      return z(((mins % (24 * 60)) / 60) | 0) + ':' + z(mins % 60);
    };

    onBeforeMount(async (): Promise<void> => {
      fillSlots();
    });

    const chooseSlot = (slot: string) => {
      selectedSlot.value = slot;
      emit('chooseSlot', slot);
    };

    const fillSlots = () => {
      let slot = '9:00';
      for (let i = 0; i < 20; i++) {
        slots.value.push(slot);
        slot = addMinutes(slot, 20);
      }
    };

    return {
      selectedSlot,
      chooseSlot,
      slots,
      Operators,
      DataTypes,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
.slot-container {
  text-align: center;
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  justify-content: left;
}
.slot {
  margin: 4px 4px;
  font-size: 14px;
  border: 2px solid #31af5e;
  border-radius: 5px;
  height: 33px;
  width: 61px;
  text-align: center;
  line-height: 33px;
  color: #31af5e;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    background: #31af5e;
    color: white;
  }
}

.with-background {
  background: #31af5e;
  color: white;
}
</style>
