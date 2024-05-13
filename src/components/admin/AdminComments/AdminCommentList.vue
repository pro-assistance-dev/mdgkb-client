<template>
  <AdminListWrapper pagination show-header>
    <template #header>
      <SortList class="filters-block" :models="sortList" @load="loadComments" />
      <FilterSelectDate class="filters-block" :table="'comments'" :col="'publishedOn'" @load="loadComments" />
      <FilterCheckbox class="filters-block" label="Отмодерированные" :table="Comment.GetClassName()"
        :col="$classHelper.GetPropertyName(Comment).modChecked" :data-type="DataTypes.Boolean" :operator="Operators.Eq"
        @load="loadComments" />
      <FilterSelectV2 :filter-models="createFilterModels()" @load="loadComments" />
    </template>
    <div class="comments-container">
      <div id="list" style="overflow: auto; padding-right: 5px">
        <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
      </div>
      <div v-if="!comments.length">Комментариев нет</div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import { Orders } from '@/services/interfaces/Orders';
import CommentsFiltersLib from '@/libs/filters/CommentsFiltersLib';
import CommentsSortsLib from '@/libs/sorts/CommentsSortsLib';
import Provider from '@/services/Provider/Provider';

const comments: ComputedRef<Comment[]> = Store.Items('comments')
// const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['admin/applicationsCount']('comments'));
const searchString: Ref<string> = ref('');
let sourceSSE: EventSource | undefined = undefined;

const load = async () => {
  // Provider.setSortList(...createSortModels(CommentsSortsLib, Orders.Desc));
  // Provider.setSortModels(CommentsSortsLib.byPublishedOn(Orders.Desc));
  FTSP.Get().setS(CommentsSortsLib.byPublishedOn(Orders.Desc))
  await Store.FTSP('comments')
  Provider.store.commit('admin/setHeaderParams', {
    title: 'Заявления на посещение',
    buttons: [],
  });
};

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'comments', action: 'ftsp' },
});

const loadComments = async () => {
  await Store.FTSP('comments')
};

onBeforeUnmount(async () => {
  sourceSSE?.close();
  // await Provider.store.dispatch('comments/unsubscribeCreate');
});

const createFilterModels = (): FilterModel[] => {
  return [CommentsFiltersLib.onlyNewsComments(), CommentsFiltersLib.onlyDoctorsComments(), CommentsFiltersLib.onlyDivisionsComments()];
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
