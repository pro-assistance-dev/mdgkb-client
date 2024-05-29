<template>
  <div :key="count" style="display: flex; justify-content: center; width: 100%">
    <div class="pag-container" :style="{
      justifyContent: justifyContent,
    }">
      <div class="pag-number">
        <PButton skin="pag" :type="curPage === 1 ? 'not-active' : 'neutral'" @click="curPage === 1 ? () => undefined : currentChange(curPage - 1)">
          <ArrowLeft />
        </PButton>
        <ul class="pag-ul">
          <li>
            <PButton skin="pag" :type="curPage === 1 ? 'active' : 'neutral'" text="1"
              @click="currentChange(1)" />
          </li>
          <li @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton skin="pag" v-if="pagArr.length > 8 && curPage > 4" type="neutral"  @click="curPage - 5 > 1 ? currentChange(curPage - 5) : currentChange(1)" >
              <DoubleArrowLeft v-if="hoveringL"/>
              <Ellipsis v-else/>
            </PButton>
          </li>
          <li v-for="num in pagArr3.value" :key="num.id" >
            <PButton skin="pag" v-if="num < pagArr.length && num > 1"
              :type="num === curPage ? 'active' : 'neutral'" :text="num"
              @click="currentChange(num)" />
          </li>
          <li @mouseenter="hoveringR = true" @mouseleave="hoveringR = false">
            <PButton skin="pag" v-if="pagArr.length > 8 && curPage < pagArr.length - 3" type="neutral" @click="curPage + 5 < pagArr.length ? currentChange(curPage + 5) : currentChange(pagArr.length)">
              <DoubleArrowRight v-if="hoveringR"/>
              <Ellipsis v-else/>
            </PButton>
          </li>
          <li>
            <PButton skin="pag" v-if="pagArr.length > 1"
              :type="pagArr.length === curPage ? 'active' : 'neutral'" :text="pagArr.length"
              @click="currentChange(pagArr.length)" />
          </li>
        </ul>
        <PButton skin="pag" :type="curPage === pageCount ? 'not-active' : 'neutral'" @click="curPage === pagArr.length ? () => undefined : currentChange(curPage + 1)" >
          <ArrowRight />
        </PButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';

import Provider from '@/services/Provider/Provider';
import PButton from '@/services/components/PButton.vue';
import ArrowLeft from '@/services/components/Icons/Pagination/ArrowLeft.vue';
import ArrowRight from '@/services/components/Icons/Pagination/ArrowRight.vue';
import DoubleArrowLeft from '@/services/components/Icons/Pagination/DoubleArrowLeft.vue';
import DoubleArrowRight from '@/services/components/Icons/Pagination/DoubleArrowRight.vue';
import Ellipsis from '@/services/components/Icons/Pagination/Ellipsis.vue';

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
console.log(pagArr3.value);
watch(
  () => curPage.value,
  () => {
    pagArr3.value = Array.from({ length: 5 }, (_, i) => curPage.value - 2 + i);
    console.log(pagArr3.value);
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
@import '@/assets/styles/base-style.scss';
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

.pag-ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
</style>
