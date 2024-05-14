<template>
  <PageWrapper :title="title">
    <template #filters>
      <FiltersWrapper :header-right-max-width="300">
        <template #header-right>
          <ModeButtons :store-mode="false" :store-module="'comments'" :first-mode="'FAQ'" :second-mode="'Вопрос-ответ'"
            @changeMode="setFaqMode" />
        </template>
        <template #header-left-top>
          <div>
            <button @click="openQuestion">Задать вопрос</button>
          </div>
        </template>
      </FiltersWrapper>
    </template>
    <div style="width: 100%">
      <FAQ v-if="faqMode" />
      <Questions v-else />
    </div>
    <QuestionForm :opened="opened" />
  </PageWrapper>
</template>

<script lang="ts" setup>
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import FAQ from '@/components/Questions/FAQ.vue';
import QuestionForm from '@/components/Questions/QuestionForm.vue';
import Questions from '@/components/Questions/Questions.vue';

const faqMode: Ref<boolean> = ref(true);
const opened: Ref<boolean> = ref(false);
const title: ComputedRef<string> = computed(() => (faqMode.value ? 'Часто задаваемые вопросы' : 'Вопросы и ответы'));

const setFaqMode = (faqModeCondition: boolean) => {
  faqMode.value = faqModeCondition;
};
const openQuestion = () => opened.value = !opened.value;
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$side-cotainer-max-width: 300px;

.ques-answ-container {
  display: flex;

  &-left {
    margin-right: 30px;
    flex-shrink: 0;
    width: 300px;
    position: sticky;
    top: 79px;
    height: 100%;
  }

  &-right {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

button {
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
