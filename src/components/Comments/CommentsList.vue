<template>
  <div v-if="mount" class="comments-list-container">
    <div class="comments-list-container-left">
      <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" @changeMode="loadComments" />
      <button class="leave-review-button" @click="showDialog = true">Оставить отзыв</button>
    </div>
    <div class="comments-list-container-right">
      <div class="comments-list-container-right-header card-item">
        <h2>Комментарии и отзывы</h2>
        <RemoteSearch />
      </div>
      <div v-for="comment in comments" :key="comment.id" class="card-item">
        <CommentCard :comment="comment" />
      </div>
      <LoadMoreButton @loadMore="loadMore" />
    </div>
  </div>
  <el-dialog v-model="showDialog">
    <template #title>
      <h3>Оставить отзыв</h3>
    </template>
    <template #footer>
      <button>Отправить отзыв</button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import IComment from '@/interfaces/comments/IComment';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Operators } from '@/interfaces/filters/Operators';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'CommentsList',
  components: {
    ModeButtons,
    RemoteSearch,
    LoadMoreButton,
    CommentCard,
  },

  setup() {
    const store = useStore();
    const comments: Ref<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);
    const mount = ref(false);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const showDialog: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      await loadComments(true);
      mount.value = true;
    });

    const loadComments = async (positiveMode: boolean) => {
      setPositiveMode(positiveMode);
      await store.dispatch('comments/getAll', filterQuery.value);
    };

    const loadMore = async () => {
      const lastDate = comments.value[comments.value.length - 1].publishedOn;
      filterQuery.value.pagination.cursor.value = lastDate;
      filterQuery.value.pagination.cursor.initial = false;
      filterQuery.value.pagination.cursorMode = true;
      await store.dispatch('comments/getAll', filterQuery.value);
    };

    const setPositiveMode = (positiveMode: boolean) => {
      const filterModel = FilterModel.CreateFilterModel(
        schema.value.commentsSchema.tableName,
        schema.value.commentsSchema.positive,
        DataTypes.String
      );
      filterModel.operator = Operators.Eq;
      filterModel.value1 = String(positiveMode);
      filterQuery.value.filterModels = [];
      filterQuery.value.filterModels.push(filterModel);
      filterQuery.value.pagination.cursorMode = false;
    };

    return {
      loadComments,
      setPositiveMode,
      loadMore,
      comments,
      mount,
      showDialog,
    };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;

.comments-list-container {
  display: flex;
  &-left {
    max-width: $side-cotainer-max-width;
    margin-right: 30px;
  }
  &-right {
    &-header {
      h2 {
        margin-top: 0;
        font-size: 24px;
        text-align: center;
      }
      margin-top: 10px;
    }
  }
}
.leave-review-button {
  width: 100%;
}
button {
  margin: 10px 0;
  min-width: 230px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  background-color: #2754ec;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgb(black, 0.05);
  &:hover {
    cursor: pointer;
    background-color: darken(#2754ec, 10%);
  }
}

.card-item {
  padding-right: 30px;
  margin-bottom: 20px;
}

:deep(.el-dialog__title) {
  font-weight: bold;
}
h3 {
  margin: 0;
  text-align: center;
}
</style>
