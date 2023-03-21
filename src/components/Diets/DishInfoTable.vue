<template>
  <table class="table-list">
    <colgroup>
      <col width="60px" />
      <col width="60px" />
      <col width="60px" />
      <col width="100px" />
    </colgroup>
    <thead>
      <tr>
        <td style="font-size: 11px; color: #a1a7bd">Белки</td>
        <td style="font-size: 11px; color: #a1a7bd">Жиры</td>
        <td style="font-size: 11px; color: #a1a7bd">Углеводы</td>
        <td style="font-size: 11px; color: #a1a7bd">Энерг.&nbsp;ценность</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-size: 12px; color: #343e5c">4 г</td>
        <td style="font-size: 12px; color: #343e5c">2 г</td>
        <td style="font-size: 12px; color: #343e5c">52 г</td>
        <td style="font-size: 12px; color: #343e5c">{{ dailyMenuItem.caloric }} калл</td>
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
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
</style>
