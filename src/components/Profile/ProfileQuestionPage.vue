<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Ответы на ваши вопросы</h3></template>
    <template v-for="item in userQuestions" :key="item.id">
      <QuestionCard :question="item.originalQuestion" :answer="item.originalAnswer" :date="item.date" />
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import Question from '@/classes/Question';

const store = useStore();
const mounted = ref(false);
const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
const userQuestions: ComputedRef<Question[]> = computed(() => {
  const user = UsersStore.Item();
  return user.questions.sort((a: Question, b: Question) => b.date.getTime() - a.date.getTime());
});

const loadUser = async () => {
  await UsersStore.Get(userId.value);
  await QuestionsStore.ReadAnswers(userId.value);
  mounted.value = true;
};
onMounted(loadUser);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-card {
  margin-bottom: 10px;
}
</style>
