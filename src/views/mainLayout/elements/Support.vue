<template>
  <div class="drop-support">
    <input id="support__toggle" type="checkbox" />
    <label
      :style="{ visibility: isDrawerOpen ? 'hidden' : 'visible', 'transition-delay': !isDrawerOpen ? '0.25s' : '' }"
      class="support__btn"
      for="support__toggle"
      @click="toggleDrawer(true)"
    >
      <div class="support">
        <div class="avatar">
          <div class="helper-avatar">
            <img src="../../../assets/img/avatar-helper-elena.jpg" alt="avatar-helper-elena" />
          </div>
        </div>
        <div class="text">ТЕСТОВЫЙ РЕЖИМ</div>
        <div class="text-mobile">ТЕСТ РЕЖИМ</div>
      </div>
    </label>
    <div
      id="support__box"
      :style="{ visibility: !isDrawerOpen ? 'hidden' : 'visible' }"
      class="support__box"
      @click="(e) => drawerLeaveHandler(e)"
    >
      <div id="support-zone" class="support-zone" :style="{ right: !isDrawerOpen ? '-100%' : '0' }">
        <div class="support-title">Задать вопрос техподдержке</div>
        <el-form ref="form" :model="supportMessage" label-position="top">
          <el-form-item
            v-if="!supportMessage.user?.human?.name"
            prop="user.human.name"
            :rules="[{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }]"
            label="Ваше имя"
          >
            <el-input v-model="supportMessage.user.human.name" placeholder="Имя" minlength="1" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item
            v-if="!supportMessage.user?.human?.surname"
            prop="user.human.surname"
            :rules="[{ required: true, message: 'Необходимо указать фамилию', trigger: 'blur' }]"
            label="Ваша фамилия"
          >
            <el-input
              v-model="supportMessage.user.human.surname"
              placeholder="Имя"
              minlength="1"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="!supportMessage.user?.human?.patronymic"
            prop="user.human.patronymic"
            :rules="[{ required: true, message: 'Необходимо указать отчество', trigger: 'blur' }]"
            label="Ваше отчество"
          >
            <el-input
              v-model="supportMessage.user.human.patronymic"
              placeholder="Имя"
              minlength="1"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="!supportMessage.user?.email"
            prop="user.email"
            :rules="[{ required: true, message: 'Необходимо указать email', trigger: 'blur' }]"
            label="Ваш email"
          >
            <el-input v-model="supportMessage.user.email" placeholder="Адрес электронной почты" minlength="1"></el-input>
          </el-form-item>

          <el-form-item label="Тема вопроса" prop="theme">
            <el-input v-model="supportMessage.theme" placeholder="Тема вопроса" minlength="1" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="Содержание обращения" prop="originalQuestion">
            <el-input
              v-model="supportMessage.question"
              type="textarea"
              placeholder="Содержание обращения"
              minlength="5"
              maxlength="1000"
              show-word-limit
              :autosize="{ minRows: 5, maxRows: 10 }"
            />
          </el-form-item>

          <div class="right-button">
            <el-button type="success" @click="submit">Отправить</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';

import User from '@/classes/User';
import ISupportMessage from '@/interfaces/ISupportMessage';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'BurgerMobile',
  emits: ['changeDrawerStatus'],
  setup(prop, { emit }) {
    const activePath: Ref<string> = ref('');
    const supportMessage: ComputedRef<ISupportMessage> = computed<ISupportMessage>(() => Provider.store.getters['supportMessages/item']);

    const isDrawerOpen: Ref<boolean> = ref(false);

    const toggleDrawer = (open?: boolean) => {
      isDrawerOpen.value = open ? open : !isDrawerOpen.value;
    };
    const drawerLeaveHandler = (e: any) => {
      if (e.target.id !== 'support__box') return;
      toggleDrawer(false);
    };
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    watch(user, () => {
      supportMessage.value.user = user.value;
    });

    onBeforeMount(async () => {
      supportMessage.value.user = new User(user.value);
      activePath.value = Provider.route().path;
    });
    watch(
      () => Provider.route().path,
      () => {
        activePath.value = Provider.route().path;
      }
    );

    const submit = async () => {
      supportMessage.value.date = new Date();
      await Provider.store.dispatch('supportMessages/create', supportMessage.value);
      Provider.store.commit('supportMessages/resetSupportMessage');
      supportMessage.value.user = user.value;
    };

    return {
      submit,
      supportMessage,
      isDrawerOpen,
      toggleDrawer,
      drawerLeaveHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/elements/base-style.scss';
* {
  text-decoration: none;
  color: white;
  list-style: none;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}

.drop-support {
  position: relative;
}

#support__toggle {
  opacity: 0;
}

.support__btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 101;
}

