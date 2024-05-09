<template>
  <div :key="count" style="display: flex; justify-content: center; width: 100%">
    <div class="pag-container" :style="{
      justifyContent: justifyContent,
    }">
      <div class="pag-number">
        <PButton :button-class="curPage === 1 ? 'not-active-pag-button' : 'pag-button'" icon="arrow-left"
          @click="curPage === 1 ? () => undefined : currentChange(curPage - 1)" />
        <ul class="pag-ul">
          <li>
            <PButton :button-class="curPage === 1 ? 'active-pag-button' : 'pag-button'" text="1"
              @click="currentChange(1)" />
          </li>
          <li @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton v-if="pagArr.length > 8 && curPage > 4" button-class="pag-button"
              :icon="hoveringL ? 'double-arrow-left' : 'ellipsis'"
              @click="curPage - 5 > 1 ? currentChange(curPage - 5) : currentChange(1)" />
          </li>
          <li v-for="num in pagArr3" :key="num.id">
            <PButton v-if="num < pagArr.length && num > 1"
              :button-class="num === curPage ? 'active-pag-button' : 'pag-button'" :text="num"
              @click="currentChange(num)" />
          </li>
          <li @mouseenter="hoveringR = true" @mouseleave="hoveringR = false">
            <PButton v-if="pagArr.length > 8 && curPage < pagArr.length - 3" button-class="pag-button"
              :icon="hoveringR ? 'double-arrow-right' : 'ellipsis'"
              @click="curPage + 5 < pagArr.length ? currentChange(curPage + 5) : currentChange(pagArr.length)" />
          </li>
          <li>
            <PButton v-if="pagArr.length > 1"
              :button-class="pagArr.length === curPage ? 'active-pag-button' : 'pag-button'" :text="pagArr.length"
              @click="currentChange(pagArr.length)" />
          </li>
        </ul>
        <PButton :button-class="curPage === pageCount ? 'not-active-pag-button' : 'pag-button'" icon="arrow-right"
          @click="curPage === pagArr.length ? () => undefined : currentChange(curPage + 1)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';

import Provider from '@/services/Provider/Provider';
import PButton from '@/services/components/PButton.vue';

const props = defineProps({
  showConfirm: {
    type: Boolean,
    default: false,
  },
  justifyContent: {
    type: String,
    default: 'center',
  }
});

const hoveringL = ref(false);
const hoveringR = ref(false);

const emit = defineEmits(['cancel', 'save']);
const storeModule: string = Provider.store.getters['filter/storeModule'];
const action: string = Provider.store.getters['filter/action'];

const count: ComputedRef<number> = Store.Getters(`${storeModule}/count`)
const pageCount: ComputedRef<number> = computed(() =>
  Math.ceil(count.value / Provider.filterQuery.value.pagination.limit) > 0
    ? Math.ceil(count.value / Provider.filterQuery.value.pagination.limit)
    : 1
);

const pagArr = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1));
const curPage: ComputedRef<number> = Store.Getters('pagination/curPage')

const rangeArr = () => {
  if (pagArr.value.length < 8) {
    const pagArr2 = Array.from({ length: pageCount.value - 2 }, (_, i) => i + 2);
    return pagArr2;
  }

  const pagArr2 = ref(Array.from({ length: 5 }, (_, i) => curPage.value - 2 + i));
  return pagArr2;
};

const currentChange = async (pageNum: number) => {
  if (props.showConfirm) {
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
    if (load) {
      if (action !== 'ftsp') {
        await Provider.store.dispatch(`${storeModule}/${action}`, { filterQuery: Provider.filterQuery.value });
      } else {
        await Provider.router.replace({ query: {} });
        await Provider.store.dispatch(`${storeModule}/${action}`);
      }
    }
    scrollToBack();
  });
};

const pagArr3 = computed(() => rangeArr());
watch(
  () => curPage.value,
  () => {
    pagArr3.value = Array.from({ length: 5 }, (_, i) => curPage.value - 2 + i);
  });

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
</script>

<style lang="scss" scoped>
.pag-container {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
}

.pag-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 300px;
  max-height: 32px;
}

.pag-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #F0F2F5;
  color: #345E5C;
  transition: 0.1s;
  cursor: pointer;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 14px;
  fill: #345E5C;
  overflow: hidden;
}

.pag-button:hover {
  background: #F0F2F5;
  color: #409EFF;
  fill: #409EFF;
}

.pag-button:active {
  background: #409EFF;
  color: #ffffff;
  fill: #ffffff;
}

.pag-icon {
  width: 24px;
  height: 24px;
}

.pag-ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.active-pag-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #409EFF;
  color: #ffffff;
  transition: 0.1s;
  cursor: pointer;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 14px;
  fill: #345E5C;
  overflow: hidden;
}

.not-active-pag-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #F0F2F5;
  color: #c3c3c3;
  transition: 0.1s;
  cursor: not-allowed;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  border-radius: 3px;
  margin: 0 4px;
  font-size: 14px;
  fill: #c3c3c3;
  overflow: hidden;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
</style>
