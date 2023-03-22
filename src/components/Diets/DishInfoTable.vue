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
        <td v-if="!forCard" style="font-size: 11px; color: #a1a7bd">Белки</td>
        <td v-if="!forCard" style="font-size: 11px; color: #a1a7bd">Жиры</td>
        <td v-if="!forCard" style="font-size: 11px; color: #a1a7bd">Углеводы</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff">Белки</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff">Жиры</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff">Углеводы</td>
        <td v-if="!forCard" style="font-size: 11px; color: #a1a7bd">Энерг.&nbsp;ценность</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-if="!forCard" style="font-size: 12px; color: #343e5c">4 г</td>
        <td v-if="!forCard" style="font-size: 12px; color: #343e5c">2 г</td>
        <td v-if="!forCard" style="font-size: 12px; color: #343e5c">52 г</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff; text-align: center">4 гр</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff; text-align: center">2 гр</td>
        <td v-if="forCard" style="font-size: 11px; color: #ffffff; text-align: center">52 гр</td>
        <td v-if="!forCard" style="font-size: 12px; color: #343e5c">{{ dailyMenuItem.caloric }} калл</td>
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
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
</style>
