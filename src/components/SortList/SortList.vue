<template>
  <el-select v-model="selectedModel" class="m-2" placeholder="Select" size="large" @change="setSort">
    <el-option v-for="item in models" :key="item.label" :label="item.label" :value="item"> </el-option>
  </el-select>
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
</style>