.support__btn > span,
.support__btn > span::before,
.support__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #343e5c;
}

.support__btn:hover > span,
.support__btn:hover > span::before,
.support__btn:hover > span::after {
  background-color: #22abe2;
}

.support__btn > span::before {
  content: '';
  top: -8px;
}
.support__btn > span::after {
  content: '';
  top: 8px;
}

.support__box {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}

.support-zone {
  margin-top: 20px;
  position: fixed;
  max-width: 450px;
  width: 90%;
  z-index: 100;
  background: #ffffff;
  border-top-left-radius: 5px 5px;
  border-bottom-left-radius: 5px 5px;
  padding: 20px;
}

.menu__item {
  display: block;
  padding: 12px 24px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
}
.menu__item:hover {
  background-color: #cfd8dc;
}

#support__toggle:checked ~ .support__box {
  visibility: visible;
  .support-zone {
    visibility: visible;
    right: 0;
  }
}
.is-active {
  left: 0;
}

.support__box,
.support-zone {
  transition-duration: 0.25s;
}
.menu__item {
  transition-duration: 0.25s;
}

ul.submenu li {
  text-decoration: none;
  display: block;
  transition: color 0.25s ease 0s;
  text-transform: uppercase;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
}

:root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  width: 100%;
  height: auto;
  background: #0671ba;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.menu .btn {
  display: block;
  padding: 0.5rem 0 0.5rem 1rem;
  border-bottom: solid 1px #e9e9e9;
  position: relative;
}

a.btn:hover {
  color: #ffffff;
  background: $active_color_menu;
}

a.btn:active {
  color: #ffffff;
  background: #22abe2;
}

.menu .submenu {
  background: #22abe2;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  transition-duration: 0.25s;
}

.menu .submenu a {
  display: block;
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;
}

.menu .submenu a:hover {
  color: #343e5c;
  background: #eceff1;
}

.menu .submenu a:hover::before {
  opacity: 1;
}

.icon-arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 15px;
  fill: #ffffff;
}

.background_active {
  background: $active_color_menu;
}

.support {
  position: absolute;
  z-index: 2000;
  top: 5px;
  right: 0px;
  height: 46px;
  border-top-left-radius: 25px 25px;
  border-bottom-left-radius: 25px 25px;
  background: #ffffff;
  border: 1px solid #343e5c;
  border-right: none;
  display: flex;
  animation-name: shadow;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  cursor: pointer;
}

@keyframes shadow {
  0% {
    box-shadow: 0px 0px 4px 4px rgba(60, 160, 250, 1);
  }
  50% {
    box-shadow: 0px 0px 4px 4px rgba(255, 255, 255, 1);
  }
  100% {
    box-shadow: 0px 0px 4px 4px rgba(60, 160, 250, 1);
  }
}

.support:hover {
  background: #ecf4ff;
}

.avatar {
  display: flex;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: 2px;
  margin-top: 2px;
  margin-right: 10px;
  position: relative;
  border: 1px solid #343e5c;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    object-fit: cover;
  }
}

.text {
  font-size: 10px;
  color: #343e5c;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 60px;
}

.form-callback {
  margin: 20px;
  padding-top: 5px;
}

.field-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.support-title {
  font-size: 16px;
  color: #343e5c;
}

.right-button {
  width: 100%;
}

:deep(.el-button el-button--success) {
}

.text-mobile {
  display: none;
}

@media only screen and (max-width: 480px) {
  .support {
    position: absolute;
    z-index: 1000;
    top: 65px;
    right: 0px;
    height: 46px;
    border-top-left-radius: 25px 25px;
    border-bottom-left-radius: 25px 25px;
    background: #ffffff;
    border: 1px solid #343e5c;
    border-right: none;
    display: flex;
    cursor: pointer;
  }

  .text {
    display: none;
  }

  .text-mobile {
    font-size: 10px;
    color: #343e5c;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
  }

  .avatar {
    display: flex;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 2px;
    margin-top: 2px;
    margin-right: 5px;
    position: relative;
    border: 1px solid #343e5c;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 46px;
      height: 46px;
      object-fit: cover;
    }
  }
}
</style>
