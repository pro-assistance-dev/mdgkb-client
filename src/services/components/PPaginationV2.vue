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
          <li v-if="paginator.pagesCount() > 8 && curPage > 4" @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton skin="pag" type="neutral" @click="currentChange(curPage - 5)">
              <DoubleArrowLeft v-if="hoveringL" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li v-for="num in pagesNums" :key="num">
            <PButton skin="pag" :type="activeOrNeutral(num === curPage)" :text="num" @click="currentChange(num)" />
          </li>
          <li
            v-if="paginator.pagesCount() > 8 && curPage < paginator.pagesCount() - 3"
            @mouseenter="hoveringR = true"
            @mouseleave="hoveringR = false"
          >
            <PButton skin="pag" type="neutral" @click="currentChange(curPage + 5)">
              <DoubleArrowRight v-if="hoveringR" />
              <Ellipsis v-else />
            </PButton>
          </li>
          <li v-if="paginator.pagesCount() > 1">
            <PButton
              skin="pag"
              :type="activeOrNeutral(paginator.pagesCount() === curPage)"
              :text="paginator.pagesCount()"
              @click="currentChange(paginator.pagesCount())"
            />
          </li>
        </ul>
        <PButton skin="pag" :type="notActiveOrNeutral(curPage === paginator.pagesCount())" @click="currentChange(curPage + 1)">
          <ArrowRight />
        </PButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IStorePaginator from '@/services/interfaces/IStorePaginator';
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
  store: {
    type: Object as PropType<IStorePaginator>,
    required: true,
  },
});

const activeOrNeutral = (isActive: boolean) => (isActive ? 'active' : 'neutral');
const notActiveOrNeutral = (notActive: boolean) => (notActive ? 'not-active' : 'neutral');
const pagination = FTSP.Get().p;
const paginator = PHelp.Paginator;

const hoveringL = ref(false);
const hoveringR = ref(false);

const emit = defineEmits(['cancel', 'save']);
// const storeModule: ComputedRef<string> = Store.Getters('filter/storeModule');

const count: Ref<Number> = props.store.Count();
// const pagesCount: ComputedRef<number> =  paginator.pageCount());
const curPage: ComputedRef<number> = Store.Getters('pagination/curPage');

const currentChange = async (toPage: number) => {
  if (toPage === curPage.value) {
    return;
  }
  if (toPage < 1) {
    toPage = 1;
  }
  if (toPage > paginator.pagesCount()) {
    toPage = paginator.pagesCount();
  }
  if (!props.showConfirm) {
    return await setPage(toPage, true);
  }

  PHelp.Dialog.Save()
    .then(async () => {
      emit('save');
      await setPage(toPage, true);
    })
    .catch(async () => {
      PHelp.Notification.Warning('Изменения не были сохранены');
      emit('cancel');
      await setPage(toPage, true);
    });
};

const setPage = async (pageNum: number, load: boolean): Promise<void> => {
  Provider.loadingDecor(async () => {
    paginator.setCurPage(pageNum);
    pagination.offset = pageNum - 1;
    if (load) {
      await props.store.FTSP();
    }
    scrollToBack();
  });
};

const pagesNums = computed(() => {
  const pc = paginator.pagesCount();
  if (pc < 8) {
    return Arrays.GenerateNumsRange(2, pc - 2).filter((p: number) => p < pc && p > 1);
  }
  return Arrays.GenerateNumsRange(curPage.value - 2, curPage.value + 3).filter((p: number) => p < pc && p > 1);
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
