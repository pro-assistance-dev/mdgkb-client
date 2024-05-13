<template>
  <div class="profile-menu">
    <UserInfoMini />
    <ul>
      <template v-for="item in menuList" :key="item.name">
        <li v-if="item.liCondition()" >
          <router-link class="item-list" :to="item.to" :class="activeRoute === item.route ? 'active' : ''">
            <ProfileMenuIcons :name="item.icon" />
            <div class="item-list-name">
              {{ item.name }}
              <!-- <span v-if="item.notificationCondition()" class="sup-cymbol-counter">{{ item.notificationCount() }}</span> -->
            </div>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import ResidencyApplication from '@/classes/ResidencyApplication';
import User from '@/classes/User';
import Provider from '@/services/Provider/Provider';
import UserInfoMini from '@/views/mainLayout/elements/UserInfoMini.vue';
import ProfileMenuIcons from '@/components/Icons/ProfileMenuIcons.vue';

const activeRoute: Ref<string> = ref('');
watch(() => Router.Route(), () => {
  console.log("routeChanged")
  setActiveMenu();
});
console.log('git_test');
const setActiveMenu = () => {
  if (!Provider.route().meta.profile) {
    return;
  }
  activeRoute.value = Provider.route().meta.profile as string;
};
const modules = import.meta.glob('@/assets/profile/icons/*.svg');
const getIcon = (icon: string) => {
  const path = '/src/assets/profile/icons/' + icon + '.svg';
  const comp = defineAsyncComponent(() => modules[path]());
  return comp

}
console.log('committest');
onBeforeMount(() => {
  setActiveMenu();
});

const user: Ref<User> = Store.Item('users')
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
  {
    name: 'Заявки ординатура',
    icon: 'Education',
    to: '/profile/residency-applications',
    route: 'education',
    liCondition: () => user.value.residencyApplications.length,
    notificationCondition: () => user.value.residencyApplications.some((d: ResidencyApplication) => d.formValue.viewedByUser),
    notificationCount: () => user.value.residencyApplications.filter((d: ResidencyApplication) => d.formValue.fieldValues).length,
  },
  {
    name: 'Отклики на вакансии',
    icon: 'Education',
    to: '/profile/vacancy-responses',
    route: 'vacancy',
    liCondition: () => user.value.vacancyResponses.length,
    notificationCondition: () => user.value.vacancyResponses.some((d: VacancyResponse) => d.formValue.viewedByUser),
    notificationCount: () => user.value.vacancyResponses.filter((d: VacancyResponse) => d.formValue.fieldValues).length,
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

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.profile-menu {
  min-width: 272px;
  background: #ffffff;
  height: 73vh;
  margin-right: 30px;
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
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #343E5C;
  background: #ffffff;
  // opacity: 0.6;

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
  background: #F0F2F7;
  // opacity: 1;
}

.item {
  display: flex;
}

.item-title {
  display: flex;
}

.active {
  background: #F0F2F7;
  // opacity: 1;
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
  background: #ffffff;
  color: #01528A;
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
