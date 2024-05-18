<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <span>Расписание</span>
        <div v-if="!pattern" class="flex-item">
          <el-select v-model="chosenPattern" value-key="id" size="mini" placeholder="Выберите шаблон">
            <el-option v-for="item in timetablePatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
          </el-select>
          <PButton type="admin" color="success" text="Применить" margin="0 0 0 10px" height="28px" width="120px" @click="addTimetable" />
          <el-button v-if="timetable.timetableDays.length" style="margin-left: 10px" type="danger" size="mini" @click="removeTimetable"
            >Очистить</el-button
          >
        </div>
      </div>
    </template>

    <el-table
      v-if="timetable.timetableDays"
      :data="timetable.timetableDays"
      :row-class-name="tableRowClassName"
      :expand-row-keys="expandRowKeys"
      :row-key="(row) => row.weekday.name"
      @expand-change="handleExpandChange"
    >
      <el-table-column header-align="center" type="expand">
        <template #default="scope">
          <div style="margin-left: 50px">
            <el-table :data="scope.row.breakPeriods">
              <el-table-column label="С" align="center" width="150">
                <template #default="scope2">
                  <el-time-select
                    :model-value="scope2.row.getTime(scope2.row.startTime)"
                    class="time-select"
                    step="00:15"
                    :start="scope.row.startTime"
                    :end="scope2.row.endTime"
                    @change="scope2.row.startTime = $event"
                  />
                </template>
              </el-table-column>
              <el-table-column label="До" align="center" width="150">
                <template #default="scope2">
                  <el-time-select
                    :model-value="scope2.row.getTime(scope2.row.endTime)"
                    class="time-select"
                    :start="scope2.row.startTime"
                    :end="scope.row.endTime"
                    step="00:15"
                    @change="scope2.row.endTime = $event"
                  />
                </template>
              </el-table-column>
              <el-table-column width="70">
                <template #header>
                  <el-button type="success" size="mini" icon="el-icon-plus" @click="addBreak(scope.row)"></el-button>
                </template>
                <template #default="scope2">
                  <TableButtonGroup :show-remove-button="true" @remove="removeBreak(scope.row, scope2.$index)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="День недели" width="120">
        <template #default="scope">
          <span>{{ scope.row.weekday.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Выходной" align="center" width="200">
        <template #default="scope">
          <el-switch v-if="!scope.row.aroundTheClock" v-model="scope.row.isWeekend" inline-prompt active-text="Да" inactive-text="Нет" />
        </template>
      </el-table-column>
      <el-table-column label="С" align="center" width="150">
        <template #default="scope">
          <el-time-select
            v-if="!scope.row.isWeekend && !scope.row.aroundTheClock"
            :model-value="scope.row.getTime(scope.row.startTime)"
            class="time-select"
            step="00:15"
            :start="scope.row.startTimeLimit"
            :end="scope.row.endTimeLimit"
            @change="scope.row.startTime = $event"
          />
        </template>
      </el-table-column>
      <el-table-column label="До" align="center" width="150">
        <template #default="scope">
          <el-time-select
            v-if="!scope.row.isWeekend && !scope.row.aroundTheClock"
            :model-value="scope.row.getTime(scope.row.endTime)"
            class="time-select"
            :start="scope.row.startTimeLimit"
            :end="scope.row.endTimeLimit"
            step="00:15"
            @change="scope.row.endTime = $event"
          />
        </template>
      </el-table-column>
      <el-table-column label="Перерыв" align="center" width="200">
        <template #default="scope">
          <el-switch
            v-if="scope.row.showBreakSwitcher()"
            v-model="scope.row.breaksExists"
            inline-prompt
            active-text="Да"
            inactive-text="Нет"
            @change="(value) => handleBreakChange(value, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Весь день" align="center" width="200">
        <template #default="scope">
          <el-switch v-if="!scope.row.isWeekend" v-model="scope.row.aroundTheClock" inline-prompt active-text="Да" inactive-text="Нет" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Timetable from '@/classes/Timetable';
import TimetableDay from '@/classes/TimetableDay';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
export default defineComponent({
  name: 'TimetableConstructorV2',
  components: { TableButtonGroup },
  props: {
    storeModule: {
      type: String,
      default: '',
    },
    pattern: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const store = useStore();
    const weekdays = computed(() => store.getters['timetables/weekdays']);
    const expandRowKeys: Ref<string[]> = ref(['']);
    const timetable: Ref<Timetable> = computed<Timetable>(
      () => store.getters[`${props.storeModule}/${props.pattern ? 'item' : 'timetable'}`]
    );
    const timetablePatterns: Ref<Timetable[]> = computed<Timetable[]>(() => store.getters[`timetablePatterns/items`]);
    const chosenPattern: Ref<Timetable> = ref(timetablePatterns.value[0]);

    const addTimetable = () => {
      if (!chosenPattern.value) {
        ElMessage({ message: 'Пожалуйста, выберите шаблон', type: 'error' });
        return;
      }
      store.commit(`${props.storeModule}/setTimetable`, Timetable.ApplyTimetablePattern(chosenPattern.value));
    };

    const removeTimetable = () => {
      store.commit(`${props.storeModule}/removeTimetable`);
    };

    const addBreak = (day: TimetableDay): void => {
      day.addBreak();
    };

    const removeBreak = (day: TimetableDay, index: number): void => {
      day.removeBreak(index);
    };

    const tableRowClassName = ({ row }: { row: TimetableDay; rowIndex: number }): string => {
      if (row.breaksExists) {
        return 'timetable-row expand';
      }

      if (row.isWeekend) {
        return 'timetable-row weekend';
      }
      return 'timetable-row';
    };

    const handleExpandChange = (row: TimetableDay) => {
      const key = row.weekday.name;
      const lastKey = expandRowKeys.value[0];
      expandRowKeys.value = key === lastKey ? [] : [key];
    };

    const handleBreakChange = (value: boolean, row: TimetableDay) => {
      if (value) {
        handleExpandChange(row);
        row.addBreak();
      } else {
        row.breakPeriods = [];
        expandRowKeys.value = [''];
      }
    };

    onBeforeMount(async () => {
      if (!props.pattern) {
        await store.dispatch('timetablePatterns/getAll');
      } else {
        await store.dispatch('timetables/getAllWeekdays');
      }
    });

    return {
      timetablePatterns,
      removeTimetable,
      timetable,
      addTimetable,
      weekdays,
      chosenPattern,
      tableRowClassName,
      expandRowKeys,
      handleExpandChange,
      addBreak,
      removeBreak,
      handleBreakChange,
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

.flex-item {
  display: flex;
  justify-content: right;
  align-items: center;
}

:deep(.timetable-row) {
  height: 100px;
}
:deep(.weekend) {
  color: red;
}
:deep(.el-table__expand-column .cell) {
  display: none;
}
:deep(.expand .el-table__expand-column .cell) {
  display: unset;
}
</style>
