<template>
  <component :is="'FilterPopover'" :filter-model="filterModel" @addFilterModel="addFilterModel" @dropFilterModel="dropFilterModel">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item>
          <el-select v-model="filterModel.operator" size="mini" placeholder="Выберите дату..." @click="setTrigger('manual')">
            <el-option
              v-for="(item, index) in filterList"
              :key="index"
              :label="item.label"
              :value="item.value"
              @click="setTrigger('click')"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterModel.value1" size="mini" />
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import OperatorsTextOptions from '@/classes/filters/OperatorsTextOptions';
import FilterPopover from '@/components/Filters/FilterPopover.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IOption from '@/interfaces/shared/IOption';

export default defineComponent({
  name: 'FilterTextForm',
  components: { FilterPopover },
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const { table, col } = toRefs(props);
    const store = useStore();
    const filterList: IOption[] = OperatorsTextOptions;
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String));
    filterModel.value.operator = Operators.Like;

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };
    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String);
      filterModel.value.operator = Operators.Like;
    };

    return {
      filterList,
      dropFilterModel,
      addFilterModel,
      filterModel,
      setTrigger,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/filterForm.scss';
</style>
