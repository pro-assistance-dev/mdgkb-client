<template>
  <div class="profile-menu">
    <UserInfoMini />
    <ul>
      <!-- <li v-for="item in menuList" :key="item.name">
        <router-link class="item-list" :to="item.to" :class="activeRoute === item.route ? 'active' : ''">
          <component :is="require(`@/assets/profile/icons/${item.icon}.svg`).default" class="icon-profile" />
          {{ item.name }}
          <Arrow class="icon-arrow" />
        </router-link>
      </li> -->
      <li>
        <router-link class="item-list" :to="`/profile`" :class="activeRoute === 'my' ? 'active' : ''">
          <Home class="icon-profile" />
          Мой профиль
          <Arrow class="icon-arrow" />
        </router-link>
      </li>
      <li>
        <router-link class="item-list" :to="`/profile/education`" :class="activeRoute === 'education' ? 'active' : ''">
          <Education class="icon-education" />
          <div class="item-list-name">
            Заявки
            <span v-if="user.formValues.length && user.formValues.some((el) => !el.viewedByUser)" class="sup-cymbol-counter">
              {{ user.getNotViewedApplicationsCount() }}
            </span>
          </div>
          <Arrow class="icon-arrow" />
        </router-link>
      </li>
      <li v-if="user.questions.length > 0">
        <router-link class="item-list" :to="`/profile/question-answer`" :class="activeRoute === 'question-answer' ? 'active' : ''">
          <Question class="icon-education" />
          <div class="item-list-name">
            Вопросы-ответы
            <span v-if="hasNewAnswers" class="sup-cymbol-counter">
              {{ countNewAnswers }}
            </span>
          </div>
          <Arrow class="icon-arrow" />
        </router-link>
      </li>
      <li v-if="user.comments.length > 0">
        <router-link class="item-list" :to="`/profile/user-comments`" :class="activeRoute === 'user-comments' ? 'active' : ''">
          <Question class="icon-education" />
          <div class="item-list-name">Мои комментарии</div>
          <Arrow class="icon-arrow" />
        </router-link>
      </li>
      <li>
        <router-link class="item-list" :to="`/profile/settings`" :class="activeRoute === 'settings' ? 'active' : ''">
          <Settings class="icon-settings" />
          Настройки
          <Arrow class="icon-arrow" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Arrow from '@/assets/profile/icons/Arrow.svg';
import Education from '@/assets/profile/icons/Education.svg';
import Home from '@/assets/profile/icons/Home.svg';
import Question from '@/assets/profile/icons/Question.svg';
import Settings from '@/assets/profile/icons/Settings.svg';
import IUser from '@/interfaces/IUser';
import Provider from '@/services/Provider';
import UserInfoMini from '@/views/mainLayout/elements/UserInfoMini.vue';

export default defineComponent({
  name: 'ProfileSideMenu',
  components: { UserInfoMini, Arrow, Home, Education, Question, Settings },
  setup() {
    const activeRoute: Ref<string> = ref('');
    const route = useRoute();
    watch(route, () => {
      setActiveMenu();
    });

    const setActiveMenu = () => {
      if (!Provider.route().meta.profile) {
        return;
      }
      activeRoute.value = Provider.route().meta.profile as string;
    };

    const menuList = [
      {
        name: 'Мой профиль',
        icon: 'Home',
        to: '/profile',
        route: 'my',
      },
      {
        name: 'Заявки',
        icon: 'Education',
        to: '/profile/education',
        route: 'education',
      },
    ];

    onBeforeMount(() => {
      setActiveMenu();
    });

    const user: Ref<IUser> = computed(() => Provider.store.getters['users/item']);
    const hasNewAnswers: Ref<boolean> = computed(() => user.value.hasNewAnswers());
    const countNewAnswers: Ref<number> = computed(() => user.value.countNewAnswers());

    return {
      user,
      hasNewAnswers,
      countNewAnswers,
      activeRoute,
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-menu {
  min-width: 272px;
  background: #ffffff;
  height: 73vh;
  margin-right: 30px;
}

.icon-profile {
  width: 24px;
  height: 24px;
  padding-right: 10px;
  padding-left: 20px;
}

.icon-education {
  width: 24px;
  height: 24px;
  padding-right: 10px;
  padding-left: 20px;
}

.icon-question {
  width: 24px;
  height: 24px;
  padding-right: 10px;
  padding-left: 20px;
}

.icon-settings {
  width: 24px;
  height: 24px;
  padding-right: 10px;
  padding-left: 20px;
}

.icon-arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 15px;
  fill: #ffffff;
}

.profile-menu ul {
  list-style: none;
  transition: color 0.3s ease 0s;
  align-items: center;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  padding: 0;
}

.profile-menu li {
  justify-content: left;
  width: 100%;
  text-decoration: none;
  align-items: center;
  border-top: 1px solid #e0e5ee;
}

.profile-menu li:last-child {
  border-bottom: 1px solid #e0e5ee;
}

.item-list {
  position: sticky;
  fill: #2754eb;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #343e5c;
  &-name {
    position: relative;
  }
}

.left {
  display: flex;
  justify-content: left;
}

.right {
  display: flex;
}

.item-list:hover {
  fill: #ffffff;
  color: #ffffff;
  background: #2754eb;
}

.item {
  display: flex;
}

.item-title {
  display: flex;
}

// a.router-link-active,
// li.item-list-active > a {
//   background: #ffffff;
// }

.active {
  color: #ffffff;
  fill: #ffffff;
  background: #2754eb;

  .sup-cymbol-counter {
    background: #ffffff;
    color: #2754eb;
  }
}

.sup-cymbol-counter {
  display: flex;
  position: absolute;
  right: -25px;
  top: -10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-weight: bold;
  background: #2754eb;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

@media screen and (max-width: 980px) {
  .profile-menu {
    margin-right: 10px;
  }
}

@media screen and (max-width: 670px) {
  .profile-menu {
    min-width: 220px;
    height: 73vh;
  }

  .icon-profile {
    padding-left: 10px;
  }

  .icon-education {
    padding-left: 10px;
  }
}

@media screen and (max-width: 560px) {
  .profile-menu {
    display: none;
  }
}
</style>
