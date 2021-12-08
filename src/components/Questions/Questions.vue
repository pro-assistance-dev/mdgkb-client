<template>
  <div class="header-center">
    <el-button type="success" @click="openQuestion">Задать вопрос</el-button>
  </div>
  <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти вопрос" size="large" />
  <div v-for="question in questionsList" :key="question.id">
    <el-descriptions :column="1" border direction="horizontal" class="contact-form">
      <el-descriptions-item label="Вопрос">
        {{ question.question }}
      </el-descriptions-item>
      <el-descriptions-item label="Ответ">
        {{ question.answer }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <QuestionForm />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import QuestionForm from '@/components/Questions/QuestionForm.vue';
import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'Questions',
  components: { QuestionForm },
  async setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const questions: Ref<IQuestion[]> = computed(() => store.getters['questions/items']);

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
      await store.dispatch('questions/getAll', true);
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

h1 {
  font-size: 24px;
}
</style>
