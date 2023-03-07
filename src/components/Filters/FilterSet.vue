<template>
  <component :is="'FilterPopover'" :filter-model="filterModel" @addFilterModel="addFilterModel" @dropFilterModel="dropFilterModel">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item>
          <el-select
            ref="filter"
            v-model="filterModel.set"
            multiple
            filterable
            remote
            placeholder="Выберите диагноз"
            size="mini"
            :remote-method="find"
            :loading="loading"
            @change="blurSelect()"
            @click="setTrigger('manual')"
          >
            <el-option v-for="item in diagnosis" :key="item.value" :label="item.label" :value="item.value" @click="setTrigger('click')" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/services/classes/filters/FilterModel';
import FilterPopover from '@/components/Filters/FilterPopover.vue';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';

export default defineComponent({
  name: 'FilterSet',
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
  },
  setup(props) {
    const { table, col, joinTable, joinTablePk, joinTableFk } = toRefs(props);
    const store = useStore();
    const loading = ref(false);
    const filter = ref();
    const filterModel = ref(
      FilterModel.CreateFilterModelWithJoin(table.value, col.value, joinTable.value, joinTablePk.value, joinTableFk.value, DataTypes.Set)
    );
    filterModel.value.operator = Operators.In;

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };
    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModelWithJoin(
        table.value,
        col.value,
        joinTable.value,
        joinTablePk.value,
        joinTableFk.value,
        DataTypes.Set
      );
      filterModel.value.operator = Operators.In;
    };

    const find = async (query: string): Promise<void> => {
      loading.value = true;
      if (query.length > 2) {
        await store.dispatch('mkb/searchDiagnosis', query);
      }
      loading.value = false;
    };

    const blurSelect = (): void => {
      filter.value.softFocus = true;
      filter.value.blur();
    };

    return {
      blurSelect,
      filter,
      loading,
      find,
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
