<template>
  <div class="filter-form">
    <el-form :gutter="12" label-position="top">
      <!-- <el-form-item> -->
      <el-select
        v-model="selectedDateFilter"
        value-key="id"
        filterable
        clearable
        placeholder="Выберите дату"
        round
        size="small"
        @change="addFilterModel"
      >
        <el-option v-for="date in dates" :key="date.label" :label="date.label" :value="date.id"></el-option>
      </el-select>
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'FilterSelectDate',
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const { table, col } = toRefs(props);
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.Date));
    filterModel.value.operator = Operators.Eq;
    const selectedDateFilter: Ref<string> = ref('');
    const getDateDiff = (dateDiff: number) => {
      let d = new Date();
      d.setDate(d.getDate() + dateDiff);
      // TODO: нужно глобальное решение по отправке дат
      const hoursMoscowDiff = 60 * 60 * 3000;
      d.setTime(d.getTime() + hoursMoscowDiff);
      return new Date(d.toDateString());
    };

    const dates = [
      { id: 1, label: 'Сегодня', dates: {}, date: getDateDiff(0) },
      { id: 2, label: 'Вчера', dates: {}, date: getDateDiff(-1) },
      { id: 3, label: 'На прошлой неделе', dates: { date1: getDateDiff(-7), date2: getDateDiff(-1) } },
      { id: 4, label: 'За прошлый месяц', dates: { date1: getDateDiff(-30), date2: getDateDiff(-1) } },
    ];

    const fillDates = (value: number) => {
      const date = dates.find((date) => date.id === value);
      if (!date) {
        filterModel.value.date1 = undefined;
        filterModel.value.date2 = undefined;
        return;
      }
      if (date.dates.date1 && date.dates.date2) {
        filterModel.value.date1 = date.dates.date1;
        filterModel.value.date2 = date.dates.date2;
        filterModel.value.operator = Operators.Btw;
      } else {
        filterModel.value.operator = Operators.Eq;
        filterModel.value.date1 = date.date;
        filterModel.value.date2 = undefined;
      }
    };

    const addFilterModel = async (value: number) => {
      fillDates(value);
      if (!filterModel.value.date1) {
        await Provider.spliceFilterModel(filterModel.value.id);
      } else {
        await Provider.spliceFilterModel(filterModel.value.id);
      }
      emit('load', value);
    };

    return {
      selectedDateFilter,
      dates,
      addFilterModel,
      filterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 38px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}
</style>
