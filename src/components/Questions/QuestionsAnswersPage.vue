<template>
  <PageWrapper :title="title">
    <template #filters>
      <FiltersWrapper :header-right-max-width="300">
        <template #header-right>
          <ModeButtons
            :store-mode="false"
            :store-module="'comments'"
            :first-mode="'FAQ'"
            :second-mode="'Вопрос-ответ'"
            @change-mode="setFaqMode"
          />
        </template>
      </FiltersWrapper>
    </template>
    <div style="width: 100%">
      <FAQComponent v-if="faqMode" />
      <QuestionsComponent v-else />
    </div>
    <RightSliderContainer title-open="Скрыть форму" title-close="Задать вопрос" slider-on-width="320px">
      <template #header>
        <StringItem string="Задать вопрос" font-size="16px" padding="0" color="#343E5C" />
      </template>
      <QuestionForm />
    </RightSliderContainer>
    <!-- <QuestionForm :opened="opened" /> -->
  </PageWrapper>
</template>

<script lang="ts" setup>
const faqMode: Ref<boolean> = ref(true);
// const opened: Ref<boolean> = ref(false);
const title: ComputedRef<string> = computed(() => (faqMode.value ? 'Часто задаваемые вопросы' : 'Вопросы и ответы'));

const setFaqMode = (faqModeCondition: boolean) => {
  faqMode.value = faqModeCondition;
};
// const openQuestion = () => (opened.value = !opened.value);
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
