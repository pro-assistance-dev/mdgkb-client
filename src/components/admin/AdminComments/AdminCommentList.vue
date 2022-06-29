<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <SortList class="filters-block" :models="createSortModels()" @load="loadComments" />
      <FilterSelectDate class="filters-block" :table="schema.comment.tableName" :col="schema.comment.publishedOn" @load="loadComments" />
      <FilterCheckbox
        class="filters-block"
        label="Отмодерированные"
        :table="schema.comment.tableName"
        :col="schema.comment.modChecked"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        @load="loadComments"
      />
    </template>
    <div class="comments-container">
      <div id="list" style="overflow: auto; padding-right: 5px">
        <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
      </div>
      <div v-if="!comments.length">Комментариев нет</div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, Ref, ref } from 'vue';

import AdminCommentCard from '@/components/admin/AdminComments/AdminCommentCard.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import IComment from '@/interfaces/comments/IComment';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import CommentsSortsLib from '@/services/Provider/libs/sorts/CommentsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminCommentList',
  components: { AdminCommentCard, FilterSelectDate, FilterCheckbox, AdminListWrapper },
  setup() {
    const comments: ComputedRef<IComment[]> = computed<IComment[]>(() => Provider.store.getters['comments/comments']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['meta/applicationsCount']('comments'));
    const searchString: Ref<string> = ref('');

    const load = async (filterQuery: IFilterQuery) => {
      Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      await Provider.store.dispatch('comments/getAll', filterQuery);
      await Provider.store.dispatch('comments/subscribeCreate');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на въезд',
        buttons: [],
        applicationsCount,
      });
    };

    const createSortModels = () => {
      return [CommentsSortsLib.byPublishedOn(Orders.Desc), CommentsSortsLib.byPublishedOn(Orders.Asc)];
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'comments', action: 'getAll' },
      sortModels: [],
    });

    const loadComments = async () => {
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    onBeforeUnmount(async () => {
      await Provider.store.dispatch('comments/unsubscribeCreate');
    });

    return {
      comments,
      mounted: Provider.mounted,
      schema: Provider.schema,
      searchString,
      loadComments,
      load,
      Operators,
      DataTypes,
      createSortModels,
    };
  },
});
</script>

<style lang="scss" scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
}
</style>
