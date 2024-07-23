<template>
  <div></div>
  <!-- <div v-if="!pattern" class="line"> -->
  <!--   <el-select v-model="chosenPattern" class="line-item" value-key="id" placeholder="Выберите шаблон"> -->
  <!--     <el-option v-for="item in timetablePatterns" :key="item.id" :label="item.title" :value="item"> </el-option> -->
  <!--   </el-select> -->
  <!--   <div class="button-block"> -->
  <!--     <button class="admin-add" @click.prevent="addTimetable">Применить</button> -->
  <!--     <button v-if="timetable.timetableDays.length" class="admin-del" @click.prevent="removeTimetable">Очистить</button> -->
  <!--   </div> -->
  <!-- </div> -->
  <!-- <el-table -->
  <!--   v-if="timetable.timetableDays" -->
  <!--   :data="timetable.timetableDays" -->
  <!--   :row-class-name="tableRowClassName" -->
  <!--   :expand-row-keys="expandRowKeys" -->
  <!--   :row-key="(row) => row.weekday.name" -->
  <!--   @expand-change="handleExpandChange" -->
  <!-- > -->
  <!--   <el-table-column header-align="center" type="expand"> -->
  <!--     <template #default="scope"> -->
  <!--       <div style="margin-left: 50px" class="background-150-container"> -->
  <!--         <el-table :data="scope.row.breakPeriods"> -->
  <!--           <el-table-column label="С" align="center" width="150"> -->
  <!--             <template #default="scope2"> -->
  <!--               <el-time-select -->
  <!--                 :model-value="scope2.row.getTime(scope2.row.startTime)" -->
  <!--                 class="time-select" -->
  <!--                 step="00:15" -->
  <!--                 :start="scope.row.startTime" -->
  <!--                 :end="scope2.row.endTime" -->
  <!--                 @change="scope2.row.startTime = $event" -->
  <!--               /> -->
  <!--             </template> -->
  <!--           </el-table-column> -->
  <!--           <el-table-column label="До" align="center" width="150"> -->
  <!--             <template #default="scope2"> -->
  <!--               <el-time-select -->
  <!--                 :model-value="scope2.row.getTime(scope2.row.endTime)" -->
  <!--                 class="time-select" -->
  <!--                 :start="scope2.row.startTime" -->
  <!--                 :end="scope.row.endTime" -->
  <!--                 step="00:15" -->
  <!--                 @change="scope2.row.endTime = $event" -->
  <!--               /> -->
  <!--             </template> -->
  <!--           </el-table-column> -->
  <!--           <el-table-column width="70"> -->
  <!--             <template #header> -->
  <!--               <el-button size="mini" icon="el-icon-plus" @click="addBreak(scope.row)"></el-button> -->
  <!--             </template> -->
  <!--             <template #default="scope2"> -->
  <!--               <TableButtonGroup :show-remove-button="true" @remove="removeBreak(scope.row, scope2.$index)" /> -->
  <!--             </template> -->
  <!--           </el-table-column> -->
  <!--         </el-table> -->
  <!--       </div> -->
  <!--     </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="День недели" width="120"> -->
  <!--   <template #default="scope"> -->
  <!--     <span>{{ scope.row.weekday.name }}</span> -->
  <!--   </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="Выходной" align="center" width="200"> -->
  <!--   <template #default="scope"> -->
  <!--     <el-switch v-if="!scope.row.aroundTheClock" v-model="scope.row.isWeekend" inline-prompt active-text="Да" inactive-text="Нет" /> -->
  <!--   </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="С" align="center" width="150"> -->
  <!--   <template #default="scope"> -->
  <!--     <el-time-select -->
  <!--       v-if="!scope.row.isWeekend && !scope.row.aroundTheClock" -->
  <!--       :model-value="scope.row.getTime(scope.row.startTime)" -->
  <!--       class="time-select" -->
  <!--       step="00:15" -->
  <!--       :start="scope.row.startTimeLimit" -->
  <!--       :end="scope.row.endTimeLimit" -->
  <!--       @change="scope.row.startTime = $event" -->
  <!--     /> -->
  <!--   </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="До" align="center" width="150"> -->
  <!--   <template #default="scope"> -->
  <!--     <el-time-select -->
  <!--       v-if="!scope.row.isWeekend && !scope.row.aroundTheClock" -->
  <!--       :model-value="scope.row.getTime(scope.row.endTime)" -->
  <!--       class="time-select" -->
  <!--       :start="scope.row.startTimeLimit" -->
  <!--       :end="scope.row.endTimeLimit" -->
  <!--       step="00:15" -->
  <!--       @change="scope.row.endTime = $event" -->
  <!--     /> -->
  <!--   </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="Перерыв" align="center" width="200"> -->
  <!--   <template #default="scope"> -->
  <!--     <el-switch -->
  <!--       v-if="scope.row.showBreakSwitcher()" -->
  <!--       v-model="scope.row.breaksExists" -->
  <!--       inline-prompt -->
  <!--       active-text="Да" -->
  <!--       inactive-text="Нет" -->
  <!--       @change="(value) => handleBreakChange(value, scope.row)" -->
  <!--     /> -->
  <!--   </template> -->
  <!-- </el-table-column> -->
  <!-- <el-table-column label="Весь день" align="center" width="200"> -->
  <!--   <template #default="scope"> -->
  <!--     <el-switch v-if="!scope.row.isWeekend" v-model="scope.row.aroundTheClock" inline-prompt active-text="Да" inactive-text="Нет" /> -->
  <!--     </template> -->
  <!--   </el-table-column> -->
  <!-- </el-table> -->
</template>

<script lang="ts">
import TimetableDay from '@/classes/TimetableDay';
export default defineComponent({
  name: 'TimetableConstructorV2New',
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
    const weekdays = TimetablesStore.Weekdays();
    const expandRowKeys: Ref<string[]> = ref(['']);
    // const timetable: Ref<Timetable> = (
    //   () => Store.Getters( `${props.storeModule}/${props.pattern ? 'item' : 'timetable'}` )
    // );
    // const timetablePatterns: Ref<Timetable[]> = computed<Timetable[]>(() => store.getters[`timetablePatterns/items`]);
    // const chosenPattern: Ref<Timetable> = ref(timetablePatterns.value[0]);

    const addTimetable = () => {
      // if (!chosenPattern.value) {
      //   ElMessage({ message: 'Пожалуйста, выберите шаблон', type: 'error' });
      //   return;
      // }
      // store.commit(`${props.storeModule}/setTimetable`, Timetable.ApplyTimetablePattern(chosenPattern.value));
    };

    const removeTimetable = () => {
      // store.commit(`${props.storeModule}/removeTimetable`);
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
        TimetablesPatternsStore.GetAll();
      } else {
        // await TimetablesStore.GetAllWeekdays();
      }
    });

    return {
      removeTimetable,
      addTimetable,
      weekdays,
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
@import '@/assets/styles/base-style.scss';

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 1px;
}

:deep(.el-select .el-input .el-select__caret.el-icon-circle-close) {
  height: 40px;
}

:deep(.el-select .el-input__suffix) {
  top: -3px;
}

:deep(.el-select__caret .el-input__icon .el-icon-circle-close::before) {
  margin-top: -3px;
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
  color: $base-light-font-color;
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

.background-150-container {
  width: 394px;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
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
