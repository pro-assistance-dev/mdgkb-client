<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <div class="left-side-container">
          <ModeButtons
            :store-mode="false"
            :store-module="'comments'"
            :first-mode="'Faq'"
            :second-mode="'Вопрос-ответ'"
            @changeMode="setFaqMode"
          />
        </div>
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <RemoteSearch />
        <FAQ v-if="faqMode" />
        <Questions v-else />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import FAQ from '@/components/Questions/FAQ.vue';
import Questions from '@/components/Questions/Questions.vue';

export default defineComponent({
  name: 'QuestionsAnswersPage',

  components: { FAQ, Questions, ModeButtons, RemoteSearch },

  setup() {
    const pageTitle: Ref<string> = ref('Часто задаваемые вопросы');
    const faqMode: Ref<boolean> = ref(false);
    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    const setFaqMode = (faqModeCondition: boolean) => {
      faqMode.value = faqModeCondition;
    };

    return {
      setFaqMode,
      faqMode,
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
