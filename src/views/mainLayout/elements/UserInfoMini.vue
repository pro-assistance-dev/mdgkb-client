<template>
  <div class="user-mini-info">
    <div class="avatar-block">
      <div class="avatar">
        <img :src="user.human.photo.getFileUrl()" alt="alt" @error="errorImg" />
      </div>
    </div>
    <el-form :model="user">
      <div class="user-name">
        <el-form-item label="Имя">
          <h4>{{ user?.human?.name ?? 'Имя пользователя' }}</h4>
        </el-form-item>
      </div>
      <div class="user-info">
        <div class="contact-mail">
          <el-form-item prop="email" label="Email">
            <h4>{{ user.email }}</h4>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- <h4>Меню</h4>
    <el-menu default-active="1">
      <el-menu-item index="1" @click="$router.push('/profile')">
        <i class="el-icon-warning-outline"></i>
        <span>Информация</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/profile/edit')">
        <i class="el-icon-user"></i>
        <span>Редактировать профиль</span>
      </el-menu-item>
      <el-menu-item index="4" @click="$router.push('/profile/children')">
        <i class="el-icon-user"></i>
        <span>Мои дети</span>
      </el-menu-item>
    </el-menu>
    <h4>Сервисы</h4>
    <el-menu>
      <el-menu-item index="5" @click="$router.push('/profile/questions')">
        <i class="el-icon-question"></i>
        <span>Ответы на вопросы</span>
        <el-tag v-if="hasNewAnswers" class="badge" type="warning">{{ countNewAnswers }}</el-tag>
      </el-menu-item>
      <el-menu-item index="6" @click="$router.push('/profile/donor')">
        <i class="el-icon-first-aid-kit"></i>
        <span>Донорство крови</span>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';
export default defineComponent({
  name: 'UserInfoMini',

  setup() {
    const store = useStore();

    const user: Ref<IUser> = computed(() => store.getters['users/item']);

    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/avatar.png');
      }
    };

    return {
      user,
      errorImg,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-block {
  padding: 40px 0 20px 0;
}

.avatar {
  display: block;
  width: 90px;
  height: 90px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    object-fit: cover;
  }
}

.contact-mail {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  justify-content: center;
  align-items: center;
  color: #a3a9be;
  height: 20px;
}

.user-name {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  height: 20px;
}

.user-mini-info {
  justify-content: center;
  height: 252px;
  align-content: center;
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 15px;
}

:deep(.el-form-item__label) {
  display: none;
}

:deep(.el-form-item) {
  margin: 0;
}
</style>
