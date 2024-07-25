<template>
  <div class="auth-card">
    <div class="auth-card-header">
      {{ PHelp.AuthForm.GetTitle() }}
    </div>
    <div>
      <el-form ref="form" :model="form" :label-position="'top'">
        <el-form-item v-if="PHelp.AuthForm.Email().show(PHelp.AuthForm.Status())" prop="email" label="Введите email">
          <el-input ref="emailRef" v-model="PHelp.AuthForm.Email().email" placeholder="Email" :autofocus="true" />
        </el-form-item>
        <el-form-item v-if="PHelp.AuthForm.Password().show(PHelp.AuthForm.Status())" prop="password" label="Введите пароль">
          <el-input ref="passwordRef" v-model="PHelp.AuthForm.Password().password" placeholder="Пароль" type="password" />
        </el-form-item>
        <el-form-item v-if="PHelp.AuthForm.PasswordRepeat().show(PHelp.AuthForm.Status())" prop="passwordRepeat" label="Повторите пароль">
          <el-input ref="passwordRepeatRef" v-model="PHelp.AuthForm.PasswordRepeat().text" placeholder="Пароль" type="password" />
        </el-form-item>
        <div class="btn-group">
          <PButton
            v-for="btn in buttons"
            :key="btn.getStatus()"
            :disabled="blockBtn"
            type="primary"
            skin="auth"
            :text="btn.label"
            :color="btn.isSubmit ? 'blue' : 'grey'"
            margin="10px 0 0 0"
            @click="authButtonClick(btn)"
          />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthButton from '@/services/classes/AuthButton';
import PButton from '@/services/components/PButton.vue';

import AuthStatuses from '../interfaces/AuthStatuses';

const form = PHelp.AuthForm;
const blockBtn = ref(false);
const emailRef = ref();
const passwordRef = ref();

const emits = defineEmits(['action']);
const buttons = computed(() => form.GetAuthButtons());

const registration = async () => {
  form.Reset();
  await AuthStore.Register();
  form.SetStatus(AuthStatuses.Login);
};

const login = async () => {
  await AuthStore.Login();
  form.Reset();
};

const restore = async () => {
  form.Reset();
  await Router.To('/');
};

const refresh = async () => {
  form.Reset();
  await Router.To('/');
  PHelp.Auth.Logout();
};

const authButtonClick = async (authButton: AuthButton): Promise<void> => {
  // authButton.off();
  blockBtn.value = true;
  if (!authButton.isSubmit) {
    // authButton.on();
    blockBtn.value = false;
    return form.SetStatus(authButton.getStatus());
  }

  const errors = form.GetErrors();
  if (errors.length > 0) {
    PHelp.Notification.Error(errors.join(', '));
    blockBtn.value = false;
    return;
  }

  try {
    PHelp.Loading.Show();
    // await Store.Dispatch(`auth/${form.GetAction()}`);
    PHelp.Loading.Hide();

    PHelp.Notification.Success(form.GetSuccessMessage());
  } catch (error) {
    PHelp.Loading.Hide();
    blockBtn.value = false;
    return;
  }

  switch (form.Status()) {
    case AuthStatuses.Login:
      await login();
      break;

    case AuthStatuses.Register:
      await registration();
      break;

    case AuthStatuses.Restore:
      await restore();
      break;

    case AuthStatuses.Refresh:
      await refresh();
      break;
    default:
      break;
  }
  blockBtn.value = false;
  authButton.on();
  emits('action');
};

onBeforeUnmount(() => {
  form.Reset();
});
const focus = () => {
  if (form.IsRefresh()) {
    passwordRef.value.focus();
    return;
  }
  emailRef.value.focus();
};
watch(
  () => form.Status(),
  () => {
    focus();
  }
);
onMounted(() => {
  focus();
});
</script>

<style scoped lang="scss">
.wer {
  height: 20px;
  width: 20px;
  background: red;
}

.btn-group {
  display: block;
}

.btn {
  color: #409efe;
  border: none;
  width: 100%;
  height: 40px;
  text-transform: none;
  // text-transform: uppercase !important;
}

.btn:hover {
  box-shadow: none;
  color: #006fe1;
}

.btn-active {
  background: #ddf2f9;
  color: #409efe;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  margin: 40px 0 10px 0;
}

.btn-active:hover {
  box-shadow: none;
  background: #409efe;
  color: #ddf2f9;
}

.auth-card-header {
  width: 100%;
  font-size: 20px;
  color: #409efe;
  display: flex;
  justify-content: center;
  align-items: center;
  // text-transform: uppercase;
  word-wrap: break-word;
  word-break: break-all;
  margin-bottom: 20px;
}

:deep(.el-form--label-top .el-form-item__label) {
  padding: 0px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}
</style>
