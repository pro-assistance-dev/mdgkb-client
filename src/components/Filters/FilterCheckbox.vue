<template>
  <div class="filter-form">
    <el-form label-position="top">
      <el-form-item>
        <el-checkbox v-model="selected" :label="label" size="mini" @change="changeFilterModel" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
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
    filterValue: {
      type: Number as PropType<number | string | boolean>,
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
    joinTableIdCol: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const filterModel = ref(FilterModel.CreateFilterModel(props.table, props.col, props.dataType));
    const selected: Ref<boolean> = ref(false);

    onBeforeMount(() => {
      filterModel.value.operator = props.operator;
    });

    const addFilterModel = () => {
      if (props.dataType === DataTypes.Join) {
        filterModel.value = FilterModel.CreateFilterModelWithJoin(
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
        filterModel.value = FilterModel.CreateFilterModel(props.table, props.col, props.dataType);
        filterModel.value.operator = props.operator;
        if (props.filterValue && typeof props.filterValue === 'string') {
          filterModel.value.value1 = props.filterValue;
        }
        if (props.filterValue && typeof props.filterValue === 'boolean') {
          filterModel.value.value1 = String(props.filterValue);
          filterModel.value.boolean = props.filterValue;
        }
      }

      store.commit('filter/setFilterModel', filterModel.value);
      emit('load');
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(props.table, props.col, props.dataType);
      filterModel.value.operator = props.operator;
      emit('load');
    };

    const changeFilterModel = (select: boolean) => {
      selected.value = select;
      if (select) {
        addFilterModel();
        return;
      }
      dropFilterModel();
    };

    return {
      selected,
      changeFilterModel,
      dropFilterModel,
      addFilterModel,
      filterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-form {
  align-items: center;
  height: 38px;
}

.el-form-item {
  align-items: center;
  height: auto;
}

:deep(.el-form-item__content) {
  margin-top: 6px;
  height: 30px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #2754eb;
  border: 1px solid #2754eb;
}

:deep(.el-checkbox__inner:active) {
  border-color: #2754eb;
}

:deep(.el-checkbox__inner:hover) {
  border-color: #2754eb;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #2754eb;
}
// @import '@/assets/elements/filterForm.scss';
</style>
