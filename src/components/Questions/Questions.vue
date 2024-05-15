<template>
  <div v-for="item in questionsList" :key="item.id" class="card-item">
    <CommentCard :is-question="true" :question="item" />
  </div>
  <LoadMoreButton @loadMore="loadMore" />
</template>

<script lang="ts" setup>
import Question from '@/classes/Question';
import CommentCard from '@/components/Comments/CommentCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import QuestionsFiltersLib from '@/libs/filters/QuestionsFiltersLib';
import QuestionsSortsLib from '@/libs/sorts/QuestionsSortsLib';
import Provider from '@/services/Provider/Provider';

const filter = ref('');
const filePath = ref('');
const questions: Ref<Question[]> = Store.Items('questions')

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
  FTSP.Get().setS(QuestionsSortsLib.byDate(Orders.Desc))
  FTSP.Get().setF(QuestionsFiltersLib.onlyPublished())
  FTSP.Get().p.append = false;
  await Store.FTSP('questions');
};

Hooks.onBeforeMount(load);

const openQuestion = () => Store.Commit('questions/openQuestion');

const loadMore = async () => {
  FTSP.Get().p.offset = questions.value.length
  await Store.FTSP('questions');
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
