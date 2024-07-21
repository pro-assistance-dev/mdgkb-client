<template>
  <div class="size">
    <div class="title">
      <div class="title-left">
        <div class="size-less-560">
          <h2><b>Мой профиль</b></h2>
        </div>
        <svg class="icon-arrow-right">
          <use xlink:href="#arrow-right-profile"></use>
        </svg>
        <div class="size-over-1100"><h2>Редактировать профиль</h2></div>
        <div class="size-less-1100"><h2>Редактировать</h2></div>
        <div class="size-less-980"><h2>Ред.</h2></div>
      </div>
      <div class="title-right">
        <div class="button">
          <PButton skin="profile" text="Отмена" width="100px" margin="0 20px 0 0" @click="$router.push('/profile')" />
        </div>

        <div class="button-less-800">
          <PButton skin="profile" margin="0 20px 0 0" width="32px" padding="0" @click="$router.push('/profile')">
            <IconBack />
          </PButton>
        </div>

        <div class="button">
          <PButton skin="profile" type="primary" text="Сохранить" width="100px" margin="0 20px 0 0" @click="saveUser" />
        </div>
        <div class="button-less-800">
          <PButton skin="profile" type="primary" margin="0" width="32px" padding="0" @click="saveUser">
            <IconSave />
          </PButton>
        </div>
        <!-- <button class="save-button-less-800" @click="saveUser">
          <svg class="icon-save">
            <use xlink:href="#save"></use>
          </svg>
        </button> -->
      </div>
    </div>
    <div class="right-block">
      <el-form ref="form" label-position="top" :model="user" :rules="rules">
        <HumanForm :store-module="'users'" />
      </el-form>
      <!--    <div class="line-item">-->
      <!--      <div class="item-data">-->
      <!--        <button class="plus-button">-->
      <!--          ДОБАВИТЬ ДОВЕРЕННОЕ ЛИЦО-->
      <!--          <svg class="icon-plus">-->
      <!--            <use xlink:href="#profile-plus"></use>-->
      <!--          </svg>-->
      <!--        </button>-->
      <!--      </div>-->
      <!--    </div>-->

      <!--    <div class="line-item">-->
      <!--      <div class="item-data">-->
      <!--        <button class="plus-button-last">-->
      <!--          ДОБАВИТЬ МОЮ КЛИНИКУ-->
      <!--          <svg class="icon-plus">-->
      <!--            <use xlink:href="#profile-plus"></use>-->
      <!--          </svg>-->
      <!--        </button>-->
      <!--      </div>-->
      <!--    </div>-->
    </div>
    <!-- <svg width="0" height="0" class="hidden">
      <symbol id="arrow-right-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z"></path>
      </symbol>
      <symbol id="profile-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6V6Z"
        ></path>
      </symbol>
      <symbol id="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M8 7V11L2 6L8 1V5H13C15.1217 5 17.1566 5.84285 18.6569 7.34315C20.1571 8.84344 21 10.8783 21 13C21 15.1217 20.1571 17.1566 18.6569 18.6569C17.1566 20.1571 15.1217 21 13 21H4V19H13C14.5913 19 16.1174 18.3679 17.2426 17.2426C18.3679 16.1174 19 14.5913 19 13C19 11.4087 18.3679 9.88258 17.2426 8.75736C16.1174 7.63214 14.5913 7 13 7H8Z"
        ></path>
      </symbol>
      <symbol id="save" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6V18C4.5 18.3978 4.65804 18.7794 4.93934 19.0607C5.22064 19.342 5.60218 19.5 6 19.5V14.25C6 13.6533 6.23705 13.081 6.65901 12.659C7.08097 12.2371 7.65326 12 8.25 12H15.75C16.3467 12 16.919 12.2371 17.341 12.659C17.7629 13.081 18 13.6533 18 14.25V19.5C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18V8.4315C19.4999 8.03371 19.3418 7.65224 19.0605 7.371L16.629 4.9395C16.3478 4.65818 15.9663 4.50008 15.5685 4.5H15V6.75C15 7.34674 14.7629 7.91903 14.341 8.34099C13.919 8.76295 13.3467 9 12.75 9H9.75C9.15326 9 8.58097 8.76295 8.15901 8.34099C7.73705 7.91903 7.5 7.34674 7.5 6.75V4.5H6ZM9 4.5V6.75C9 6.94891 9.07902 7.13968 9.21967 7.28033C9.36032 7.42098 9.55109 7.5 9.75 7.5H12.75C12.9489 7.5 13.1397 7.42098 13.2803 7.28033C13.421 7.13968 13.5 6.94891 13.5 6.75V4.5H9ZM16.5 19.5V14.25C16.5 14.0511 16.421 13.8603 16.2803 13.7197C16.1397 13.579 15.9489 13.5 15.75 13.5H8.25C8.05109 13.5 7.86032 13.579 7.71967 13.7197C7.57902 13.8603 7.5 14.0511 7.5 14.25V19.5H16.5ZM3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H15.5685C16.3641 3.00017 17.127 3.31635 17.6895 3.879L20.121 6.3105C20.6836 6.87298 20.9998 7.63592 21 8.4315V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6Z"
        ></path>
      </symbol>
    </svg> -->
    <!-- <el-card v-if="user">
    <template #header><h3 style="text-align: center; margin: 0">Профиль</h3></template>
    <el-form label-width="120px" label-position="left" :model="user">
      <HumanForm :store-module="'users'" />

      <el-form-item prop="email" label="Email">
        <el-input v-model="user.email" placeholder="Email" type="email" />
      </el-form-item>

      <el-form-item prop="password" label="Пароль">
        <el-input v-model="user.password" placeholder="Пароль" type="password" />
      </el-form-item>
    </el-form>
  </el-card> -->
  </div>
