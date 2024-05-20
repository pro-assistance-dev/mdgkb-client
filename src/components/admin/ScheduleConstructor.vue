<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <div class="flex-line">
          <span> Распорядок дня </span>
          <PButton v-if="schedule && schedule.scheduleItems.length > 0" skin="text" type="del" text="Удалить" margin="2px 0 0 0" @click="removeSchedule" />
          <PButton v-else skin="text" type="success" text="+ Добавить" margin="2px 0 0 0" @click="addSchedule" />
        </div>
        <PButton skin="text" type="success" text="+ Добавить элемент" margin="0" @click="addScheduleItem" />
      </div>
    </template>
    <div v-if="schedule.scheduleItems.length > 0">
      <el-row v-for="(item, i) in schedule.scheduleItems" :key="item">
        <el-col :span="10">
          <div class="timetable-row">
            <el-time-select
              :model-value="item.getTime(item.startTime)"
              class="time-select"
              start="00:00"
              step="00:15"
              end="23:30"
              @change="item.startTime = $event"
            />
            -
            <el-time-select
              :model-value="item.getTime(item.endTime)"
              class="time-select"
              start="08:30"
              step="00:15"
              end="18:30"
              @change="item.endTime = $event"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-input v-model="item.name" class="timetable-row" />
          </div>
        </el-col>
        <el-col :span="1" :offset="1">
          <div class="timetable-row">
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeScheduleItem(i)" />
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Schedule from '@/classes/Schedule';
import ScheduleItem from '@/classes/ScheduleItems';
export default defineComponent({
  name: 'ScheduleConstructor',
  props: {
    storeModule: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store = useStore();
    const schedule = computed(() => store.getters[`${props.storeModule}/schedule`]);

    const addSchedule = () => {
      store.commit(`${props.storeModule}/setSchedule`, Schedule.CreateStandartSchedule());
    };

    const removeSchedule = () => {
      store.commit(`${props.storeModule}/removeSchedule`);
    };

    const removeScheduleItem = (i: number) => {
      store.commit(`${props.storeModule}/removeScheduleItem`, i);
    };

    const addScheduleItem = () => {
      store.commit(`${props.storeModule}/addScheduleItem`, ScheduleItem.CreateStandartScheduleItem(0));
    };

    return {
      schedule,
      addSchedule,
      addScheduleItem,
      removeSchedule,
      removeScheduleItem,
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

.flex-line {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
