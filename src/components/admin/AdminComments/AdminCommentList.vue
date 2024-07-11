<template>
  <AdminListWrapper pagination show-header :store="CommentsStore">
    <template #header>
      <SortSelect :max-width="400" @load="loadComments" />
      <!-- <FilterSelectDate :model="CommentsFiltersLib.byDatesRange()" @load="loadComments" /> -->
      <!-- <FilterCheckbox :model="CommentsFiltersLib.onlyChecked()" @load="loadComments" /> -->
      <FilterSelect :models="createDomenFilters()" @load="loadComments" />
    </template>
    <div class="comments-container">
      <div id="list" style="overflow: scroll; padding-right: 5px">
        <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
      </div>
      <div v-if="!comments.length">Комментариев нет</div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';
import CommentsFiltersLib from '@/libs/filters/CommentsFiltersLib';
import CommentsSortsLib from '@/libs/sorts/CommentsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import SortListConst from '@/services/SortList';
const comments: Comment[] = CommentsStore.Items();
// const sourceSSE: EventSource | undefined = undefined;

const load = async () => {
  SortListConst.Set(CommentsSortsLib);
  FTSP.Get().setS(CommentsSortsLib.byPublishedOn(Orders.Desc));
  await CommentsStore.FTSP();
  PHelp.AdminUI.Head.Set('Комментарии', []);
};

Hooks.onBeforeMount(load);

const loadComments = async () => {
  await CommentsStore.FTSP();
};

onBeforeUnmount(async () => {
  // sourceSSE?.close();
});

const createDomenFilters = (): FilterModel[] => {
  return [
    CommentsFiltersLib.byDomen('doctors', 'Врачи'),
    CommentsFiltersLib.byDomen('divisions', 'Отделения'),
    CommentsFiltersLib.byDomen('news', 'Новости'),
  ];
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.comments-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
}
</style>
