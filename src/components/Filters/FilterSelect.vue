<template>
  <div class="filter-form">
    <el-form label-position="top">
      <el-form-item>
        <el-select v-model="filterModel.value1" size="mini" :placeholder="placeholder" @change="addFilterModel">
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
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
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
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String));
    filterModel.value.operator = Operators.Eq;

    const addFilterModel = (value: unknown) => {
      store.commit('filter/setFilterModel', filterModel.value);
      emit('load', value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String);
      filterModel.value.operator = Operators.Eq;
    };

    return {
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
