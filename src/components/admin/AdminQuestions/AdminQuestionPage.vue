<template>
  <div class="wrapper">
    <el-form ref="form" :key="question" :model="question">
      <el-container direction="vertical">
        <el-form-item label="Вопрос пользователя">
          <el-input v-model="question.originalQuestion" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Ответ пользователю">
          <el-input v-model="question.answer" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="Вопрос для отображения">
          <el-input v-model="question.question" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="Ответ для отображения">
          <el-input v-model="question.answer" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-check" type="success" @click="question.published = !question.published"></el-button>
        </el-form-item>
      </el-container>
    </el-form>
  </div>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IQuestion from '@/interfaces/IQuestion';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminQuestionPage',
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let mounted = ref(false);
    const form = ref();
    const question: Ref<IQuestion> = computed<IQuestion>(() => store.getters['questions/question']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await store.dispatch('divisions/getAll', false);

      store.commit('admin/setPageTitle', { title: 'Вопрос', saveButton: true });
      store.commit('questions/resetState');
      question.value.isNew = false;
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(question, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      await store.dispatch('questions/update', question.value);
      next ? next() : await router.push('/admin/questions');
    };

    return {
      mounted,
      submit,
      question,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
