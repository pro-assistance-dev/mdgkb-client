<template>
  <el-card v-if="timetable.timetableDays.length">
    <template #header>
      <div class="timetable-header-container">
        <span class="title">График работы</span>
        <div>
          <el-tag v-if="timetable.isWorkTime() || timetable?.isAroundTheClock()" size="small" type="success">Рабочее время</el-tag>
          <el-tag v-else size="small" type="danger">Не рабочее время</el-tag>
        </div>
      </div>
    </template>
    <el-table
      v-if="!timetable?.isAroundTheClock()"
      :data="timetable.timetableDays"
      :row-class-name="tableRowClassName"
      :show-header="false"
    >
      <el-table-column width="150">
        <template #default="scope">
          <span>{{ scope.row.weekday.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="170">
        <template #default="scope">
          <span>
            <b v-if="!scope.row.timetable?.isAroundTheClock()">{{ scope.row.getPeriodWithName() }}</b>
            <b v-else>Весь день</b>
          </span>
          <div v-if="scope.row.breakPeriods && !scope.row.isWeekend" class="break-list">
            <span v-for="breakPeriod in scope.row.breakPeriods" :key="breakPeriod.id">Перерыв: {{ breakPeriod.getPeriod() }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span v-else>Круглосуточно</span>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
export default defineComponent({
  name: 'Timetable',
  props: {
    timetable: {
      type: Object as PropType<ITimetable>,
      required: true,
    },
  },
  setup() {
    const tableRowClassName = ({ row }: { row: ITimetableDay; rowIndex: number }): string => {
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
:deep(.weekend) {
  color: red;
}
:deep(.today) {
  background-color: #e1f3d8;
}
.break-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.timetable-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    margin-right: 10px;
  }
}
</style>
