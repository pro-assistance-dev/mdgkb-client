<template>
  <div :key="count" style="text-align: center; width: 100%">
    <el-pagination
      style="margin: 10px 0"
      :current-page="curPage"
      background
      layout="prev, pager, next"
      :page-count="pageCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';

import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'Pagination',
  props: {
    showConfirm: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cancel', 'save'],
  setup(prop, { emit }) {
    const storeModule: string = Provider.store.getters['filter/storeModule'];
    const action: string = Provider.store.getters['filter/action'];
    const count: ComputedRef<number> = computed(() => Provider.store.getters[`${storeModule}/count`]);
    const pageCount: ComputedRef<number> = computed(() =>
      Math.ceil(count.value / Provider.filterQuery.value.pagination.limit) > 0
        ? Math.ceil(count.value / Provider.filterQuery.value.pagination.limit)
        : 1
    );
    const curPage: ComputedRef<number> = computed(() => Provider.store.getters['pagination/curPage']);

    const currentChange = async (pageNum: number) => {
      if (prop.showConfirm) {
        ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Сохранить',
          cancelButtonText: 'Не сохранять',
        })
          .then(async () => {
            // Вызывается при сохранении
            emit('save');
            await setPage(pageNum, true);
          })
          .catch(async (action: string) => {
            if (action === 'cancel') {
              ElMessage({
                type: 'warning',
                message: 'Изменения не были сохранены',
              });
              emit('cancel');
              await setPage(pageNum, true);
            }
            return;
          });
      } else {
        await setPage(pageNum, true);
      }
    };
    const setPage = async (pageNum: number, load: boolean): Promise<void> => {
      Provider.loadingDecor(async () => {
        Provider.store.commit('pagination/setCurPage', pageNum);
        Provider.store.commit('filter/setOffset', pageNum - 1);
        // await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });
        if (load) {
          if (action !== 'ftsp') {
            await Provider.store.dispatch(`${storeModule}/${action}`, { filterQuery: Provider.filterQuery.value });
          } else {
            await Provider.router.replace({ query: {} });
            await Provider.store.dispatch(`${storeModule}/${action}`, { qid: undefined, ftsp: Provider.filterQuery.value });
          }
        }
        scrollToBack();
      });
    };

    const scrollToBack = () => {
      const table = document.querySelector('.el-table__body-wrapper');
      const list = document.querySelector('#list');
      if (table) {
        table.scrollTo({ top: 0 });
      } else if (list) {
        list.scrollTo({ top: 0 });
      }
    };

    onBeforeUnmount(() => {
      Provider.dropPagination();
    });

    onBeforeMount(async () => {
      await setPage(Provider.getPagination().getPageNum(), false);
    });

    return {
      count,
      storeModule,
      curPage,
      pageCount,
      currentChange,
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
