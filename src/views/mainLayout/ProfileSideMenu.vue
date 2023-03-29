<template>
  <div class="profile-menu">
    <UserInfoMini />
    <ul>
      <tempalte v-for="item in menuList" :key="item.name">
        <li v-if="item.liCondition()">
          <router-link class="item-list" :to="item.to" :class="activeRoute === item.route ? 'active' : ''">
            <component :is="require(`@/assets/profile/icons/${item.icon}.svg`).default" class="icon-profile" />
            <div class="item-list-name">
              {{ item.name }}
              <span v-if="item.notificationCondition()" class="sup-cymbol-counter">
                {{ item.notificationCount() }}
              </span>
            </div>
            <Arrow class="icon-arrow" />
          </router-link>
        </li>
      </tempalte>
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
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import User from '@/classes/User';
import IUser from '@/services/interfaces/IUser';
import Provider from '@/services/Provider/Provider';
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

    onBeforeMount(() => {
      setActiveMenu();
    });

    const user: Ref<User> = computed(() => Provider.store.getters['users/item']);
    const hasNewAnswers: Ref<boolean> = computed(() => user.value.hasNewAnswers());
    const countNewAnswers: Ref<number> = computed(() => user.value.countNewAnswers());

    const menuList = [
      {
        name: 'Мой профиль',
        icon: 'Home',
        to: '/profile',
        route: 'my',
        liCondition: () => true,
        notificationCondition: () => false,
        notificationCount: () => 0,
      },
      {
        name: 'Заказы еды',
        icon: 'Education',
        to: '/profile/daily-menu-orders',
        route: 'daily-menu-orders',
        liCondition: () => user.value.dailyMenuOrders.length,
        notificationCondition: () => user.value.dailyMenuOrders.some((d: DailyMenuOrder) => d.formValue.viewedByUser),
        notificationCount: () => user.value.dailyMenuOrders.filter((d: DailyMenuOrder) => d.formValue.fieldValues).length,
      },
      // {
      //   name: 'Вопросы-ответы',
      //   icon: 'Question',
      //   to: '/profile/question-answer',
      //   route: 'question-answer',
      //   liCondition: () => user.value.questions.length > 0,
      //   notificationCondition: () => user.value.hasNewAnswers(),
      //   notificationCount: () => user.value.countNewAnswers(),
      // },
      // {
      //   name: 'Мои комментарии',
      //   icon: 'Question',
      //   to: '/profile/user-comments',
      //   route: 'user-comments',
      //   liCondition: () => user.value.hasComments(),
      //   notificationCondition: () => false,
      //   notificationCount: () => 0,
      // },
      {
        name: 'Настройки',
        icon: 'Settings',
        to: '/profile/settings',
        route: 'settings',
        liCondition: () => true,
        notificationCondition: () => false,
        notificationCount: () => 0,
      },
    ];

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
