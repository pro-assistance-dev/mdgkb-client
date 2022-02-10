<template>
  <div v-if="mount" class="comments-list-container">
    <div class="comments-list-container-left card-item">
      <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" @changeMode="loadComments" />
      <button class="leave-review-button" @click="isAuth ? (showDialog = true) : openLoginModal()">Оставить отзыв</button>
      <router-link to="/service-quality-assessment">Независимая оценка качества оказания услуг</router-link>
      <FilterCheckbox
        label="Свои отзывы"
        :table="schema.comments.tableName"
        :col="schema.comments.userId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        :value="TokenService.getUserId()"
        @load="loadCommentsWithoutMode"
      />
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
    <CommentForm store-module="comments" :with-rating="false" :from-dialog="true" @closeDialog="showDialog = false" />
    <!-- <template #footer>
      <button>Отправить отзыв</button>
    </template> -->
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import CommentCard from '@/components/Comments/CommentCard.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import IComment from '@/interfaces/comments/IComment';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import { Operators } from '@/interfaces/filters/Operators';
import ISchema from '@/interfaces/schema/ISchema';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'CommentsList',
  components: {
    ModeButtons,
    RemoteSearch,
    LoadMoreButton,
    CommentCard,
    FilterCheckbox,
    CommentForm,
  },

  setup() {
    const store = useStore();
    const comments: Ref<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);
    const mount = ref(false);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const showDialog: Ref<boolean> = ref(false);
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const openLoginModal = () => {
      if (!isAuth.value) {
        store.commit('auth/openModal', true);
      }
    };

    onBeforeMount(async () => {
      await store.dispatch('meta/getSchema');
      await loadComments(true);
      mount.value = true;
    });

    const loadComments = async (positiveMode: boolean) => {
      setPositiveMode(positiveMode);
      await store.dispatch('comments/getAll', filterQuery.value);
    };

    const loadCommentsWithoutMode = async () => {
      await store.dispatch('comments/getAll', filterQuery.value);
    };

    const loadMore = async () => {
      const lastCursor = comments.value[comments.value.length - 1].publishedOn;
      filterQuery.value.pagination.cursor.value = lastCursor;
      filterQuery.value.pagination.cursor.initial = false;
      filterQuery.value.pagination.cursorMode = true;
      await store.dispatch('comments/getAll', filterQuery.value);
    };

    const setPositiveMode = (positiveMode: boolean) => {
      const filterModel = FilterModel.CreateFilterModel(schema.value.comments.tableName, schema.value.comments.positive, DataTypes.String);
      filterModel.operator = Operators.Eq;
      filterModel.value1 = String(positiveMode);
      filterQuery.value.filterModels = [];
      filterQuery.value.filterModels.push(filterModel);
      filterQuery.value.pagination.cursorMode = false;
    };

    return {
      loadCommentsWithoutMode,
      TokenService,
      Operators,
      DataTypes,
      schema,
      loadComments,
      setPositiveMode,
      loadMore,
      comments,
      mount,
      showDialog,
      openLoginModal,
      isAuth,
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
