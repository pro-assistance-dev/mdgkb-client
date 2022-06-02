<template>
  <div v-for="item in questionsList" :key="item.id" class="card-item">
    <CommentCard :is-question="true" :question="item" />
  </div>
  <LoadMoreButton @loadMore="loadMore" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'Questions',
  components: { LoadMoreButton, CommentCard },
  async setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const questions: Ref<IQuestion[]> = computed(() => store.getters['questions/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const questionsList = computed((): IQuestion[] => {
      if (filter.value) {
        return questions.value.filter((o: IQuestion) => {
          return (
            o.question.toLowerCase().includes(filter.value.toLowerCase()) || o.answer.toLowerCase().includes(filter.value.toLowerCase())
          );
        });
      } else {
        return questions.value;
      }
    });

    const activeName = ref(1);

    onBeforeMount(async () => {
      store.commit('filter/setStoreModule', 'questions');
      await store.dispatch('questions/getAll', filterQuery.value);
    });

    const openQuestion = () => store.commit('questions/openQuestion');

    const loadMore = async () => {
      const lastDate = questions.value[questions.value.length - 1].date;
      filterQuery.value.pagination.cursor.value = lastDate;
      filterQuery.value.pagination.cursor.initial = false;
      await store.dispatch('questions/getAll', filterQuery.value);
    };

    return {
      loadMore,
      openQuestion,
      filePath,
      questions,
      questionsList,
      activeName,
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
.header-center {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-left: 10px;
  }
}
h1 {
  font-size: 24px;
}
.el-card {
  margin-top: 10px;
}
.card-item {
  margin-bottom: 20px;
}
h2 {
  margin-top: 0;
  font-size: 24px;
  text-align: center;
}
</style>
