<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <SortList class="filters-block" :models="sortList" @load="loadComments" />
      <FilterSelectDate class="filters-block" :table="'comments'" :col="'publishedOn'" @load="loadComments" />
      <FilterCheckbox
        class="filters-block"
        label="Отмодерированные"
        :table="Comment.GetClassName()"
        :col="$classHelper.GetPropertyName(Comment).modChecked"
        :data-type="DataTypes.Boolean"
        :operator="Operators.Eq"
        @load="loadComments"
      />
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

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeUnmount, Ref, ref } from 'vue';

import Comment from '@/classes/Comment';
import AdminCommentCard from '@/components/admin/AdminComments/AdminCommentCard.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import FilterSelectV2 from '@/components/Filters/FilterSelectV2.vue';
import SortList from '@/components/SortList/SortList.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import { Operators } from '@/services/interfaces/Operators';
import { Orders } from '@/services/interfaces/Orders';
import CommentsFiltersLib from '@/services/Provider/libs/filters/CommentsFiltersLib';
import CommentsSortsLib from '@/services/Provider/libs/sorts/CommentsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';
export default defineComponent({
  name: 'AdminCommentList',
  components: { FilterSelectV2, AdminCommentCard, FilterSelectDate, FilterCheckbox, AdminListWrapper, SortList },
  setup() {
    const comments: ComputedRef<Comment[]> = computed<Comment[]>(() => Provider.store.getters['comments/comments']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['admin/applicationsCount']('comments'));
    const searchString: Ref<string> = ref('');
    let sourceSSE: EventSource | undefined = undefined;

    const load = async () => {
      Provider.setSortList(...createSortModels(CommentsSortsLib, Orders.Desc));
      Provider.setSortModels(CommentsSortsLib.byPublishedOn(Orders.Desc));
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заявления на посещение',
        buttons: [],
        applicationsCount,
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'comments', action: 'getAll' },
    });

    const loadComments = async () => {
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    onBeforeUnmount(async () => {
      sourceSSE?.close();
      // await Provider.store.dispatch('comments/unsubscribeCreate');
    });

    const createFilterModels = (): FilterModel[] => {
      return [CommentsFiltersLib.onlyNewsComments(), CommentsFiltersLib.onlyDoctorsComments(), CommentsFiltersLib.onlyDivisionsComments()];
    };

    return {
      comments,
      mounted: Provider.mounted,
      Comment,
      searchString,
      loadComments,
      load,
      Operators,
      DataTypes,
      sortList: Provider.sortList,
      createFilterModels,
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