</template>

<script lang="ts">
import User from '@/classes/User';
import HumanForm from '@/components/admin/HumanForm.vue';
import UserRules from '@/rules/UserRules';
import validate from '@/services/validate';

export default defineComponent({
  name: 'ProfileEditPage',
  components: { HumanForm },
  setup() {
    const user: User = UsersStore.Item();
    const rules = ref(UserRules);
    const form = ref();

    const loadUser = async () => {
      await UsersStore.Get(PHelp.Auth.GetUser().id as string);
    };
    onMounted(loadUser);

    async function saveUser() {
      if (!validate(form)) {
        return;
      }
      await UsersStore.Update();
      await Router.To('/profile');
    }

    return {
      user,
      saveUser,
      rules,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.size {
  // max-width: 900px;
  padding: 0 20px 0 0;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 100%;
}

.title-left {
  display: flex;
  justify-content: left;
}

.title-right {
  display: flex;
  justify-content: right;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-data {
  width: 100%;
  color: #343e5c;
}

h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 15px;
}

h5 {
  margin: 0;
  font-weight: normal;
  font-size: 11px;
}

.icon-arrow-right {
  width: 24px;
  height: 36px;
  fill: #343e5c;
  margin: 0 15px;
}

.icon-back {
  width: 16px;
  height: 16px;
  fill: $base-light-font-color;
}

.icon-save {
  width: 24px;
  height: 24px;
  fill: #ffffff;
}

.right-block {
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  width: calc(100% - 40px);
}

.icon-plus {
  position: absolute;
  right: 5px;
  width: 24px;
  height: 24px;
  fill: #44d39e;
}

.plus-button {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 10px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 11px;
  border-radius: 40px;
  border: 1px solid #e1e6ef;
  color: #44d39e;
  align-items: center;
  background: #ffffff;
  margin-top: 5px;
}

.plus-button:hover {
  border: 1px solid #44d39e;
  background: #44d39e;
  color: #ffffff;
}

.plus-button-last {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 10px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 11px;
  border-radius: 40px;
  border: 1px solid #e1e6ef;
  color: #44d39e;
  align-items: center;
  background: #ffffff;
  margin-top: 25px;
}

.plus-button-last:hover {
  border: 1px solid #44d39e;
  background: #44d39e;
  color: #ffffff;
}

.size-less-1100 {
  display: none;
}
.size-less-980 {
  display: none;
}

.button {
  display: block;
}

.button-less-800 {
  display: none;
}

@media screen and (max-width: 1100px) {
  .size-less-1100 {
    display: block;
  }
  .size-over-1100 {
    display: none;
  }
  .size-less-980 {
    display: none;
  }
}

@media screen and (max-width: 980px) {
  .size {
    max-width: 890px;
    padding: 0 10px 0 0;
  }
  .right-block {
    display: block;
  }
  .column-left {
    width: 100%;
  }
  .user-avatar {
    padding-right: 20px;
  }
  .user-info {
    border-bottom: none;
    margin-bottom: 40px;
  }
  .user-avatar {
    padding-right: 0px;
    margin-left: auto;
    margin-right: auto;
  }
  .parent-info {
    h2 {
      font-size: 18px;
    }
  }
  .size-less-1100 {
    display: none;
  }
  .size-over-1100 {
    display: none;
  }
  .size-less-980 {
    display: block;
  }
}

@media screen and (max-width: 910px) {
  .icon-arrow-right {
    margin: 0 5px;
  }
}

@media screen and (max-width: 800px) {
  .button-less-800 {
    display: block;
  }
  .button {
    display: none;
  }
}

@media screen and (max-width: 730px) {
  .title-left {
    h2 {
      font-size: 22px;
    }
  }
  .cancell-button {
    font-size: 12px;
  }
  .size {
    padding: 0 5px;
  }
  .icon-arrow-right {
    width: 20px;
    height: 32px;
    margin: 0 0 0 5px;
  }
}

@media screen and (max-width: 670px) {
  .title-left {
    h2 {
      font-size: 22px;
    }
  }
  .right-block {
    padding: 20px 10px;
    margin-right: 0;
    width: calc(100% - 20px);
  }
  .column-left {
    margin-right: 0px;
  }
}

@media screen and (max-width: 590px) {
  .edit-button {
    padding: 7px 10px;
  }
}

@media screen and (max-width: 560px) {
  .hidden_540 {
    display: none;
  }
  .title-left {
    justify-content: right;
    margin-bottom: 0px;
    margin-top: 15px;
  }
  .right-block {
    padding: 20px 20px;
    margin-right: 0;
    width: calc(100% - 40px);
  }
  .column-left {
    margin-right: 0px;
  }
  .hidden {
    display: block;
  }
  .size-less-560 {
    display: none;
  }

  .size-less-1100 {
    display: block;
    h2 {
      margin-bottom: 12px;
    }
  }
  .size-less-980 {
    display: none;
  }
  .icon-arrow-right {
    display: none;
  }
}

@media screen and (max-width: 350px) {
  .title-left {
    h2 {
      font-size: 20px;
    }
  }
  .right-block {
    padding: 20px 10px;
    margin-right: 0;
    width: calc(100% - 20px);
  }
  .column-left {
    margin-right: 0px;
  }
}
</style>
