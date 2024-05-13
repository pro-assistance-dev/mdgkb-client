<template>
  <ArrowUpOutlined v-if="sortModel.isAsc()" class="set" @click="setSort(Desc)" />
  <ArrowDownOutlined v-else-if="sortModel.isDesc()" class="set" @click="setSort(undefined)" />
  <ArrowUpOutlined v-else @click="setSort(Asc)" />
</template>

<script lang="ts">
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import { Orders } from '@/services/interfaces/Orders';

export default defineComponent({
  name: 'SortButton',
  components: {
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];
    const Asc = Orders.Asc;
    const Desc = Orders.Desc;
    const sortModel = ref();
    // const sortModel = ref(SortModel.Create(table.value, col.value));

    const sort = async () => {
      store.commit('filter/setOffset', 0);
      store.commit(`pagination/setCurPage`, 1);
      store.commit(`filter/resetQueryFilter`);

      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const reset = async () => {
      store.commit('filter/setOffset', 0);
      store.commit(`pagination/setCurPage`, 1);
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    const setSort = async (param: Orders) => {
      sortModel.value.order = param;
      if (param) {
        store.commit('filter/setSortModel', sortModel.value);
      } else {
        store.commit('filter/spliceSortModel', sortModel.value.id);
      }
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
    };

    return {
      setSort,
      sortModel,
      Asc,
      Desc,
      sort,
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
