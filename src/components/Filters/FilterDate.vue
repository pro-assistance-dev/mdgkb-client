<template>
  <component :is="'FilterPopover'" :filter-model="filterModel" @addFilterModel="addFilterModel" @dropFilterModel="dropFilterModel">
    <div class="filter-form">
      <el-form label-position="top" :model="filterModel">
        <el-form-item :label="label">
          <!--          <el-select v-model="filterModel.operator" size="mini" placeholder="Выберите дату..." @click="setTrigger('manual')">-->
          <!--            <el-option-->
          <!--              v-for="(item, index) in filterList"-->
          <!--              :key="index"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--              @click="setTrigger('click')"-->
          <!--            ></el-option>-->
          <!--          </el-select>-->
        </el-form-item>
        <el-form-item v-if="filterModel.isUnaryFilter()">
          <el-date-picker v-model="filterModel.value1" size="mini" format="DD.MM.YYYY" @change="addFilterModel"></el-date-picker>
        </el-form-item>
        <!--        <el-form-item v-if="filterModel.isBetweenFilter()">-->
        <!--          <el-date-picker v-model="filterModel.date1" size="mini" format="DD.MM.YYYY" @change="addFilterModel"></el-date-picker>-->
        <!--          <el-date-picker v-model="filterModel.date2" size="mini" format="DD.MM.YYYY" @change="addFilterModel"></el-date-picker>-->
        <!--        </el-form-item>-->
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import FilterPopover from '@/components/Filters/FilterPopover.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';

export default defineComponent({
  name: 'FilterSelectForm',
  components: { FilterPopover },
  props: {
    label: {
      type: String as PropType<string>,
      default: '',
    },
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
    // const filterList: IOption[] = OperatorsOptions;
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.Date));
    const value: Ref<string> = ref('');

    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.Date);
    };

    return {
      dropFilterModel,
      addFilterModel,
      filterModel,
      // filterList,
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
