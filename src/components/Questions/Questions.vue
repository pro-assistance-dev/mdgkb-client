<template>
  <div class="header-center">
    <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти вопрос" size="large" />
    <el-button type="success" @click="openQuestion">Задать вопрос</el-button>
  </div>
  <template v-for="item in questionsList" :key="item.id">
    <QuestionCard :question="item.question" :answer="item.answer" :date="item.date" />
  </template>
  <QuestionForm />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import QuestionCard from '@/components/Questions/QuestionCard.vue';
import QuestionForm from '@/components/Questions/QuestionForm.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'Questions',
  components: { QuestionForm, QuestionCard },
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

    return {
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
.collapse {
  margin-top: 10px;
}

.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
.header-center {
  display: flex;
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
</style>
