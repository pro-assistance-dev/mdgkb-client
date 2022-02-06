<template>
  <div class="filter-form">
    <el-form label-position="top">
      <el-form-item>
        <!--        <div v-for="select in selectList" :key="select">-->
        <el-checkbox v-model="filterModel.boolean" :label="label" size="mini" @change="changeFilterModel" />
        <!--        </div>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref, toRefs } from 'vue';
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
  },
  emits: ['load'],
  setup(props, { emit }) {
    const { table, col } = toRefs(props);
    const store = useStore();
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, props.dataType));

    onBeforeMount(() => {
      filterModel.value.operator = props.operator;
    });

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };

    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
      emit('load');
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, props.dataType);
      filterModel.value.operator = props.operator;
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
      setTrigger,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
