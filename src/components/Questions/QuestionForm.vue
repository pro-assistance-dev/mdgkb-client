<template>
  <el-dialog v-model="question.isOpened" title="Задать вопрос" width="80%">
    <div class="contact-form">
      <el-form v-model="question">
        <el-form-item label="Вопрос">
          <el-input v-model="question.originalQuestion" type="textarea"></el-input>
        </el-form-item>
        <div class="right-button">
          <el-button type="success" @click="sendQuestion()">Откликнуться</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IQuestion from '@/interfaces/IQuestion';

export default defineComponent({
  name: 'QuestionForm',
  components: {},
  setup() {
    const filter = ref('');
    const store = useStore();
    const mounted = ref(false);
    const question: Ref<IQuestion> = computed(() => store.getters['questions/question']);

    const sendQuestion = async () => {
      await store.dispatch('questions/create', question.value);
      store.commit('questions/resetQuestion');
    };

    return {
      mounted,
      sendQuestion,
      question,
      filter,
    };
  },
});
</script>

<style lang="scss" scoped>
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
