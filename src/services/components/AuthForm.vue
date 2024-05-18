<template>
  <div class="auth-card">
    <div class="auth-card-header">
      {{ form.getTitle() }}
    </div>
    <div>
      <el-form ref="form" :model="form" :label-position="'top'">

      <!-- <PInput v-if="form.email.show(form.status)" v-model="form.email.email" label="Введите email"  placeholder="Email"/>
      <PInput v-if="form.password.show(form.status)" label="Введите пароль" v-model="form.password.password" placeholder="Пароль" />
      <PInput v-if="form.passwordRepeat.show(form.status)" label="Повторите пароль" v-model="form.passwordRepeat.text" placeholder="Пароль" /> -->
        <el-form-item v-if="form.email.show(form.status)" prop="email" label="Введите email">
          <el-input ref="emailRef" v-model="form.email.email" placeholder="Email" :autofocus="true" />
        </el-form-item>
        <el-form-item v-if="form.password.show(form.status)" prop="password" label="Введите пароль">
          <el-input ref="passwordRef" v-model="form.password.password" placeholder="Пароль" type="password" />
        </el-form-item>
        <el-form-item v-if="form.passwordRepeat.show(form.status)" prop="passwordRepeat" label="Повторите пароль">
          <el-input ref="passwordRepeatRef" v-model="form.passwordRepeat.text" placeholder="Пароль" type="password" />
        </el-form-item>
        <div class="btn-group">
          <PButton type="admin" v-for="btn in buttons" :key="btn.getStatus()" :text="btn.label" 
          :color="btn.isSubmit ? 'blue' : 'grey'" @click="authButtonClick(btn)" margin="10px 0 0 0"/>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthButton from '@/services/classes/AuthButton';
import AuthForm from '@/services/classes/AuthForm';
import Message from '@/services/classes/Message';
import Provider from '@/services/Provider/Provider';
import PInput from '@/services/components/PInput.vue';
import PButton from '@/services/components/PButton.vue';

import AuthStatuses from '../interfaces/AuthStatuses';

const form: ComputedRef<AuthForm> = Store.Item('auth', 'form');
const auth: ComputedRef<AuthForm> = Store.Item('auth', 'auth');

const emailRef = ref();
const passwordRef = ref();
const visible = ref(false);

const emits = defineEmits(['action']);
const buttons = computed(() => form.value.getAuthButtons());

const registration = () => {
  form.value.reset();
  form.value.setStatus(AuthStatuses.Login);
};

const login = () => {
  form.value.reset();
};

const restore = async () => {
  form.value.reset();
  await Provider.router.push('/main');
};

const refresh = async () => {
  form.value.reset();
  await Provider.router.push('/main');
  auth.value.logout();
};

const authButtonClick = async (authButton: AuthButton): Promise<void> => {
  authButton.off();
  if (!authButton.isSubmit) {
    authButton.on();
    return form.value.setStatus(authButton.getStatus());
  }

  const errors = form.value.getErrors();
  if (errors.length > 0) {
    Message.Error(errors.join(', '));
    authButton.on();
    return;
  }

  try {
    Store.Dispatch(`auth/${form.value.getAction()}`);
    Message.Success(form.value.getSuccessMessage());
  } catch (error) {
    return;
  }
  switch (form.value.status) {
    case AuthStatuses.Login:
      login();
      break;

    case AuthStatuses.Register:
      registration();
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
  authButton.on();
  emits('action');
};

onBeforeUnmount(() => {
  form.value.reset;
});
const focus = () => {
  if (form.value.isRefresh()) {
    passwordRef.value.focus();
    return;
  }
  emailRef.value.focus();
};
watch(
  () => form.value.status,
  () => {
    focus();
  }
);
onMounted(() => {
  focus();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.wer {
  height: 20px;
  width: 20px;
  background: red;
}

.auth-card {
  // width: 320px;
}

.btn-group {
  display: block;
  padding-top: 30px;
}

.btn {
  color: $site_gray;
  background: #ffffff;
  margin: 10px 0;
}

.btn:hover {
  color: $main_blue;
}

.btn-active {
  background: #ddf2f9;
  color: $main_blue;
}

.btn-active:hover {
  background: $main_blue;
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
