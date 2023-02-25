<template>
  <el-form :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item :label="labelName">
      <el-select
        v-model="Provider.filterQuery.value.sortModel"
        :popper-append-to-body="false"
        value-key="label"
        :clearable="!Provider.filterQuery.value.sortModel.default"
        :placeholder="Provider.filterQuery.value.sortModel.label"
        @change="setSort"
      >
        <el-option v-for="item in sortModels" :key="item.label" :label="item.label" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, watch, WritableComputedRef } from 'vue';

import FilterQuery from '@/classes/filters/FilterQuery';
import Pagination from '@/classes/filters/Pagination';
import SortModel from '@/classes/filters/SortModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'SortListV2',
  components: {},
  props: {
    showLabel: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    labelName: {
      type: String,
      default: 'Сортировать',
    },
    maxWidth: {
      type: [Number, String],
      default: 250,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const setDefaultSortModel: Ref<boolean> = computed(() => Provider.store.getters['filter/setDefaultSortModel']);

    // onBeforeMount((): void => {
    //   changeModel(Provider.filterQuery.value.sortModel);
    // });

    watch(setDefaultSortModel, () => {
      setSort(undefined);
      emit('load');
    });

    const changeModel = async (s: SortModel | undefined): Promise<void> => {
      if (s) {
        Provider.filterQuery.value.sortModel = s;
      } else {
        Provider.setDefaultSortModel();
      }
      await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });
      emit('load');
    };

    const setSort = async (s: SortModel | undefined) => {
      Provider.dropPagination();
      await changeModel(s);
    };

    return { setDefaultSortModel, sortModels: Provider.sortList, setSort, Provider };
  },
});
</script>

<style lang="scss" scoped>
.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;
  &:hover {
    color: #5cb6ff;
  }
}
.set {
  color: #5cb6ff;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  // width: 100%;
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

:deep(.el-form-item) {
  padding: 10px;
  margin: 0;
}
</style>
