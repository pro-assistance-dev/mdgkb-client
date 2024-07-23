<template>
  <div style="display: flex; justify-content: center; width: 100%">
    <div
      class="pag-container"
      :style="{
        justifyContent: justifyContent,
      }"
    >
      <div class="pag-number">
        <PButton skin="pag" :type="notActiveOrNeutral(paginator.curPage === 1)" @click="currentChange(paginator.curPage - 1)">
          <ArrowLeft />
        </PButton>
        <ul class="pag-ul">
          <li>
            <PButton skin="pag" :type="activeOrNeutral(paginator.curPage === 1)" text="1" @click="currentChange(1)" />
          </li>
          <li v-if="paginator.pagesCount() > 8 && paginator.curPage > 4" @mouseenter="hoveringL = true" @mouseleave="hoveringL = false">
            <PButton skin="pag" type="neutral" @click="currentChange(paginator.curPage - 5)">
              <DoubleArrowLeft v-if="hoveringL" />
              <EllipsisSvg v-else />
            </PButton>
          </li>
          <li v-for="num in pagesNums" :key="num">
            <PButton skin="pag" :type="activeOrNeutral(num === paginator.curPage)" :text="num" @click="currentChange(num)" />
          </li>
          <li
            v-if="paginator.pagesCount() > 8 && paginator.curPage < paginator.pagesCount() - 3"
            @mouseenter="hoveringR = true"
            @mouseleave="hoveringR = false"
          >
            <PButton skin="pag" type="neutral" @click="currentChange(paginator.curPage + 5)">
              <DoubleArrowRight v-if="hoveringR" />
              <EllipsisSvg v-else />
            </PButton>
          </li>
          <li v-if="paginator.pagesCount() > 1">
            <PButton
              skin="pag"
              :type="activeOrNeutral(paginator.pagesCount() === paginator.curPage)"
              :text="paginator.pagesCount()"
              @click="currentChange(paginator.pagesCount())"
            />
          </li>
        </ul>
        <PButton
          skin="pag"
          :type="notActiveOrNeutral(paginator.curPage === paginator.pagesCount())"
          @click="currentChange(paginator.curPage + 1)"
        >
          <ArrowRight />
        </PButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IStorePaginator from '@/services/interfaces/IStorePaginator';

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
const paginator = PHelp.Paginator;

const hoveringL = ref(false);
const hoveringR = ref(false);

const emit = defineEmits(['cancel', 'save']);
paginator.count = props.store.Count();

const currentChange = async (toPage: number) => {
  if (toPage === paginator.curPage) {
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
  paginator.setCurPage(pageNum);
  FTSP.Get().p.offset = (pageNum - 1) * paginator.limit;
  if (load) {
    await props.store.FTSP();
  }
  scrollToBack();
};

const pagesNums = computed(() => {
  const pc = paginator.pagesCount();
  if (pc < 8) {
    return Arrays.GenerateNumsRange(2, pc - 2).filter((p: number) => p < pc && p > 1);
  }
  return Arrays.GenerateNumsRange(paginator.curPage - 2, paginator.curPage + 3).filter((p: number) => p < pc && p > 1);
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
  FTSP.Get().p.drop();
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
