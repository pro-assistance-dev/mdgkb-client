<template>
  <div class="filter-form">
    <el-form :gutter="12" label-position="top">
      <el-form-item>
        <el-select v-model="filterModel.value1" filterable clearable :placeholder="placeholder" round @change="addFilterModel">
          <el-option v-for="(option, optionIndex) in options" :key="optionIndex" :label="option.label" :value="option.value"></el-option>
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
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import IOption from '@/interfaces/schema/IOption';

export default defineComponent({
  name: 'FilterSelect',
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    operator: {
      type: String as PropType<Operators>,
      default: '',
    },
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    dataType: {
      type: String as PropType<DataTypes>,
      default: '',
    },
    joinTable: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableFk: {
      type: String as PropType<string>,
      default: '',
    },
    joinTablePk: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableId: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableIdCol: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const { table, col } = toRefs(props);
    const store = useStore();

    const createModel = (): IFilterModel => {
      if (props.dataType === DataTypes.Join) {
        return FilterModel.CreateFilterModelWithJoin(
          props.table,
          props.col,
          props.joinTable,
          props.joinTablePk,
          props.joinTableFk,
          props.dataType,
          props.joinTableId,
          props.joinTableIdCol
        );
      } else {
        const fm = FilterModel.CreateFilterModel(props.table, props.col, props.dataType);
        fm.operator = props.operator;
        return fm;
      }
    };

    const filterModel = ref(createModel());
    // filterModel.value.operator = Operators.Eq;

    const addFilterModel = (value: string) => {
      if (!value.length) {
        dropFilterModel();
      } else {
        filterModel.value = createModel();
        filterModel.value.value1 = value;
        filterModel.value.joinTableId = value;
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
