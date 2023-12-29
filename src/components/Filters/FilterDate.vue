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
          <DatePicker v-model="filterModel.value1" size="mini" format="DD.MM.YYYY" @change="addFilterModel" />
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs } from 'vue';

import FilterPopover from '@/components/Filters/FilterPopover.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'FilterDate',
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
  emits: ['load'],
  setup(props, { emit }) {
    const { table, col } = toRefs(props);
    const defaultModel = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.Date);
    const filterModel = ref(defaultModel);
    const value: Ref<string> = ref('');

    const addFilterModel = async () => {
      await Provider.replaceFilterModel(filterModel.value, undefined);
      emit('load');
    };

    const dropFilterModel = async () => {
      await Provider.spliceFilterModel(filterModel.value.id);
      filterModel.value = defaultModel;
      emit('load');
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
