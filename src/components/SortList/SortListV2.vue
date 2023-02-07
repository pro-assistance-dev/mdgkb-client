<template>
  <el-form :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
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
import SortModel from '@/classes/filters/SortModel';
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
    const sortModel: WritableComputedRef<SortModel | undefined> = computed({
      get(): SortModel | undefined {
        return Provider.filterQuery.value.sortModel;
      },
      set(sortModel: SortModel | undefined): void {
        if (!sortModel) {
          return;
        }
        Provider.filterQuery.value.sortModel = sortModel;
      },
    });
    const defaultSortOn: Ref<boolean> = ref(false);
    const setDefaultSortModel: Ref<boolean> = computed(() => Provider.store.getters['filter/setDefaultSortModel']);

    const setDefaultSort = () => {
      const defaultSort = Provider.sortList.value.find((sortModel: SortModel) => sortModel.default);
      if (defaultSort) {
        sortModel.value = defaultSort;
      }
      defaultSortOn.value = true;
    };

    onBeforeMount((): void => {
      if (!Provider.filterQuery.value.sortModel) {
        setDefaultSort();
      }
    });

    watch(setDefaultSortModel, () => {
      if (!Provider.filterQuery.value.sortModel) {
        setDefaultSort();
      }
      emit('load');
    });

    const setSort = async (s: SortModel) => {
      Provider.filterQuery.value.pagination = new Pagination();
      Provider.filterQuery.value.allLoaded = false;
      Provider.filterQuery.value.sortModel = s;
      Provider.store.commit('pagination/setCurPage', 1);
      await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });
      emit('load');
    };

    return { defaultSortOn, setDefaultSortModel, sortModels: Provider.sortList, setSort, sortModel };
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
