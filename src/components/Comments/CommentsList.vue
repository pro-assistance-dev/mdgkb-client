<template>
  <div v-if="mount" class="comments-list-container">
    <div class="comments-list-container-left">
      <button class="leave-review-button" @click="isAuth ? (showDialog = true) : openLoginModal()">Оставить отзыв</button>
      <!--      <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" @changeMode="loadComments" />-->
      <FilterCheckbox
        label="Свои отзывы"
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.userId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        :value="TokenService.getUserId()"
        @load="loadComments"
      />
      <FilterCheckbox
        label="С высоким рейтингом"
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.rating"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        :filter-value="'3'"
        @load="loadComments"
      />
      <FilterCheckbox
        label="С низким рейтингом"
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.rating"
        :data-type="DataTypes.Number"
        :operator="Operators.Lt"
        :filter-value="'3'"
        @load="loadComments"
      />
      <FilterSelectDate
        :table="Provider.schema.value.comment.tableName"
        :col="Provider.schema.value.comment.publishedOn"
        @load="loadComments"
      />
      <router-link to="/service-quality-assessment">Независимая оценка качества оказания услуг</router-link>
    </div>
    <div class="comments-list-container-right">
      <div class="comments-list-container-right-header card-item">
        <h2>Комментарии и отзывы</h2>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="card-item">
        <CommentCard :comment="comment" />
      </div>
      <div class="loadmore-button">
        <LoadMoreButton @loadMore="loadMore" />
      </div>
    </div>
  </div>
  <el-dialog v-model="showDialog">
    <template #title>
      <h3>Оставить отзыв</h3>
    </template>
    <CommentForm store-module="comments" :with-rating="false" :from-dialog="true" @closeDialog="showDialog = false" />
    <!-- <template #footer>
      <button>Отправить отзыв</button>
    </template> -->
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import CommentCard from '@/components/Comments/CommentCard.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelectDate from '@/components/Filters/FilterSelectDate.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IComment from '@/interfaces/comments/IComment';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import CommentsSortsLib from '@/services/Provider/libs/sorts/CommentsSortsLib';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'CommentsList',
  components: {
    FilterSelectDate,
    LoadMoreButton,
    CommentCard,
    FilterCheckbox,
    CommentForm,
  },

  setup() {
    const comments: Ref<IComment[]> = computed<IComment[]>(() => Provider.store.getters['comments/comments']);
    const mount = ref(false);
    const showDialog: Ref<boolean> = ref(false);
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);

    const openLoginModal = () => {
      if (!isAuth.value) {
        Provider.store.commit('auth/openModal', true);
      }
    };

    const load = async () => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 6;
      Provider.filterQuery.value.pagination.cursorMode = true;
      Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      // Provider.setFilterModels(CommentsFiltersLib.onlyPublished());
      await loadComments();
      mount.value = true;
    };

    Hooks.onBeforeMount(load);

    const loadComments = async () => {
      Provider.store.commit('comments/clearComments');
      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.cursor.value = comments.value[comments.value.length - 1].publishedOn;
      Provider.filterQuery.value.pagination.cursor.operation = Operators.Lt;
      Provider.filterQuery.value.pagination.cursor.column = Provider.schema.value.comment.publishedOn;
      Provider.filterQuery.value.pagination.cursor.initial = false;
      Provider.filterQuery.value.pagination.cursorMode = true;

      await Provider.store.dispatch('comments/getAll', Provider.filterQuery.value);
    };

    return {
      TokenService,
      Operators,
      DataTypes,
      loadComments,
      loadMore,
      comments,
      mount,
      showDialog,
      openLoginModal,
      isAuth,
      Provider,
    };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;

.comments-list-container {
  display: flex;
  &-left {
    height: 100%;
    max-width: $side-cotainer-max-width;
    margin-right: 30px;
    font-size: 14px;
    position: sticky;
    top: 79px;
    height: 100%;
  }
  &-right {
    &-header {
      h2 {
        margin-top: 0;
        font-size: 24px;
        text-align: center;
      }
    }
  }
}
.leave-review-button {
  width: 100%;
  margin-bottom: 20px;
}
button {
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  background-color: #2754ec;
  padding: 15px 25px;
  height: auto;
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

.loadmore-button {
  display: flex;
  justify-content: center;
}
// .loadmore-button {
//   display: flex;
//   justify-content: center;
// }

@media only screen and (max-width: 1024px) {
  .comments-list-container {
    flex-direction: column;
    align-items: center;
    &-left {
      max-width: 100%;
      margin: 0;
    }
    button {
      max-width: 300px;
    }
  }
}
</style>
