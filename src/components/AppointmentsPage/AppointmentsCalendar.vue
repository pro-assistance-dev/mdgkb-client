<template>
  <div class="calendar-container">
    <DatePicker
      ref="calendar"
      v-model="selectedDay"
      :min-date="new Date()"
      :attributes="attr"
      class="custom-calendar"
      locale="ru"
      @dayclick="chooseDay"
    >
    </DatePicker>
  </div>
</template>

<script lang="ts">
import { DatePicker } from 'v-calendar';
import { defineComponent, ref } from 'vue';

import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
export default defineComponent({
  name: 'AppointmentsCalendar',
  components: {
    DatePicker,
  },
  emits: ['chooseDay'],
  setup(props, { emit }) {
    const mount = ref(false);
    const selectedDay = ref(new Date());
    const attr = [
      {
        key: 'today',
        dates: selectedDay.value,
        highlight: true,
      },
    ];

    const chooseDay = (day: Date) => {
      selectedDay.value = day;
      emit('chooseDay', day);
    };

    return {
      selectedDay,
      chooseDay,
      attr,
      Operators,
      DataTypes,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/calendar-style.scss';
//
.calendar-container {
  width: 100%;
}
:deep(.custom-calendar.vc-container) {
  --day-border: 2px solid #31af5e;
  //--day-border-highlight: 1px solid #b8c2cc;
  //--weekday-bg: #f8fafc;
  width: 100%;
  border: none;

  & .vc-header {
    padding: 10px 0;
    //border-bottom: 1px solid #f0f2f7;
  }
  & .vc-title {
    font-weight: 400;
    text-transform: capitalize;
  }
  & .vc-weekday {
    //width: 45px + 8px;
    //border-bottom: 1px solid #f0f2f7;
    padding: 6px 0 8px;
    //margin: 4px 4px;
  }
  & .is-today {
    .vc-day-content {
      background: #2753eb;
      margin: 4px 4px;
      font-size: 14px;
      border: var(--day-border);
      border-radius: 5px;
      height: 33px;
      width: 45px;
      //color: white;
    }
  }
  & .vc-day {
    &-content {
      margin: 4px 4px;
      font-size: 14px;
      border: var(--day-border);
      border-radius: 5px;
      height: 33px;
      width: 45px;
      color: #31af5e;
      font-weight: 400;
    }

    .is-disabled {
      border: none;
      color: #a1a7bd;
      &:hover {
        cursor: auto;
        //background: white;
        //color: #a1a7bd;
      }
      //&:focus {
      //  cursor: auto;
      //  background: white;
      //  color: #a1a7bd;
      //}
    }

    &-content:hover:not(.is-disabled) {
      cursor: pointer;
      background: #31af5e;
      color: white;
    }
  }
}
</style>
