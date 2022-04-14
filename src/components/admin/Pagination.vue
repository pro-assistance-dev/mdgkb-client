<template>
  <div style="text-align: center; width: 100%">
    <el-pagination
      style="margin-top: 20px; margin-bottom: 20px"
      :current-page="curPage"
      background
      layout="prev, pager, next"
      :page-count="Math.round(count / 25) > 0 ? Math.round(count / 25) : 1"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeUnmount, Ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Pagination',
  setup() {
    const store = useStore();
    const storeModule: string = store.getters['filter/storeModule'];
    const action: string = store.getters['filter/action'];

    const count: Ref<number> = computed(() => store.getters[`${storeModule}/count`]);
    const curPage: Ref<number> = computed(() => store.getters['pagination/curPage']);

    const setPage = async (pageNum: number): Promise<void> => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      store.commit('pagination/setCurPage', pageNum);
      store.commit('filter/setOffset', pageNum - 1);
      await store.dispatch(`${storeModule}/${action}`, store.getters['filter/filterQuery']);
      const div = document.getElementsByClassName('el-table__body-wrapper');
      div[0].scrollTop = 0;
      loading.close();
    };

    onBeforeUnmount(() => {
      store.commit('pagination/setCurPage', 1);
      store.commit('filter/setOffset', 0);
    });

    return {
      storeModule,
      curPage,
      count,
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
