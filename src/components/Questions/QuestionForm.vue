<template>
  <el-dialog v-model="question.isOpened" title="Задать вопрос" width="80%">
    <div class="contact-form">
      <el-form ref="form" :model="question" :rules="rules" label-position="top">
        <!-- <el-form-item
          v-if="!user?.human?.name"
          prop="user.human.name"
          :rules="[{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }]"
          label="Ваше имя"
        >
          <el-input v-model="user.human.name" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
        </el-form-item> -->
        <!--         
        <el-form-item label="Ваш email">
          <el-input v-model="question.userEmail" placeholder="Адрес электронной почты" minlength="1"></el-input>
        </el-form-item>
         -->
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
            :autosize="{ minRows: 5, maxRows: 10 }"
          />
        </el-form-item>
        <div class="flex-column">
          <el-checkbox v-model="question.publishAgreement">
            Я не против публичного размещения моего обращения на сайте морозовской детской больницы
          </el-checkbox>
          <div class="publish-comment">
            <div>Ваш вопрос может помочь другим людям.</div>
            <div>При размещении будет убрана личная информация, с целью сохранения конфеденцальности.</div>
          </div>
          <el-form-item prop="agreedWithPrivacyPolicy">
            <el-checkbox v-model="question.agreedWithPrivacyPolicy" label="Я согласен на обработку своих персональных данных" />
          </el-form-item>
        </div>
        <div class="right-button">
          <el-button type="success" @click="sendQuestion()">Отправить</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/IUser';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'QuestionForm',
  components: {},
  setup() {
    const filter = ref('');
    const store = useStore();
    const form = ref();
    const mounted = ref(false);
    const question: Ref<IQuestion> = computed(() => store.getters['questions/question']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);

    const privacyRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value) {
        callback(new Error('Необходимо принять условия обработки персональных данных'));
      }
      callback();
      return;
    };
    const rules = {
      theme: [{ required: true, message: 'Необходимо указать тему вопроса', trigger: 'blur' }],
      originalQuestion: [{ required: true, message: 'Необходимо заполнить содержание обращения', trigger: 'blur' }],
      agreedWithPrivacyPolicy: [{ validator: privacyRule, trigger: 'change' }],
    };

    const sendQuestion = async () => {
      if (!validate(form)) {
        return;
      }
      await store.dispatch('questions/create', question.value);
      store.commit('questions/resetQuestion');
    };

    return {
      mounted,
      sendQuestion,
      question,
      filter,
      rules,
      form,
      user,
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
.flex-column {
  display: flex;
  flex-direction: column;
}
.publish-comment {
  margin-left: 25px;
  font-style: italic;
}
</style>
