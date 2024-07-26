<template>
  <div v-for="item in questionsList" :key="item.id" class="card-item">
    <CommentCard :is-question="true" :question="item" />
  </div>
  <LoadMoreButton @load-more="loadMore" />
</template>

<script lang="ts" setup>
import Question from '@/classes/Question';
import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/libs/sorts/QuestionsSortsLib';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

const filter = ref('');
const questions: Question[] = QuestionsStore.Items();

const questionsList = computed((): Question[] => {
  if (filter.value) {
    return questions.filter((o: Question) => {
      return o.question.toLowerCase().includes(filter.value.toLowerCase()) || o.answer.toLowerCase().includes(filter.value.toLowerCase());
    });
  } else {
    return questions;
  }
});

const load = async () => {
  FTSP.Get().setS(QuestionsSortsLib.byDate(Orders.Desc));
  FTSP.Get().setF(QuestionsFiltersLib.onlyPublished());
  FTSP.Get().p.append = false;
  await QuestionsStore.FTSP();
};

Hooks.onBeforeMount(load);

const loadMore = async () => {
  FTSP.Get().p.offset = questions.length;
  await QuestionsStore.FTSP();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
