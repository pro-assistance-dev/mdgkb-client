<template>
  <div class="ques-answ-container">
    <div class="ques-answ-container-left">
      <ModeButtons
        :store-mode="false"
        :store-module="'comments'"
        :first-mode="'Faq'"
        :second-mode="'Вопрос-ответ'"
        @changeMode="setFaqMode"
      />
      <button @click="openQuestion">Задать вопрос</button>
    </div>
    <div class="ques-answ-container-right">
      <FAQ v-if="faqMode" />
      <Questions v-else />
    </div>
  </div>
  <QuestionForm />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ModeButtons from '@/components/ModeButtons.vue';
import FAQ from '@/components/Questions/FAQ.vue';
import QuestionForm from '@/components/Questions/QuestionForm.vue';
import Questions from '@/components/Questions/Questions.vue';

export default defineComponent({
  name: 'QuestionsAnswersPage',

  components: { FAQ, Questions, ModeButtons, QuestionForm },

  setup() {
    const store = useStore();
    const pageTitle: Ref<string> = ref('Часто задаваемые вопросы');
    const faqMode: Ref<boolean> = ref(true);
    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    const setFaqMode = (faqModeCondition: boolean) => {
      faqMode.value = faqModeCondition;
    };
    const openQuestion = () => store.commit('questions/openQuestion');

    return {
      setFaqMode,
      faqMode,
      test,
      pageTitle,
      openQuestion,
    };
  },
});
</script>

<style lang="scss" scoped>
$side-cotainer-max-width: 300px;
.ques-answ-container {
  display: flex;
  &-left {
    margin-right: 30px;
    flex-shrink: 0;
    width: 300px;
  }
  &-right {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
button {
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  background-color: #2754ec;
  padding: 15px 25px;
  width: 100%;
  height: auto;
  color: white;
  border: 1px solid rgb(black, 0.05);
  &:hover {
    cursor: pointer;
    background-color: darken(#2754ec, 10%);
  }
}

@media only screen and (max-width: 1024px) {
  .ques-answ-container {
    flex-direction: column;
  }
}
</style>
