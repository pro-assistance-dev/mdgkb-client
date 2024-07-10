<template>
  <PSelect :clearable="dateObj" placeholder="Выберите период" @change="prepareFilter" v-model="dateObj">
    <option v-for="date in dates" :key="date.label" :value="date" :label="date.label" />
  </PSelect>
</template>

<script lang="ts" setup>
import FilterModel from '@/services/classes/filters/FilterModel';

const props = defineProps({
  model: {
    type: FilterModel,
    default: '',
  },
});
const ftsp = FTSP.Get();

const emits = defineEmits(['load']);
const dateObj: Ref<any> = ref(undefined);

const getDateDiff = (dateDiff: number) => {
  const d = new Date();
  d.setDate(d.getDate() + dateDiff);
  const hoursMoscowDiff = 60 * 60 * 3000;
  d.setTime(d.getTime() + hoursMoscowDiff);
  return new Date(d.toDateString());
};

const dates = [
  { id: 1, label: 'Сегодня', dates: { date1: getDateDiff(0) } },
  { id: 2, label: 'Вчера', dates: { date1: getDateDiff(-1) } },
  { id: 3, label: 'На прошлой неделе', dates: { date1: getDateDiff(-7), date2: getDateDiff(-1) } },
  { id: 4, label: 'За прошлый месяц', dates: { date1: getDateDiff(-30), date2: getDateDiff(-1) } },
];

const filterModel: Ref<FilterModel | undefined> = ref(undefined);

const setFilter = async (model?: FilterModel) => {
  ftsp.replaceF(model, filterModel.value);
  filterModel.value = model;
};

const prepareFilter = () => {
  if (!dateObj.value) {
    setFilter(undefined);
    dateObj.value = undefined;
    return;
  } else {
    props.model.setDatesRange(dateObj.value.dates.date1, dateObj.value.dates.date2);
    setFilter(props.model);
  }
  emits('load');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
