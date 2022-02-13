<template>
  <el-form-item>
    <el-select v-model="selectedModel" clearable placeholder="Сортировать" @change="setSort">
      <el-option v-for="item in models" :key="item.label" :label="item.label" :value="item"> </el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ISortModel from '@/interfaces/filters/ISortModel';
import IOption from '@/interfaces/schema/IOption';

export default defineComponent({
  name: 'SortList',
  components: {},
  props: {
    models: {
      type: Array as PropType<ISortModel[]>,
      default: () => [],
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];

    // const selectedModel: Ref<ISortModel | undefined> = ref(props.models?.find((prop: ISortModel) => prop.default));
    const selectedModel: Ref<string> = ref('');

    const options: Ref<IOption[]> = ref([]);

    const sort = async () => {
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const setSort = async (sortModel: ISortModel) => {
      selectedModel.value = sortModel.label;
      store.commit('filter/replaceSortModel', sortModel);
      emit('load');
    };

    return {
      options,
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
