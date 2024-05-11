<template>
  <table class="table-list">
    <colgroup>
      <col width="60px" />
      <col width="60px" />
      <col width="60px" />
      <col v-if="!forCard" width="100px" />
    </colgroup>
    <thead>
      <tr>
        <td v-for="(_, energyName) in dailyMenuItem.getEnergies()" :key="energyName" :style="headStyle">{{ energyName }}</td>
        <td v-if="!forCard" :style="headStyle">Энерг.&nbsp;ценность</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="(energyValue, energyName) in dailyMenuItem.getEnergies()" :key="energyName" :style="bodyStyle">{{ energyValue }}</td>
        <td v-if="!forCard" :style="bodyStyle">{{ dailyMenuItem.caloric }} калл</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import DailyMenuItem from '@/classes/DailyMenuItem';

export default defineComponent({
  name: 'DishInfoTable',
  props: {
    dailyMenuItem: {
      type: Object as PropType<DailyMenuItem>,
      required: true,
    },
    forCard: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
  },
  setup(props) {
    const headStyle = { fontSize: '11px', color: props.forCard ? '#ffffff' : '#a1a7bd' };
    const bodyStyle = { fontSize: props.forCard ? '11px' : '12px', color: props.forCard ? '#ffffff' : '#343e5c' };
    return { DailyMenuItem, headStyle, bodyStyle };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';
</style>
