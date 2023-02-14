<template>
  <div class="wrapper">
    <el-form ref="form" :key="question" :rules="rules" :model="question" label-position="top">
      <div class="flex-column">
        <el-card>
          <template #header>
            <div class="info-header">
              <span>Информация о пользователе</span>
              <AdminQuestionStatus :question="question" />
            </div>
          </template>
          <div>
            <span><b>ФИО заявителя: </b></span>
            <span>{{ question.user?.human?.getFullName() }}</span>
          </div>
          <div>
            <span><b>Email: </b></span>
            <!-- <span>{{ question.user?.email }}</span> -->
          </div>
          <div>
            <span><b>Дата обращения: </b></span>
            <span>{{
              $dateTimeFormatter.format(question.date, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              })
            }}</span>
          </div>
          <div>
            <span><b>Тема вопроса: </b></span>
            <span>{{ question.theme }}</span>
          </div>
          <div>
            <span><b>Содержание обращения: </b></span>
            <div style="white-space: pre-line">{{ question.originalQuestion }}</div>
          </div>
          <div>
            <span><b>Файл к вопросу: </b></span>
            <a :href="question.file.getFileUrl()" target="_blank">
              {{ question.file.originalName }}
            </a>
          </div>
          <div v-if="question.answered">
            <span><b>Ответ: </b></span>
            <div style="white-space: pre-line">{{ question.originalAnswer }}</div>
          </div>
        </el-card>

        <el-card v-if="!question.answered" header="Ответ пользователю">
          <el-form-item prop="originalAnswer">
            <WysiwygEditor v-model="question.originalAnswer" />
          </el-form-item>
        </el-card>

        <el-card v-if="question.publishAgreement" header="Публикация">
          <el-form-item label="Вопрос для публикации" prop="question">
            <el-input
              v-model="question.question"
              placeholder="Вопрос для публикации"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="Ответ для публикации" prop="answer">
            <WysiwygEditor v-model="question.answer" />
          </el-form-item>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import AdminQuestionStatus from '@/components/admin/AdminQuestions/AdminQuestionStatus.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IQuestion from '@/interfaces/IQuestion';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminQuestionPage',
  components: { AdminQuestionStatus, WysiwygEditor },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const form = ref();
    const question: Ref<IQuestion> = computed<IQuestion>(() => store.getters['questions/item']);
    const { confirmLeave, saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const rules = {
      question: [{ required: true, message: 'Необходимо указать вопрос для публикации', trigger: 'blur' }],
      answer: [{ required: true, message: 'Необходимо указать ответ для публикации', trigger: 'blur' }],
    };

    const save = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      await store.dispatch('questions/update', question.value);
      next ? next() : router.push('/admin/questions');
      ElMessage({
        type: 'info',
        message: 'Изменения сохранены',
      });
      store.commit('questions/resetQuestion');
    };

    const update = async () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      if (!question.value.answered && !question.value.publishAgreement) {
        question.value.answered = true;
        await store.dispatch('questions/update', question.value);
      } else {
        question.value.answered = true;
        question.value.published = !question.value.published;
        await store.dispatch('questions/update', question.value);
      }
      router.push('/admin/questions');
      store.commit('questions/resetQuestion');
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('questions/get', route.params['id']);
      if (question.value.isNew) {
        question.value.changeNewStatus();
        store.dispatch('questions/changeNewStatus', question.value);
      }
      store.commit('admin/setHeaderParams', {
        title: 'Ответить на вопрос',
        showBackButton: true,
        buttons: [
          { text: 'Сохранить и выйти', type: 'primary', action: save, condition: confirmLeave },
          {
            text: question.value.getUpdateButtonText(),
            type: question.value.getUpdateButtonType(),
            action: update,
            condition: question.value.getUpdateCondition(),
          },
        ],
      });
      // question.value.isNew = false;
      mounted.value = true;
      store.commit('admin/closeLoading');
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(question, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(save, next);
    });

    return {
      mounted,
      question,
      form,
      rules,
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
.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
