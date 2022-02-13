<template>
  <div class="filter-form">
    <el-form :gutter="12" label-position="top">
      <el-form-item>
        <el-select v-model="filterModel.date1" filterable clearable placeholder="Выберите дату" round @change="addFilterModel">
          <el-option label="Сегодня" :value="new Date()"></el-option>
          <el-option label="Вчера" :value="new Date() - 1"></el-option>
          <el-option label="Позавчера" :value="new Date() - 2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';

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
    const store = useStore();
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.Date));
    filterModel.value.operator = Operators.Eq;

    const addFilterModel = (value: string) => {
      console.log(value);
      if (!filterModel.value.value1) {
        dropFilterModel();
      }
      if (filterModel.value.value1) {
        store.commit('filter/setFilterModel', filterModel.value);
      }
      emit('load', value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String);
      filterModel.value.operator = Operators.Eq;
    };

    return {
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
