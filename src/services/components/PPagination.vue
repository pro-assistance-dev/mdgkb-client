<template>
  <div :key="count" style="display: flex; justify-content: center; width: 100%">
    <div
      class="pag-container"
      :style="{
        justifyContent: justifyContent,
      }"
    >
      <div class="pag-number">
        <PButton skin="pag" :type="notActiveOrNeutral(curPage === 1)" @click="currentChange(curPage - 1)">
          <ArrowLeft />
        </PButton>
        <ul class="pag-ul">
          <li>
            <PButton skin="pag" :type="activeOrNeutral(curPage === 1)" text="1" @click="currentChange(1)" />
          </li>
          <li v-if="pagesCount > 8 && curPage > 4" @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton skin="pag" type="neutral" @click="currentChange(curPage - 5)">
              <DoubleArrowLeft v-if="hoveringL" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li v-for="num in pagesNums" :key="num">
            <PButton skin="pag" :type="activeOrNeutral(num === curPage)" :text="num" @click="currentChange(num)" />
          </li>
          <li v-if="pagesCount > 8 && curPage < pagesCount - 3" @mouseenter="hoveringR = true" @mouseleave="hoveringR = false">
            <PButton skin="pag" type="neutral" @click="currentChange(curPage + 5)">
              <DoubleArrowRight v-if="hoveringR" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li v-if="pagesCount > 1">
            <PButton skin="pag" :type="activeOrNeutral(pagesCount === curPage)" :text="pagesCount" @click="currentChange(pagesCount)" />
          </li>
        </ul>
        <PButton skin="pag" :type="notActiveOrNeutral(curPage === pagesCount)" @click="currentChange(curPage + 1)">
          <ArrowRight />
        </PButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  showConfirm: {
    type: Boolean,
    default: false,
  },
  justifyContent: {
    type: String,
    default: 'center',
  },
});
const activeOrNeutral = (isActive: boolean) => (isActive ? 'active' : 'neutral');
const notActiveOrNeutral = (notActive: boolean) => (notActive ? 'not-active' : 'neutral');

const hoveringL = ref(false);
const hoveringR = ref(false);

const emit = defineEmits(['cancel', 'save']);
const storeModule: ComputedRef<string> = Store.Getters('filter/storeModule');

const count: ComputedRef<number> = Store.Getters(`${storeModule.value}/count`);
const pagesCount: ComputedRef<number> = computed(() => Math.ceil(count.value / Provider.filterQuery.value.pagination.limit) ?? 1);
const curPage: ComputedRef<number> = Store.Getters('pagination/curPage');

const currentChange = async (toPage: number) => {
  if (toPage === curPage.value) {
    return;
  }
  if (toPage < 1) {
    toPage = 1;
  }
  if (toPage > pagesCount.value) {
    toPage = pagesCount.value;
  }
  if (!props.showConfirm) {
    return await setPage(toPage, true);
  }
  PHelp.Dialog()
    .Save()
    .then(async () => {
      emit('save');
      await setPage(toPage, true);
    })
    .catch(async () => {
      PHelp.Notification().Warning('Изменения не были сохранены');
      emit('cancel');
      await setPage(toPage, true);
    });
};

const setPage = async (pageNum: number, load: boolean): Promise<void> => {
  Provider.loadingDecor(async () => {
    Store.Commit('pagination/setCurPage', pageNum);
    Store.Commit('filter/setOffset', pageNum - 1);
    if (load) {
      await Store.FTSP(storeModule.value);
    }
    scrollToBack();
  });
};

const pagesNums = computed(() => {
  if (pagesCount.value < 8) {
    return Arrays.GenerateNumsRange(2, pagesCount.value - 2).filter((p: number) => p < pagesCount.value && p > 1);
  }
  return Arrays.GenerateNumsRange(curPage.value - 2, curPage.value + 3).filter((p: number) => p < pagesCount.value && p > 1);
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
@import '@/services/assets/style/index.scss';
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
