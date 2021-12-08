<template>
  <div class="wrapper">
    <el-form ref="form" :key="question" :model="question" label-position="top">
      <div class="flex-column">
        <el-card header="Информация о пользователе">
          <div>
            <span><b>Имя: </b></span>
            <span>{{ question.user?.human?.name }}</span>
          </div>
          <div>
            <span><b>Email: </b></span>
            <span>{{ question.user.email }}</span>
          </div>
          <div>
            <span><b>Тема вопроса: </b></span>
            <span>{{ question.theme }}</span>
          </div>
          <div>
            <span><b>Содержание обращения: </b></span>
            <span>{{ question.originalQuestion }}</span>
          </div>
        </el-card>
        <el-card header="Ответ пользователю">
          <el-form-item>
            <el-input v-model="question.originalAnswer" placeholder="Ответ пользователю" type="textarea"></el-input>
          </el-form-item>
        </el-card>
        <el-card header="Публикация">
          <el-form-item label="Вопрос для публикации">
            <el-input v-model="question.question" placeholder="Вопрос для публикации" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Ответ для публикации">
            <el-input v-model="question.answer" placeholder="Ответ для публикации" type="textarea"></el-input>
          </el-form-item>
        </el-card>
      </div>
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
    const mounted: Ref<boolean> = ref(false);
    const form = ref();
    const question: Ref<IQuestion> = computed<IQuestion>(() => store.getters['questions/item']);
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      await store.dispatch('questions/update', question.value);
      next ? next() : await router.push('/admin/questions');
      store.commit('questions/resetQuestion');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);

      await store.dispatch('questions/get', route.params['id']);
      store.commit('admin/setPageTitle', { title: 'Ответить на вопрос', saveButton: true });
      // question.value.isNew = false;
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(question, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

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
.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  font-size: 14px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
