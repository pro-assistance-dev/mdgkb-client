<template>
  <el-card>
    <UserInfoMini />
    <el-menu :default-active="activeRoute">
      <el-menu-item index="my" @click="$router.push('/profile')">
        <i class="el-icon-house"></i>
        <span class="magrin-title">Мой профиль</span>
      </el-menu-item>
      <el-menu-item index="education" @click="$router.push('/profile/education')">
        <i class="el-icon-document"></i>
        <span class="magrin-title">Образование</span>
      </el-menu-item>
      <!-- <el-menu-item index="4" @click="$router.push('/profile/children')">
        <i class="el-icon-user"></i>
        <span>Мои дети</span>
      </el-menu-item> -->
    </el-menu>
    <!-- <h4>Сервисы</h4>
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
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';
import UserInfoMini from '@/views/mainLayout/elements/UserInfoMini.vue';
export default defineComponent({
  name: 'ProfileSideMenu',
  components: { UserInfoMini },
  setup() {
    const store = useStore();
    const route = useRoute();
    const activeRoute: Ref<string> = ref('');

    watch(route, () => {
      setActiveMenu();
    });

    const setActiveMenu = () => {
      if (!route.meta.profile) return;
      activeRoute.value = route.meta.profile as string;
    };

    onBeforeMount(() => {
      setActiveMenu();
    });

    const user: Ref<IUser> = computed(() => store.getters['users/item']);
    const hasNewAnswers: Ref<boolean> = computed(() => user.value.hasNewAnswers());
    const countNewAnswers: Ref<number> = computed(() => user.value.countNewAnswers());

    return {
      user,
      hasNewAnswers,
      countNewAnswers,
      activeRoute,
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
  min-width: 272px;
  margin-right: 30px;
  height: 73vh;
}

:deep(.el-card__body) {
  padding: 0px;
}

.profile-menu-list li {
  text-decoration: none;
}

.magrin-title {
  position: relative;
  bottom: 4px;
}

.el-icon-house {
  position: relative;
  bottom: 6px;
}

.el-icon-document {
  position: relative;
  bottom: 6px;
}

:deep(.el-menu-item) {
  background: #ffffff;
  height: 44px;
  color: #343e5c;
  align-content: center;
  padding: 0;
}

:deep(.el-menu-item:hover) {
  background: #2754eb;
  height: 44px;
  color: #ffffff;
}

:deep(.el-menu-item.is-active) {
  color: #ffffff;
  background: #2754eb;
}

@media screen and (max-width: 1024px) {
  .el-card {
    display: none;
  }
}
</style>
