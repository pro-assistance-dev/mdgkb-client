<template>
  <el-card>
    <h4>Меню</h4>
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
      <el-menu-item index="6" @click="$router.push('/profile/donor')"
        >>
        <i class="el-icon-first-aid-kit"></i>
        <span>Донорство крови</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';
export default defineComponent({
  name: 'ProfileSideMenu',

  setup() {
    const store = useStore();

    const user: Ref<IUser> = computed(() => store.getters['users/item']);
    const hasNewAnswers: Ref<boolean> = computed(() => user.value.hasNewAnswers());
    const countNewAnswers: Ref<number> = computed(() => user.value.countNewAnswers());

    return {
      user,
      hasNewAnswers,
      countNewAnswers,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

h4 {
  font-weight: normal;
  text-transform: uppercase;
  font-size: 14px;
  margin: 10px 0 5px 15px;
}

.badge {
  margin-left: 10px;
}
.el-card {
  min-width: 250px;
  margin-right: 20px;
}
@media screen and (max-width: 1024px) {
  .el-card {
    display: none;
  }
}
</style>
