<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <div>
          <span> Расписание </span>
          <el-button
            v-if="timetable && timetable.timetableDays.length > 0"
            size="small"
            type="danger"
            icon="el-icon-minus"
            circle
            @click="removeTimetable"
          ></el-button>
          <el-button v-else size="small" type="success" icon="el-icon-plus" circle @click="addTimetable" />
        </div>

        <el-button s size="small" type="success" icon="el-icon-plus" @click="createCustomTimetableDay"
          >Создать элемент расписания</el-button
        >
      </div>
    </template>
    <div v-if="timetable && timetable.timetableDays.length > 0">
      <el-row v-for="(day, i) in timetable.timetableDays" :key="day">
        <el-col :span="5">
          <div>
            <el-input v-if="day.isCustom" v-model="day.customName" class="timetable-row" />
            <div v-else class="timetable-row" :class="{ weekend: day.weekday.isWeekend() || day.isWeekend }">{{ day.weekday.name }}</div>
            <div v-if="day.breakExist && !day.isWeekend" class="timetable-row">Перерыв</div>
          </div>
        </el-col>
        <el-col :span="19">
          <div v-if="!day.isWeekend">
            <div class="timetable-row">
              <el-time-select
                :model-value="day.getTime(day.startTime)"
                class="time-select"
                start="00:00"
                step="00:15"
                end="23:30"
                @change="day.startTime = $event"
              />
              -
              <el-time-select
                :model-value="day.getTime(day.endTime)"
                class="time-select"
                start="08:30"
                step="00:15"
                end="18:30"
                @change="day.endTime = $event"
              />
              <el-checkbox v-model="day.breakExist" class="add-break-checkbox">Перерыв</el-checkbox>
              <el-checkbox v-model="day.isWeekend" class="add-break-checkbox">Выходной</el-checkbox>
              <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeTimetableDay(i)" />
            </div>
            <div v-if="day.breakExist">
              <el-time-select
                :model-value="day.getTime(day.breakStartTime)"
                class="time-select"
                start="08:30"
                step="00:15"
                end="18:30"
                @change="day.breakStartTime = $event"
              />
              -
              <el-time-select
                :model-value="day.getTime(day.breakEndTime)"
                class="time-select"
                start="08:30"
                step="00:15"
                end="18:30"
                @change="day.breakEndTime = $event"
              />
            </div>
          </div>
          <div v-else class="timetable-row">
            <div>
              <el-checkbox v-model="day.isWeekend" class="add-break-checkbox" label="Выходной" />
            </div>
          </div>
        </el-col>
        <el-divider v-if="i < timetable.timetableDays.length"></el-divider>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import Timetable from '@/classes/timetable/Timetable';
import TimetableDay from '@/classes/timetable/TimetableDay';
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

    const removeTimetable = () => {
      store.commit(`${props.store}/removeTimetable`);
    };

    const removeTimetableDay = (i: number) => {
      store.commit(`${props.store}/removeTimetableDay`, i);
    };

    const createCustomTimetableDay = () => {
      store.commit(`${props.store}/createCustomTimetableDay`, TimetableDay.CreateCustomTimetableDay());
    };

    return {
      createCustomTimetableDay,
      removeTimetableDay,
      removeTimetable,
      timetable,
      addTimetable,
      weekdays,
    };
  },
});
</script>

<style scoped>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timetable-row {
  line-height: 40px;
  height: 40px;
  margin-bottom: 5px;
}
.weekend {
  color: red;
}
:deep(.el-button) {
  padding: 5px;
  margin: 0 !important;
  min-height: unset;
  border: none;
}
.time-select {
  width: 100px;
  margin: 0;
}

.add-break-checkbox {
  margin-left: 10px;
}
</style>
