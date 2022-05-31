<template>
  <el-form v-if="mounted" :style="{ width: '100%', maxWidth: `${maxWidth}${typeof maxWidth === 'number' ? 'px' : ''}` }">
    <el-form-item :label="showLabel && labelName">
      <el-select v-model="sortModel" value-key="label" :clearable="!defaultSortOn" :placeholder="sortModel.label" @change="setSort">
        <el-option v-for="item in storeMode ? models : sortModels" :key="item.label" :label="item.label" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, watch, WritableComputedRef } from 'vue';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'SortList',
  components: {},
  props: {
    models: {
      type: Array as PropType<ISortModel[]>,
      default: () => [],
    },
    storeMode: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
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
    const storeModule: string = Provider.store.getters['filter/storeModule'];
    const storeAction: string = Provider.store.getters['filter/storeAction'];
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
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.store.getters['filter/filterQuery']);
    const mounted: Ref<boolean> = ref(false);

    const sortModels: Ref<ISortModel[]> = computed(() => Provider.store.getters['filter/sortModels']);
    const setDefaultSortModel: Ref<boolean> = computed(() => Provider.store.getters['filter/setDefaultSortModel']);

    const sort = async () => {
      await Provider.store.dispatch(`${storeModule}/${storeAction}`, Provider.store.getters['filter/filterQuery']);
    };

    const setDefaultSort = () => {
      // const defaultSort: ISortModel | undefined = props.storeMode
      //   ? defaultSortModel.value
      //   : props.models.find((sortModel: ISortModel) => sortModel.default);
      const defaultSort = props.models.find((sortModel: ISortModel) => sortModel.default);
      if (defaultSort) {
        selectedModel.value = defaultSort.label;
        Provider.store.commit('filter/replaceSortModel', defaultSort);
      }
      defaultSortOn.value = true;
    };

    onBeforeMount((): void => {
      // if (props.storeMode) {
      //   Provider.store.commit('filter/setSortModel', props.models);
      // }
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
      // selectedModel.value = sortModel.label;
      // if (sortModel.value) {
      //   Provider.store.commit('filter/replaceSortModel', sortModel);
      //   defaultSortOn.value = sortModel.value.default;
      // } else {
      //   setDefaultSort();
      // }
      emit('load');
    };

    return {
      setDefaultSortModel,
      filterQuery,
      sortModels,
      defaultSortOn,
      setSort,
      selectedModel,
      sort,
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
