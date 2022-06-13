<template>
  <el-form v-if="mounted" :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item :label="labelName">
      <el-select
        v-model="sortModel"
        :popper-append-to-body="false"
        value-key="label"
        :clearable="!defaultSortOn"
        :placeholder="sortModel.label"
        @change="setSort"
      >
        <el-option v-for="item in sortModels" :key="item.label" :label="item.label" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, watch, WritableComputedRef } from 'vue';

import Pagination from '@/classes/filters/Pagination';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import Provider from '@/services/Provider';

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
    const defaultSortOn: Ref<boolean> = ref(false);
    const selectedModel: Ref<string> = ref('');
    const sortModel: WritableComputedRef<ISortModel> = computed({
      get(): ISortModel {
        return Provider.store.getters['filter/sortModel'];
      },
      set(sortModel: ISortModel): void {
        Provider.store.commit('filter/replaceSortModel', sortModel);
      },
    });
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.filterQuery.value);
    const mounted: Ref<boolean> = ref(false);

    const sortModels: Ref<ISortModel[]> = Provider.sortList;
    const setDefaultSortModel: Ref<boolean> = computed(() => Provider.store.getters['filter/setDefaultSortModel']);

    const setDefaultSort = () => {
      const defaultSort = Provider.sortList.value.find((sortModel: ISortModel) => sortModel.default);
      if (defaultSort) {
        selectedModel.value = defaultSort.label;
        Provider.store.commit('filter/replaceSortModel', defaultSort);
      }
      defaultSortOn.value = true;
    };

    onBeforeMount((): void => {
      setDefaultSort();
      mounted.value = true;
    });

    watch(setDefaultSortModel, () => {
      if (filterQuery.value.sortModels.length === 0) {
        setDefaultSort();
      }
      emit('load');
    });

    const setSort = () => {
      Provider.filterQuery.value.pagination = new Pagination();
      Provider.filterQuery.value.allLoaded = false;
      emit('load');
    };

    return {
      setDefaultSortModel,
      filterQuery,
      sortModels,
      defaultSortOn,
      setSort,
      selectedModel,
      sortModel,
      mounted,
    };
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
