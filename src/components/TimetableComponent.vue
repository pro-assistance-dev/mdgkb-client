<template>
  <div class="block-line">
    <div class="item">
      <svg class="icon-time">
        <use xlink:href="#time"></use>
      </svg>
    </div>
    <div>
      <div class="time-block">
        <div class="item-t">
          Время&nbsp;работы&nbsp;
          <div class="block-today">
            <p class="today">сегодня:&nbsp;</p>
            <div class="hidden-block">
              <div class="hidden-line">
                <div class="hidden-item" data-test="timetable">
                  <span class="today-bold">сегодня</span>: {{ timetable.getTodayWorkday().getTimetable() }}
                </div>
                <div v-if="timetable.getTodayWorkday().breaksExists" class="hidden-item-2" data-test="breaks-exists">
                  Перерыв:
                  <ul v-if="timetable.getTodayWorkday().breaksExists" class="hidden-item-list">
                    <li v-for="item in timetable.getTodayWorkday().breakPeriods" :key="item.id">
                      {{ item.getPeriod() }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="hidden-line-2">
                <ul class="hidden-item-list-2" data-test="workday-period">
                  <li v-for="item in timetable.timetableDays" :key="item.id">
                    {{ item.getPeriodWithName() }}
                    <div v-if="item.breaksExists" class="hidden-item-2" data-test="breaks-exists-2">
                      Перерыв:
                      <ul v-if="item.breaksExists" class="hidden-item-list">
                        <li v-for="period in item.breakPeriods" :key="period.id">{{ period.getPeriod() }}</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="item-t">{{ timetable.getTodayWorkday().getTimetable() }}</div>
        <div v-if="timetable.getTodayWorkday().breaksExists" class="item-t" data-test="breaks-exists-3">
          , перерыв:
          <ul v-if="timetable.getTodayWorkday().breaksExists" class="item-list">
            <li v-for="item in timetable.getTodayWorkday().breakPeriods" :key="item.id">
              {{ item.getPeriod() }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Time from '@/assets/svg/DivisionCard/Time.svg';
import Timetable from '@/classes/Timetable';
import TimetableDay from '@/classes/TimetableDay';

export default defineComponent({
  name: 'TimetableComponent',
  components: {
    Time,
  },
  props: {
    timetable: {
      type: Object as PropType<Timetable>,
      required: true,
    },
  },
  setup() {
    const tableRowClassName = ({ row }: { row: TimetableDay; rowIndex: number }): string => {
      if (row.isWeekend) {
        return 'weekend';
      }
      if (row.weekday.isToday()) {
        return 'today';
      }
      return '';
    };

    return {
      tableRowClassName,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/timetable.scss';
</style>
