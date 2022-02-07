<template>
  <div class="filter-form">
    <el-form label-position="top">
      <el-form-item>
        <el-checkbox v-model="filterModel.boolean" :label="label" size="mini" @change="changeFilterModel" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';

export default defineComponent({
  name: 'FilterCheckbox',
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    label: {
      type: String as PropType<string>,
      default: '',
    },
    operator: {
      type: String as PropType<Operators>,
      default: '',
    },
    dataType: {
      type: String as PropType<DataTypes>,
      default: '',
    },
    value: {
      type: Number as PropType<number>,
      default: 0,
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
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const filterModel = ref(FilterModel.CreateFilterModel(props.table, props.col, props.dataType));

    onBeforeMount(() => {
      filterModel.value.operator = props.operator;
    });

    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
      emit('load');
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      if (props.dataType === DataTypes.Join) {
        filterModel.value = FilterModel.CreateFilterModelWithJoin(
          props.table,
          props.col,
          props.joinTable,
          props.joinTablePk,
          props.joinTableFk,
          props.dataType,
          props.joinTableId
        );
      } else {
        filterModel.value = FilterModel.CreateFilterModel(props.table, props.col, props.dataType);
        filterModel.value.operator = props.operator;
      }

      emit('load');
    };

    const changeFilterModel = (select: boolean) => {
      if (select) {
        addFilterModel();
        return;
      }
      dropFilterModel();
    };

    return {
      changeFilterModel,
      dropFilterModel,
      addFilterModel,
      filterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
