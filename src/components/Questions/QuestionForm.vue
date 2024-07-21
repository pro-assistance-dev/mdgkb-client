<template>
  <div class="contact-form">
    <el-form ref="form" :model="question" :rules="rules" label-position="top">
      <el-form-item
        prop="user.human.name"
        :rules="[{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }]"
        label="Ваше имя"
      >
        <el-input v-model="question.user.human.name" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item
        prop="user.human.surname"
        :rules="[{ required: true, message: 'Необходимо указать фамилию', trigger: 'blur' }]"
        label="Ваша фамилия"
      >
        <el-input v-model="question.user.human.surname" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item
        prop="user.human.patronymic"
        :rules="[{ required: true, message: 'Необходимо указать отчество', trigger: 'blur' }]"
        label="Ваше отчество"
      >
        <el-input v-model="question.user.human.patronymic" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
      </el-form-item>

      <el-form-item prop="user.email" :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]" label="Ваш email">
        <el-input v-model="question.user.email" placeholder="Адрес электронной почты" minlength="1"></el-input>
      </el-form-item>

      <el-form-item label="Тема вопроса" prop="theme">
        <el-input v-model="question.theme" placeholder="Тема вопроса" minlength="1" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="Содержание обращения" prop="originalQuestion">
        <el-input
          v-model="question.originalQuestion"
          type="textarea"
          placeholder="Содержание обращения"
          minlength="5"
          maxlength="1000"
          show-word-limit
          :autosize="{ minRows: 5, maxRows: 5 }"
        />
      </el-form-item>
      <div class="flex-column">
        <el-form-item prop="publishAgreement">
          <el-checkbox v-model="question.publishAgreement">
            Я не против публичного размеще-<br />ния моего обращения на сайте<br />
            морозовской детской больницы.
          </el-checkbox>
        </el-form-item>
        <el-form-item prop="agreedWithPrivacyPolicy">
          <el-checkbox v-model="question.agreedWithPrivacyPolicy">
            Я согласен на обработку своих <br />
            персональных данных
          </el-checkbox>
        </el-form-item>
        <div class="publish-comment">
          <div>Ваш вопрос может помочь другим людям.</div>
          <div>При размещении будет убрана личная информация, с целью сохранения конфеденцальности.</div>
        </div>
      </div>
      <FileUploader :file-info="question.file" />
      <div class="right-button">
        <el-button type="success" @click="sendQuestion()">Отправить</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import Question from '@/classes/Question';
import FileUploader from '@/components/FileUploader.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import validate from '@/services/validate';

const form = ref();
const question: Question = QuestionsStore.Item();
const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
});
const open = ref(false);
const emits = defineEmits(['close']);
watch(
  () => props.opened,
  () => {
    open.value = !open.value;
  }
);
// watch(user, () => {
//   store.commit('questions/setUser', user.value);
// });

const privacyRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
  if (!value) {
    callback(new Error('Необходимо принять условия обработки персональных данных'));
  }
  callback();
  return;
};

const publishRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
  if (!value) {
    callback(new Error('Необходимо принять условия публикации вопроса на сайте'));
  }
  callback();
  return;
};
const rules = {
  theme: [{ required: true, message: 'Необходимо указать тему вопроса', trigger: 'blur' }],
  originalQuestion: [{ required: true, message: 'Необходимо заполнить содержание обращения', trigger: 'blur' }],
  agreedWithPrivacyPolicy: [{ validator: privacyRule, trigger: 'change' }],
  publishAgreement: [{ validator: publishRule, trigger: 'change' }],
};

const sendQuestion = async () => {
  if (!validate(form)) {
    return;
  }
  try {
    await QuestionsStore.Create();
    QuestionsStore.ResetItem();
    emits('close');
    PHelp.Notification.Success('Спасибо за вопрос.\nМы ответим Вам в ближайшее время');
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

:deep(.el-drawer__header) {
  margin: 0;
}

.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.publish-comment {
  margin: 10px 0;
  font-style: italic;
  font-size: 12px;
}

:deep(.el-drawer) {
  overflow-y: auto;
  width: 500px !important;
}

:deep(.el-checkbox__inner) {
  width: 18px;
  height: 18px;
  border: 2px solid #b5b5b5;
}

:deep(.el-checkbox__inner::after) {
  height: 10px;
  width: 6px;
  top: 0px;
}

:deep(.el-checkbox__label) {
  display: block !important;
  word-wrap: break-word !important;
}

@media screen and (max-width: 768px) {
  :deep(.el-drawer) {
    width: 100% !important;
  }
}

div {
  font-size: 14px;
}
</style>
