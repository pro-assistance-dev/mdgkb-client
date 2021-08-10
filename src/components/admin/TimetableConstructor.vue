<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <span> Расписание </span>
        <el-button size="small" type="success" icon="el-icon-plus" circle @click="addTimetable"></el-button>
      </div>
    </template>
    <div v-if="timetable && timetable.timetableDays.length > 0">
      <el-row v-for="day in timetable.timetableDays" :key="day">
        <el-col :span="6">
          <div v-html="day.weekday.name" />
        </el-col>
        <el-col :span="18">
          <div>
            <el-time-select
              :model-value="typeof day.startTime === 'string' ? day.startTime : day.getTime(day.startTime)"
              class="time-select"
              start="08:30"
              step="00:15"
              end="18:30"
              @change="day.startTime = $event"
            />
            -
            <el-time-select
              :model-value="typeof day.endTime === 'string' ? day.endTime : day.getTime(day.endTime)"
              class="time-select"
              start="08:30"
              step="00:15"
              end="18:30"
              @change="day.endTime = $event"
            />
            <el-checkbox v-model="day.breakExist" class="add-break-checkbox" label="Есть перерыв" />
          </div>
          <div v-if="day.breakExist">
            <el-time-select v-model="day.breakStartTime" class="time-select" start="08:30" step="00:15" end="18:30" /> -
            <el-time-select v-model="day.breakEndTime" class="time-select" start="08:30" step="00:15" end="18:30" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import Timetable from '@/classes/timetable/Timetable';
export default defineComponent({
  name: 'TimetableConstructor',
  props: {
    store: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store = useStore();
    const weekdays = computed(() => store.getters['timetables/weekdays']);
    const timetable = computed(() => store.getters[`${props.store}/timetable`]);

    const load = async (): Promise<void> => {
      await store.dispatch('timetables/getAllWeekdays');
    };

    onBeforeMount(load);

    const addTimetable = () => {
      store.commit(`${props.store}/setTimetable`, Timetable.CreateStandartTimetable(weekdays.value));
    };

    return {
      timetable,
      addTimetable,
      weekdays,
    };
  },
});
</script>

<style scoped>
:deep(.el-button) {
  padding: 5px;
  margin: 0 !important;
  min-height: unset;
  border: none;
}
.time-select {
  width: 100px;
}

.add-break-checkbox {
  margin-left: 10px;
}
</style>
