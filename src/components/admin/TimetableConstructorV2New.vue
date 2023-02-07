<template>
  <div v-if="!pattern" class="line">
    <el-select v-model="chosenPattern" class="line-item" value-key="id" size="mini" placeholder="Выберите шаблон">
      <el-option v-for="item in timetablePatterns" :key="item.id" :label="item.title" :value="item"> </el-option>
    </el-select>
    <div class="button-block">
      <button class="admin-add" @click.prevent="addTimetable">Применить</button>
      <button v-if="timetable.timetableDays.length" class="admin-del" @click.prevent="removeTimetable">Очистить</button>
    </div>
  </div>
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
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Timetable from '@/classes/timetable/Timetable';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ITimetableDay from '@/interfaces/timetables/ITimetableDay';
export default defineComponent({
  name: 'TimetableConstructorV2New',
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
    const timetable: Ref<ITimetable> = computed<ITimetable>(
      () => store.getters[`${props.storeModule}/${props.pattern ? 'item' : 'timetable'}`]
    );
    const timetablePatterns: Ref<ITimetable[]> = computed<ITimetable[]>(() => store.getters[`timetablePatterns/items`]);
    const chosenPattern: Ref<ITimetable> = ref(timetablePatterns.value[0]);

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

    const addBreak = (day: ITimetableDay): void => {
      day.addBreak();
    };

    const removeBreak = (day: ITimetableDay, index: number): void => {
      day.removeBreak(index);
    };

    const tableRowClassName = ({ row }: { row: ITimetableDay; rowIndex: number }): string => {
      if (row.breaksExists) {
        return 'timetable-row expand';
      }

      if (row.isWeekend) {
        return 'timetable-row weekend';
      }
      return 'timetable-row';
    };

    const handleExpandChange = (row: ITimetableDay) => {
      const key = row.weekday.name;
      const lastKey = expandRowKeys.value[0];
      expandRowKeys.value = key === lastKey ? [] : [key];
    };

    const handleBreakChange = (value: boolean, row: ITimetableDay) => {
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

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.flex-row-between {
  display: flex;
  justify-content: space-between;
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

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form--label-top .el-form-item) {
  display: flex;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 4px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

:deep(.el-checkbox__input) {
  margin-left: 24px;
}

.line {
  display: flex;
  align-items: center;
  justify-content: left;
  height: auto;
  margin: 15px 0 25px 0;
}

.line-item {
  width: 250px;
}

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

.admin-del {
  border: none;
  background: inherit;
  color: #a3a9be;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.button-block {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 170px;
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }

  .line {
    display: block;
    height: auto;
  }

  .line-item {
    width: 100%;
  }

  .button-block {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 170px;
    margin-top: 20px;
  }
}
</style>
