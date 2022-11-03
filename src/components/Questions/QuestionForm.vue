<template>
  <div>
    <el-drawer v-model="question.isDialogOpened" direction="rtl" title="Задать вопрос">
      <div class="contact-form">
        <el-form ref="form" :model="question" :rules="rules" label-position="top">
          <el-form-item
            v-if="!user?.human?.name"
            prop="user.human.name"
            :rules="[{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }]"
            label="Ваше имя"
          >
            <el-input v-model="question.user.human.name" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item
            v-if="!user?.human?.surname"
            prop="user.human.surname"
            :rules="[{ required: true, message: 'Необходимо указать фамилию', trigger: 'blur' }]"
            label="Ваша фамилия"
          >
            <el-input v-model="question.user.human.surname" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item
            v-if="!user?.human?.patronymic"
            prop="user.human.patronymic"
            :rules="[{ required: true, message: 'Необходимо указать отчество', trigger: 'blur' }]"
            label="Ваше отчество"
          >
            <el-input v-model="question.user.human.patronymic" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
          </el-form-item>

          <el-form-item
            v-if="!user.email"
            prop="user.email"
            :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]"
            label="Ваш email"
          >
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
              :autosize="{ minRows: 5, maxRows: 10 }"
            />
          </el-form-item>
          <el-form-item style="margin: 0">
            <FileUploader :file-info="question.file" />
          </el-form-item>
          <div class="flex-column">
            <el-form-item prop="publishAgreement">
              <el-checkbox v-model="question.publishAgreement">
                Я не против публичного размещения моего обращения<br />
                на сайте морозовской детской больницы
              </el-checkbox>
            </el-form-item>
            <div class="publish-comment">
              <div>Ваш вопрос может помочь другим людям.</div>
              <div>При размещении будет убрана личная информация, с целью сохранения конфеденцальности.</div>
            </div>
            <el-form-item prop="agreedWithPrivacyPolicy">
              <el-checkbox v-model="question.agreedWithPrivacyPolicy"> Я согласен на обработку своих персональных данных </el-checkbox>
            </el-form-item>
          </div>
          <div class="right-button">
            <el-button type="success" @click="sendQuestion()">Отправить</el-button>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useStore } from 'vuex';

import FileUploader from '@/components/FileUploader.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/IUser';
import validate from '@/services/validate';

export default defineComponent({
  name: 'QuestionForm',
  components: { FileUploader },
  setup() {
    const filter = ref('');
    const store = useStore();
    const form = ref();
    const mounted = ref(false);
    const question: Ref<IQuestion> = computed(() => store.getters['questions/question']);
    const user: Ref<IUser> = computed(() => store.getters['auth/user']);
    watch(user, () => {
      store.commit('questions/setUser', user.value);
    });

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

    onMounted(() => {
      store.commit('questions/setUser', user.value);
    });

    const sendQuestion = async () => {
      if (!validate(form)) {
        return;
      }
      try {
        await store.dispatch('questions/create', question.value);
        store.commit('auth/setUser', question.value.user);
        store.commit('questions/resetQuestion');
        question.value.isDialogOpened = false;
      } catch (e) {
        console.log(e);
      }
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
// import { computed, defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
// import { useStore } from 'vuex';

// import FileUploader from '@/components/FileUploader.vue';
// import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
// import IField from '@/interfaces/IField';
// import IForm from '@/interfaces/IForm';
// import IQuestion from '@/interfaces/IQuestion';
// import IUser from '@/interfaces/IUser';
// import validate from '@/services/validate';

// export default defineComponent({
//   name: 'QuestionForm',
//   components: { FileUploader },
//   props: {
//     field: {
//       type: Object as PropType<IField>,
//       required: true,
//     },
//     form: {
//       type: Object as PropType<IForm>,
//       required: true,
//     },
//   },
//   setup(props) {
//     const filter = ref('');
//     const store = useStore();
//     const form = ref();
//     const mounted = ref(false);
//     const question: Ref<IQuestion> = computed(() => store.getters['questions/question']);
//     const user: Ref<IUser> = computed(() => store.getters['auth/user']);
//     watch(user, () => {
//       store.commit('questions/setUser', user.value);
//     });

//     const privacyRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
//       if (!value) {
//         callback(new Error('Необходимо принять условия обработки персональных данных'));
//       }
//       callback();
//       return;
//     };
//     const rules = {
//       theme: [{ required: true, message: 'Необходимо указать тему вопроса', trigger: 'blur' }],
//       originalQuestion: [{ required: true, message: 'Необходимо заполнить содержание обращения', trigger: 'blur' }],
//       agreedWithPrivacyPolicy: [{ validator: privacyRule, trigger: 'change' }],
//     };

//     onMounted(() => {
//       store.commit('questions/setUser', user.value);
//     });

//     const sendQuestion = async () => {
//       if (!validate(form)) {
//         return;
//       }
//       try {
//         await store.dispatch('questions/create', question.value);
//         store.commit('auth/setUser', question.value.user);
//         store.commit('questions/resetQuestion');
//         question.value.isDialogOpened = false;
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     return {
//       mounted,
//       sendQuestion,
//       question,
//       filter,
//       rules,
//       user,
//     };
//   },
// });
</script>

<style lang="scss" scoped>
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
  margin-left: 25px;
  font-style: italic;
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
