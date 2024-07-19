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

<script lang="ts" setup>
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import Question from '@/classes/Question';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

const mounted: Ref<boolean> = ref(false);
const form = ref();
const question: Question = QuestionsStore.Item();
const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
const rules = {
  question: [{ required: true, message: 'Необходимо указать вопрос для публикации', trigger: 'blur' }],
  answer: [{ required: true, message: 'Необходимо указать ответ для публикации', trigger: 'blur' }],
};

const save = async (next?: NavigationGuardNext) => {
  saveButtonClick.value = true;
  await QuestionsStore.Update();
  next ? next() : Router.To('/admin/questions');
  PHelp.Notification.Success('Изменения сохранены');
  QuestionsStore.ResetItem();
};

const update = async () => {
  saveButtonClick.value = true;
  if (!validate(form)) {
    saveButtonClick.value = false;
    return;
  }
  if (!question.answered && !question.publishAgreement) {
    question.answered = true;
    await QuestionsStore.Update();
  } else {
    question.answered = true;
    question.published = !question.published;
    await QuestionsStore.Update();
  }
  Router.To('/admin/questions');
  QuestionsStore.ResetItem();
};

onBeforeMount(async () => {
  await QuestionsStore.Get(Router.Id());
  if (question.isNew) {
    question.changeNewStatus();
    QuestionsStore.ChangeNewStatus(question);
  }
  PHelp.AdminUI.Head.Set('Ответить на вопрос', [
    Button.Success('Сохранить и выйти', save),
    Button.Success(question.getUpdateButtonText(), update, question.getUpdateCondition()),
  ]);
  // question.isNew = false;
  mounted.value = true;
  window.addEventListener('beforeunload', beforeWindowUnload);
  watch(question, formUpdated, { deep: true });
});

onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showConfirmModal(save, next);
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.wrapper {
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

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
