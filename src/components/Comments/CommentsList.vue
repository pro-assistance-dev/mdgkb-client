<template>
  <PageWrapper v-if="mounted" title="Комментарии и отзывы">
    <template #filters>
      <FiltersWrapper>
        <template #header-right>
          <div :style="{ display: 'flex', flexDirection: 'column' }">
            <button class="leave-review-button" @click="isAuth ? (showDialog = true) : openLoginModal()">Оставить отзыв</button>
            <router-link to="/service-quality-assessment" style="text-align: center"
              >Независимая оценка качества оказания услуг</router-link
            >
          </div>
          <!--      <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" @changeMode="loadComments" />-->
        </template>
        <template #header-left-bottom>
          <FilterCheckbox
            label="Свои отзывы"
            :table="schema.comment.tableName"
            :col="schema.comment.userId"
            :data-type="DataTypes.String"
            :operator="Operators.Eq"
            :filter-value="TokenService.getUserId()"
            @load="loadComments"
          />

          <FilterCheckbox
            label="С высоким рейтингом"
            :table="schema.comment.tableName"
            :col="schema.comment.rating"
            :data-type="DataTypes.Number"
            :operator="Operators.Gt"
            :filter-value="'3'"
            @load="loadComments"
          />
          <FilterCheckbox
            label="С низким рейтингом"
            :table="schema.comment.tableName"
            :col="schema.comment.rating"
            :data-type="DataTypes.Number"
            :operator="Operators.Lt"
            :filter-value="'3'"
            @load="loadComments"
          />
        </template>
        <template #header-left-top>
          <FilterSelectDate :table="schema.comment.tableName" :col="schema.comment.publishedOn" @load="loadComments" />
        </template>
      </FiltersWrapper>
    </template>
    <div v-for="comment in comments" :key="comment.id" class="card-item">
      <CommentCard :comment="comment" />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </PageWrapper>
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
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PageWrapper from '@/components/PageWrapper.vue';
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
    PageWrapper,
    FiltersWrapper,
  },
  setup() {
    const comments: Ref<IComment[]> = computed<IComment[]>(() => Provider.store.getters['comments/comments']);
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
      Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      await loadComments();
    };

    const loadComments = async () => {
      Provider.filterQuery.value.pagination.allLoaded = false;
      Provider.store.commit('comments/clearComments');
      await Provider.getAll('comments');
    };

    Hooks.onBeforeMount(load);

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.append = true;
      Provider.filterQuery.value.pagination.offset = comments.value.length;
      await Provider.getAll('comments');
    };

    return {
      TokenService,
      Operators,
      DataTypes,
      loadComments,
      loadMore,
      comments,
      showDialog,
      openLoginModal,
      isAuth,
      mounted: Provider.mounted,
      schema: Provider.schema,
    };
  },
});
</script>

<style scoped lang="scss">
.leave-review-button {
  // width: 100%;
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
  width: 100%;
  margin: 0 20px 20px 20px;
  padding-right: 30px;
}

:deep(.el-dialog__title) {
  font-weight: bold;
}
h3 {
  margin: 0;
  text-align: center;
}

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
