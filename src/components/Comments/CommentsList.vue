<template>
  <div v-if="mount">
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <ModeButtons :store-mode="false" :first-mode="'Положительные'" :second-mode="'Отрицательные'" @changeMode="loadComments" />
          <!--          <NewsCalendar />-->
          <!--          <NewsFilters />-->
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <RemoteSearch />
        <div v-for="comment in comments" :key="comment.id">
          {{ comment.text }}
          <br />
          <br />
          <br />
        </div>
        <LoadMoreButton @loadMore="loadMore" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import RemoteSearch from '@/components/admin/RemoteSearch.vue';
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
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const comments: Ref<IComment[]> = computed<IComment[]>(() => store.getters['comments/comments']);
    const mount = ref(false);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

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
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
</style>
