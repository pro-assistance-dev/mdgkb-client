<template>
  <div :key="count" style="display: flex; justify-content: center; width: 100%">
    <div
      class="pag-container"
      :style="{
        justifyContent: justifyContent,
      }"
    >
      <div class="pag-number">
        <PButton
          skin="pag"
          :type="curPage === 1 ? 'not-active' : 'neutral'"
          @click="curPage === 1 ? () => undefined : currentChange(curPage - 1)"
        >
          <ArrowLeft />
        </PButton>
        <ul class="pag-ul">
          <li>
            <PButton skin="pag" :type="curPage === 1 ? 'active' : 'neutral'" text="1" @click="currentChange(1)" />
          </li>
          <li @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton
              v-if="pagArr.length > 8 && curPage > 4"
              skin="pag"
              type="neutral"
              @click="curPage - 5 > 1 ? currentChange(curPage - 5) : currentChange(1)"
            >
              <DoubleArrowLeft v-if="hoveringL" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li v-for="num in pagArr3" :key="num">
            <PButton
              v-if="num < pagArr.length && num > 1"
              skin="pag"
              :type="num === curPage ? 'active' : 'neutral'"
              :text="num"
              @click="currentChange(num)"
            />
          </li>
          <li @mouseenter="hoveringR = true" @mouseleave="hoveringR = false">
            <PButton
              v-if="pagArr.length > 8 && curPage < pagArr.length - 3"
              skin="pag"
              type="neutral"
              @click="curPage + 5 < pagArr.length ? currentChange(curPage + 5) : currentChange(pagArr.length)"
            >
              <DoubleArrowRight v-if="hoveringR" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li>
            <PButton
              v-if="pagArr.length > 1"
              skin="pag"
              :type="pagArr.length === curPage ? 'active' : 'neutral'"
              :text="pagArr.length"
              @click="currentChange(pagArr.length)"
            />
          </li>
        </ul>
        <PButton
          skin="pag"
          :type="curPage === pageCount ? 'not-active' : 'neutral'"
          @click="curPage === pagArr.length ? () => undefined : currentChange(curPage + 1)"
        >
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

const hoveringL = ref(false);
const hoveringR = ref(false);

const emit = defineEmits(['cancel', 'save']);
const storeModule: ComputedRef<string> = Store.Getters('filter/storeModule');

const count: ComputedRef<number> = Store.Getters(`${storeModule.value}/count`);

const pageCount: ComputedRef<number> = computed(() => {
  const pg = Math.ceil(count.value / Provider.filterQuery.value.pagination.limit);
  return pg > 0 ? pg : 1;
});

const pagArr = computed(() => Arrays.GenerateNumsRange(1, pageCount.value));
console.log(pagArr.value);
const curPage: ComputedRef<number> = Store.Getters('pagination/curPage');

const currentChange = async (pageNum: number) => {
  if (!props.showConfirm) {
    return await setPage(pageNum, true);
  }
  PHelp.Dialog()
    .Save()
    .then(async () => {
      emit('save');
      await setPage(pageNum, true);
    })
    .catch(async () => {
      PHelp.Notification().Warning('Изменения не были сохранены');
      emit('cancel');
      await setPage(pageNum, true);
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

const pagArr3 = computed(() => {
  if (pagArr.value.length < 8) {
    return Arrays.GenerateNumsRange(2, pageCount.value - 2);
  }
  return Arrays.GenerateNumsRange(curPage.value - 2, curPage.value + 3);
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
