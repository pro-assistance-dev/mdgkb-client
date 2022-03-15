<template>
  <el-form>
    <el-form-item>
      <el-select v-model="selectedModel" :clearable="!defaultSortOn" placeholder="Сортировать" @change="setSort">
        <el-option v-for="item in storeMode ? models : sortModels" :key="item.label" :label="item.label" :value="item"> </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ISortModel from '@/interfaces/filters/ISortModel';

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
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];
    const defaultSortOn: Ref<boolean> = ref(false);
    const selectedModel: Ref<string> = ref('');

    const sortModels: Ref<ISortModel[]> = computed(() => store.getters['filters/sortModels']);
    const defaultSortModel: Ref<ISortModel> = computed(() => store.getters['filters/defaultSortModel']);

    const sort = async () => {
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const setDefaultSort = () => {
      // const defaultSort: ISortModel | undefined = props.storeMode
      //   ? defaultSortModel.value
      //   : props.models.find((sortModel: ISortModel) => sortModel.default);
      const defaultSort = props.models.find((sortModel: ISortModel) => sortModel.default);
      if (defaultSort) {
        selectedModel.value = defaultSort.label;
        store.commit('filter/replaceSortModel', defaultSort);
      }
      defaultSortOn.value = true;
    };
    onBeforeMount((): void => {
      if (props.storeMode) {
        store.commit('filters/setSortModel', props.models);
      }
      setDefaultSort();
    });

    // watch(defaultSortModel, () => {
    //   store.commit('filters/setUser', user.value);
    // });

    const setSort = (sortModel: ISortModel) => {
      selectedModel.value = sortModel.label;
      if (sortModel) {
        store.commit('filter/replaceSortModel', sortModel);
        defaultSortOn.value = sortModel.default;
      } else {
        setDefaultSort();
      }
      emit('load');
    };

    return {
      sortModels,
      defaultSortOn,
      setSort,
      selectedModel,
      sort,
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
  height: 38px;
  width: 100%;
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
</style>
