<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Ответы на ваши вопросы</h3></template>
    <template v-for="item in userQuestions" :key="item.id">
      <QuestionCard :question="item.originalQuestion" :answer="item.originalAnswer" :date="item.date" />
    </template>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import Question from '@/classes/Question';
import QuestionCard from '@/components/Questions/QuestionCard.vue';

export default defineComponent({
  name: 'ProfileQuestionPage',
  components: { QuestionCard },

  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const userQuestions: ComputedRef<Question[]> = computed(() => {
      const user = store.getters['users/item'];
      return user.questions.sort((a: Question, b: Question) => b.date.getTime() - a.date.getTime());
    });

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
      await store.dispatch('questions/readAnswers', userId.value);
      mounted.value = true;
    };
    onMounted(loadUser);

    return {
      mounted,
      userQuestions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-card {
  margin-bottom: 10px;
}
</style>
