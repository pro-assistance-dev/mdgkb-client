<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <SortList class="filters-block" :models="createSortModels()" @load="loadComments" />
      <FilterSelectDate
        class="filters-block"
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.publishedOn"
        @load="loadComments"
      />
      <FilterCheckbox
        class="filters-block"
        label="Отмодерированные"
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.modChecked"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        @load="loadComments"
      />
    </template>
    <div class="comments-container">
      <div style="overflow: auto">
        <AdminCommentCard v-for="(comment, i) in comments" :key="i" :comment="comment" />
      </div>
      <div v-if="!comments.length">Комментариев нет</div>
    </div>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import AdminCommentCard from '@/components/admin/AdminComments/AdminCommentCard.vue';
import Pagination from '@/components/admin/Pagination.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import SortList from '@/components/SortList/SortList.vue';
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
  components: { AdminCommentCard, Pagination, SortList, FilterSelectDate, FilterCheckbox, AdminListWrapper },
  setup() {
    // const route = useRoute();
    const comments: ComputedRef<IComment[]> = computed<IComment[]>(() => Provider.store.getters['comments/comments']);
    const mounted: Ref<boolean> = ref(false);
    const searchString: Ref<string> = ref('');

    const load = async (filterQuery: IFilterQuery) => {
      Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      await Provider.store.dispatch('comments/getAll', filterQuery);
      mounted.value = true;
    };

    const createSortModels = () => {
      return [CommentsSortsLib.byPublishedOn(Orders.Desc), CommentsSortsLib.byPublishedOn(Orders.Asc)];
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'comments', action: 'getAll' },
      sortModels: [],
      adminHeader: {
        title: 'Комментарии',
      },
    });

    const loadComments = async () => {
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    return {
      comments,
      mounted,
      Provider,
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
