<template>
  <div v-for="item in questionsList" :key="item.id" class="card-item">
    <CommentCard :is-question="true" :question="item" />
  </div>
  <LoadMoreButton @loadMore="loadMore" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Question from '@/classes/Question';
import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/libs/sorts/QuestionsSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'Questions',
  components: { LoadMoreButton, CommentCard },
  async setup() {
    const filter = ref('');
    const filePath = ref('');
    const questions: Ref<Question[]> = computed(() => Provider.store.getters['questions/items']);

    const questionsList = computed((): Question[] => {
      if (filter.value) {
        return questions.value.filter((o: Question) => {
          return (
            o.question.toLowerCase().includes(filter.value.toLowerCase()) || o.answer.toLowerCase().includes(filter.value.toLowerCase())
          );
        });
      } else {
        return questions.value;
      }
    });

    const activeName = ref(1);

    const load = async () => {
      Provider.filterQuery.value.pagination.append = false;
      Provider.store.commit('filter/setStoreModule', 'questions');
      Provider.setFilterModels(QuestionsFiltersLib.onlyPublished());
      Provider.setSortModels(QuestionsSortsLib.byDate(Orders.Desc));
      await Provider.getAll('questions');
    };

    Hooks.onBeforeMount(load);

    const openQuestion = () => Provider.store.commit('questions/openQuestion');

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.offset = questions.value.length;
      Provider.filterQuery.value.pagination.append = true;
      await Provider.getAll('questions');
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
