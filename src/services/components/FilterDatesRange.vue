<template>
  <InfoItem
    margin="0"
    :with-open-window="false"
    height="98px"
    background="#F5F5F5"
    border-color="#C4C4C4"
    padding="7px"
    :with-hover="false"
  >
    <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px">
      <template #title>
        <StringItem :string="defaultLabel" font-size="10px" padding="0" color="#c4c4c4" />
      </template>
      <DateInputRange v-model:start="startDate" v-model:end="endDate" @set-start="setStart" @set-end="setEnd" />
      <PButton type="admin" color="blue" text="Сбросить" @click="reset"/>
    </GridContainer>
  </InfoItem>
</template>

<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import PButton from '@/services/components/PButton.vue';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  model: {
    type: Object as PropType<FilterModel>,
    required: true,
  },
  defaultLabel: {
    type: String as PropType<string>,
    default: 'Все',
  },
});

const emits = defineEmits(['load']);
const filterModel: Ref<FilterModel | undefined> = ref(undefined);

const startDate = ref(props.model.date1);
const endDate = ref(props.model.date2);
// onBeforeMount((): void => {
//   const findedModel = props.models?.find((m: FilterModel) => Provider.filterQuery.value.findFilterModel(m));
//   if (findedModel) {
//     selectedFilterModel.value = findedModel;
//     return;
//   }
//   setDefaultFilterModel();
// });
const setStart = async (date: Date): Promise<void> => {
  props.model.setDate1(date);
  console.log(props.model.date2);
  if (!props.model.date2) {
    props.model.setDate2(props.model.date1);
    endDate.value = props.model.date2;
  }
  await setFilter();
};

const setEnd = async (date: Date): Promise<void> => {
  props.model.setDate2(date);
  await setFilter();
};

const setFilter = async () => {
  Provider.ftsp.value.replaceF(props.model, props.model);
  filterModel.value = props.model;
  await Provider.router.replace({ query: {} });
  emits('load');
};
const reset = async () => {
  props.model.dropDates();
  startDate.value = undefined;
  endDate.value = undefined;
  Provider.ftsp.value.removeF(props.model);
  emits('load');
};
</script>

<style lang="scss" scoped>
.filter-button {
  width: auto;
  height: 23px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;

  &:hover {
    color: #5cb6ff;
  }
}

.set {
  color: #5cb6ff;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
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

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
