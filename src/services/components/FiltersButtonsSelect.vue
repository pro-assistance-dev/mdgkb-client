<template>
  <StringItem :string="defaultLabel" font-size="14px" padding="0" margin="20px 0 0 10px" />
  <InfoItem margin="5px 0 0 0px" :with-open-window="false" height="auto" background="#F5F5F5" border-color="#C4C4C4"
    padding="7px" :with-hover="false">
    <!-- <InfoItem margin="0" :with-open-window="false" :with-icon="false" height="auto" background="#F5F5F5" border-color="#C4C4C4" padding="7px" :with-hover="false"> -->
    <template #title>
      <!-- <StringItem :string="defaultLabel" font-size="14px" padding="0" margin="-5px 0 0 0" /> -->
    </template>

    <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))"
      margin="0px">
      <PButton type="admin" color="blue" v-for="(model, index) in models" :key="index" height="auto" :text="model.label"
        :is-toggle="model.valueEq(filterModel)" :toggle-mode="true" :inverse="inverse"
         @click="selectFilter(model.valueEq(filterModel) ? undefined : model)" />
    </GridContainer>
  </InfoItem>
</template>

<script lang="ts" setup>
import FilterModel from '@/services/classes/filters/FilterModel';
import PButton from '@/services/components/PButton.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  models: {
    type: Array as PropType<FilterModel[]>,
    default: () => [],
  },
  defaultLabel: {
    type: String as PropType<string>,
    default: 'Все',
  },
  inverse: { type: Boolean as PropType<boolean>, required: false, default: false },
});
const emits = defineEmits(['load']);
const ftsp = Store.Item('filter', 'ftsp');
const restore = Store.Item('filter', 'restore');


watch(
  () => restore.value,
  () => {
    console.log(props.models, ftsp.value.f);
    const finded = props.models.find((m: FilterModel) => {
      return ftsp.value.f.some((f: FilterModel) => {
        return m.valueEq(f);
      });
    });
    setFilter(finded);
  }
);
const filterModel: Ref<FilterModel | undefined> = ref(undefined);

const setFilter = async (model?: FilterModel) => {
  Provider.ftsp.value.replaceF(model, filterModel.value);
  filterModel.value = model;
  Provider.dropPagination();
  Provider.getPagination().drop();
  await Provider.router.replace({ query: {} });
};

const selectFilter = async (model?: FilterModel) => {
  await setFilter(model);
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
  padding: 10px;
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
