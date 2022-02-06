<template>
  <el-select v-model="selectedColumn" class="m-2" placeholder="Select" size="large" @change="setSort">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IOption from '@/interfaces/schema/IOption';

export default defineComponent({
  name: 'SortList',
  components: {},
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    columns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    labels: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];
    const Asc = Orders.Asc;
    const Desc = Orders.Desc;
    const selectedColumn: Ref<string> = ref('');
    // const sortModel = ref(SortModel.CreateSortModel(props.table, col.value));
    const options: Ref<IOption[]> = ref([]);

    onBeforeMount(() => {
      props.columns.forEach((col: string, i: number) => {
        options.value.push({ label: props.labels[i], value: col });
      });
    });

    const sort = async () => {
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const reset = async () => {
      // store.commit('filter/setOffset', 0);
      // store.commit(`pagination/setCurPage`, 1);
      // store.commit(`filter/resetQueryFilter`);
      // await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const setSort = async (column: any) => {
      console.log(column);
      const sortModel = SortModel.CreateSortModel(props.table, selectedColumn.value);
      // sortModel.value.order = param;

      // if (param) {
      store.commit('filter/replaceSortModel', sortModel);
      // } else {
      //   store.commit('filter/spliceSortModel', sortModel.value.id);
      // }
      // await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
      emit('load');
    };

    return {
      options,
      setSort,
      selectedColumn,
      Asc,
      Desc,
      sort,
      reset,
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
