<template>
  <div v-for="item in questionsList" :key="item.id" class="card-item">
    <CommentCard :is-question="true" :question="item" />
  </div>
  <LoadMoreButton @loadMore="loadMore" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IQuestion from '@/interfaces/IQuestion';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import QuestionsFiltersLib from '@/services/Provider/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/services/Provider/libs/sorts/QuestionsSortsLib';

export default defineComponent({
  name: 'Questions',
  components: { LoadMoreButton, CommentCard },
  async setup() {
    const filter = ref('');
    const filePath = ref('');
    const questions: Ref<IQuestion[]> = computed(() => Provider.store.getters['questions/items']);

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
