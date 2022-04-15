<template>
  <div class="profile-menu">
    <UserInfoMini />
    <ul>
      <li>
        <router-link class="item-list" :to="`/profile`" active-class="active">
          <svg class="icon-profile">
            <use xlink:href="#home"></use>
          </svg>
          Мой профиль
          <svg class="icon-arrow">
            <use xlink:href="#arrow"></use>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link class="item-list" :to="`/profile/education`" active-class="active">
          <svg class="icon-education">
            <use xlink:href="#education"></use>
          </svg>
          Образование
          <svg class="icon-arrow">
            <use xlink:href="#arrow"></use>
          </svg>
        </router-link>
      </li>
    </ul>
  </div>

  <svg width="0" height="0" class="hidden">
    <symbol id="home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V11C21.0008 10.8684 20.9755 10.7379 20.9258 10.6161C20.876 10.4943 20.8027 10.3834 20.71 10.29L12.71 2.29C12.5226 2.10375 12.2692 1.99921 12.005 1.99921C11.7408 1.99921 11.4874 2.10375 11.3 2.29L3.3 10.29C3.20551 10.3826 3.13034 10.4931 3.07885 10.6149C3.02735 10.7368 3.00055 10.8677 3 11V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22ZM10 20V15H14V20H10ZM5 11.41L12 4.41L19 11.41V20H16V15C16 14.4696 15.7893 13.9609 15.4142 13.5858C15.0391 13.2107 14.5304 13 14 13H10C9.46957 13 8.96086 13.2107 8.58579 13.5858C8.21071 13.9609 8 14.4696 8 15V20H5V11.41Z"
      ></path>
    </symbol>

    <symbol id="education" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7 18H17V16H7V18ZM17 14H7V12H17V14ZM7 10H11V8H7V10Z"></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 2C5.20435 2 4.44129 2.31607 3.87868 2.87868C3.31607 3.44129 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V9C21 7.14348 20.2625 5.36301 18.9497 4.05025C17.637 2.7375 15.8565 2 14 2H6ZM6 4H13V9H19V19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4V4ZM15 4.1C15.786 4.26102 16.5218 4.60849 17.1455 5.11315C17.7692 5.61782 18.2625 6.26492 18.584 7H15V4.1Z"
      ></path>
    </symbol>

    <symbol id="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z"></path>
    </symbol>
  </svg>
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
.profile-menu {
  width: 272px;
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

a.router-link-active,
li.item-list-active > a {
  background: #ffffff;
}

.active {
  color: #ffffff;
  fill: #ffffff;
  background: #2754eb;
}

@media screen and (max-width: 1024px) {
  .el-card {
    display: none;
  }
}
</style>
