<template>
  <div class="ques-answ-container">
    <h1>{{ pageTitle }}</h1>
    <el-tabs type="border-card" :active-name="pageTitle" :before-leave="test">
      <el-tab-pane label="Часто задаваемые вопросы" name="Часто задаваемые вопросы"><FAQ /></el-tab-pane>
      <el-tab-pane label="Вопросы и ответы" name="Вопросы и ответы"><Questions /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import FAQ from '@/components/Questions/FAQ.vue';
import Questions from '@/components/Questions/Questions.vue';

export default defineComponent({
  name: 'QuestionsAnswersPage',
  components: { FAQ, Questions },

  setup() {
    const pageTitle: Ref<string> = ref('Часто задаваемые вопросы');

    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    return {
      test,
      pageTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 24px;
}
.ques-answ-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
