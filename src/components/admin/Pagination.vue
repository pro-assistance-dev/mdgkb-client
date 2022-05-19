<template>
  <div :key="count" style="text-align: center; width: 100%">
    <el-pagination
      style="margin: 10px 0"
      :current-page="curPage"
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeUnmount } from 'vue';

import Provider from '@/services/Provider';

export default defineComponent({
  name: 'Pagination',
  setup() {
    const storeModule: string = Provider.store.getters['filter/storeModule'];
    const action: string = Provider.store.getters['filter/action'];
    const count: ComputedRef<number> = computed(() => Provider.store.getters[`${storeModule}/count`]);
    const pageCount: ComputedRef<number> = computed(() =>
      Math.round(count.value / Provider.filterQuery.value.pagination.limit) > 0
        ? Math.round(count.value / Provider.filterQuery.value.pagination.limit)
        : 1
    );
    const curPage: ComputedRef<number> = computed(() => Provider.store.getters['pagination/curPage']);

    const setPage = async (pageNum: number): Promise<void> => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      Provider.store.commit('pagination/setCurPage', pageNum);
      Provider.store.commit('filter/setOffset', pageNum - 1);
      await Provider.store.dispatch(`${storeModule}/${action}`, Provider.filterQuery.value);
      // const div = document.getElementsByClassName('el-table__body-wrapper');
      // div[0].scrollTop = 0;
      loading.close();
    };

    onBeforeUnmount(async () => {
      Provider.store.commit('pagination/setCurPage', 1);
      Provider.store.commit('filter/setOffset', 0);
    });

    return {
      count,
      storeModule,
      curPage,
      pageCount,
      setPage,
    };
  },
});
</script>
<style lang="scss" scoped>
.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
</style>
