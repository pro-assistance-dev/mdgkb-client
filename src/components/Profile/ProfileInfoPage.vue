<template>
  <div v-if="mounted" class="size" data-test="profile-info-component">
    <div class="title">
      <h2><b>Мой профиль</b></h2>
      <div class="button">
        <PButton skin="profile" text="Редактировать" @click="$router.push('/profile/edit')" width="180px">
          <IconEdit size="26px" />
        </PButton>
      </div>
      <div class="button-less-800">
        <PButton skin="profile" @click="$router.push('/profile/edit')" width="32px" padding="0">
          <IconEdit margin="0" />
        </PButton>
      </div>
    </div>
    <div class="right-block">
      <div class="column-left">
        <div class="user-avatar">
          <div class="avatar-block">
            <UploaderSingleScan
              :emit-crop="true"
              :file-info="user.human.photo"
              :height="273"
              :default-ratio="1"
              @crop="saveAvatar"
              @ratio="(e) => (element.ratio = e)"
              @remove-file="dropAvatar"
            />
          </div>
        </div>
        <el-form :model="user">
          <div class="user-name">
            <div label="Имя">
              <h2>
                <b data-test="full-name-mobile">{{ user.human.getFullName() }}</b>
              </h2>
            </div>
          </div>
          <div class="user-info">
            <div class="contact-mail">
              <IconEmail color="#A3A9BE" />
              <div prop="email" label="Email">
                <h4>{{ user.email }}</h4>
              </div>
            </div>
            <div class="contact-phone">
              <div class="contact-phone-el">
                <IconPhone color="#A3A9BE" />
                <div prop="phone" label="Phone">
                  <h4 v-if="user.phone">{{ user.phone }}</h4>
                  <h4 v-else>Не указан</h4>
                </div>
              </div>
              <div class="contact-phone-el">
                <PButton
                  type="neutral"
                  v-if="user.phone"
                  skin="profile"
                  text="Изменить"
                  height="28px"
                  width="100px"
                  @click="isEditPhoneModalOpen = true"
                />
                <PButton v-else skin="profile" text="Добавить" height="28px" width="120px" @click="isEditPhoneModalOpen = true" />
                <EditPhone v-if="isEditPhoneModalOpen" @close="isEditPhoneModalOpen = false" />
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="column-right">
        <el-form :model="user">
          <div class="parent-info">
            <h2>Личная информация</h2>
            <ul class="parent-info-list">
              <li class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>ДАТА РОЖДЕНИЯ</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ $dateTimeFormatter.format(user.human.dateBirth) }}</h4>
                  </div>
                </div>
              </li>
              <li class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>ПОЛ</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ user.human.isMale ? 'Мужской' : 'Женский' }}</h4>
                  </div>
                </div>
              </li>
              <li v-if="user.human.placeBirth" class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>МЕСТО&nbsp;РОЖДЕНИЯ</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ user.human.placeBirth }}</h4>
                  </div>
                </div>
              </li>
              <li v-if="user.human.citizenship" class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>ГРАЖДАНСТВО</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ user.human.citizenship }}</h4>
                  </div>
                </div>
              </li>
              <li v-if="user.human.snils" class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>СНИЛС</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ user.human.snils }}</h4>
                  </div>
                </div>
              </li>
              <li v-if="user.human.address" class="list-item">
                <div class="list-item">
                  <div class="item-title">
                    <h5>АДРЕС</h5>
                  </div>
                  <div class="item-data">
                    <h4>{{ user.human.address }}</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import User from '@/classes/User';
import FileInfo from '@/services/classes/FileInfo';

const mounted = ref(false);
const auth: ComputedRef<Auth> = Store.Getters('auth/auth');
const user: ComputedRef<User> = Store.Item('users');

const saveAvatar = async () => {
  await Store.Update('users', user.value);
};

const dropAvatar = async () => {
  user.value.human.photoId = undefined;
  user.value.human.photo = new FileInfo();
  await Store.Update('users', user.value);
};
onBeforeMount(async () => {
  await Store.Get('users', auth.value.user.get().id);
  mounted.value = true;
});

const isEditPhoneModalOpen: Ref<boolean> = ref(false);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.size {
  padding: 0 20px 0 0;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  max-width: 100%;
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

.avatar {
  display: block;
  width: 272px;
  height: 272px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 272px;
    height: 272px;
    object-fit: cover;
  }
}

.edit-avatar {
  position: absolute;
  right: 8px;
  top: 12px;
  z-index: 1;
  display: flex;
  font-family: Roboto, Verdana, sans-serif;
  align-items: center;
  border: none;
  background: none;
}

.right-block {
  display: flex;
  justify-content: space-between;
  min-height: 60vh;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  width: calc(100% - 40px);
}

.column-left {
  width: 272px;
  border-radius: 5px;
  margin-right: 20px;
  min-height: auto;
}

.column-right {
  width: 100%;
  min-width: 272px;
  border-radius: 5px;
}

.user-avatar {
  width: 273px;
  height: 273px;
  border-radius: 5px;
}

.icon-avatar {
  display: flex;
  width: 270px;
  height: 270px;
  fill: #c7c7c7;
}

.user-info {
  display: block;
  border-bottom: 1px solid #e1e6ef;
}

.contact-mail {
  font-family: 'Open sans', sans-serif, Arial;
  display: flex;
  align-items: center;
  height: 20px;
  margin-bottom: 15px;
  color: $base-light-font-color;
}

.contact-phone {
  width: 100%;
  font-family: 'Open sans', sans-serif, Arial;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin-bottom: 15px;
  color: $base-light-font-color;
}

.contact-phone-el {
  display: flex;
  align-items: center;
}

.user-name {
  display: flex;
  min-height: 44px;
  align-items: center;
  margin-top: 6px;
}

.edit-avatar {
  position: absolute;
  right: 8px;
  top: 15px;
  z-index: 1;
}

.children {
  font-family: 'Open sans', sans-serif, Arial;
  align-items: center;
  height: 20px;
  margin-bottom: 15px;
  color: $base-light-font-color;
  padding-top: 10px;
}

.icon-children {
  display: flex;
  width: 50px;
  height: 50px;
  fill: #c7c7c7;
}

ul.children-list {
  display: flex;
  padding: 0;
  margin-top: 8px;
}

ul.children-list li {
  display: inline;
  text-decoration: none;
  margin-right: 10px;
}

ul.parent-info-list {
  padding: 0;
}

ul.parent-info-list li {
  text-decoration: none;
  margin: 0;
  border-bottom: 1px solid #e1e6ef;
}

ul.parent-info-list li:last-child {
  border-bottom: none;
}

.list-item {
  display: flex;
  justify-content: space-between;
  height: 43px;
  align-items: center;
  width: 100%;
}

.item-title {
  display: flex;
  width: 40%;
  color: $base-light-font-color;
}

.item-data {
  display: flex;
  width: 50%;
  color: #343e5c;
}

:deep(.el-form-item__label) {
  display: none;
}

:deep(.el-form-item) {
  margin: 0;
}

.hidden {
  display: none;
}

.profile-menu {
  min-width: 272px;
  background: #ffffff;
  min-height: 68vh;
}

.icon-profile {
  width: 24px;
  height: 24px;
  padding-right: 10px;
  padding-left: 10px;
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
  border-bottom: 1px solid #e0e5ee;
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

.active {
  color: #ffffff;
  fill: #ffffff;
  background: #2754eb;

  .sup-cymbol-counter {
    background: #ffffff;
    color: #2754eb;
  }
}

.tab {
  position: relative;
  width: 100%;
  color: #ffffff;
  overflow: hidden;

  &-name {
    position: relative;
  }
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tab label {
  position: sticky;
  fill: #ffffff;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #ffffff;
  background: #2754eb;
  border-bottom: 1px solid #e0e5ee;
}

.tab-content {
  max-height: 0;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
  color: #343e5c;
  padding-right: 5px;
}

.tab input:checked ~ .tab-content {
  max-height: 100vh;
}

.tab label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
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
  color: #2754eb;
  align-items: center;
  justify-content: center;
  padding: 1px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
}

.add-phone {
  display: flex;
  padding: 5px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid $base-light-font-color;
  color: $base-light-font-color;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: #ffffff;
  }

  margin: 0;
}

.edit-phone {
  display: flex;
  padding: 5px 18px;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 14px;
  border-radius: 40px;
  border: 1px solid $base-light-font-color;
  color: $base-light-font-color;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: #ffffff;
  }

  margin: 0;
}

:deep(.el-upload--picture-card) {
  font-size: 50px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 110px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  margin: 0px;
}

.button {
  display: block;
}

.button-less-800 {
  display: none;
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
  .title {
    h2 {
      font-size: 22px;
    }
  }

  .edit-button {
    font-size: 12px;
  }

  .size {
    padding: 0 5px;
  }
}

@media screen and (max-width: 670px) {
  .title {
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
  .title {
    width: calc(100% - 30px);
    font-size: 16px;
    padding: 0 15px 15px 15px;
    margin-bottom: 0px;
  }

  .hidden_540 {
    display: none;
  }

  .right-block {
    padding: 20px 20px;
    margin-right: 0;
    width: calc(100% - 40px);
  }

  .column-left {
    margin-right: 0px;
  }
}

@media screen and (max-width: 350px) {
  .title {
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

  .edit-button {
    padding: 7px 10px;
  }

  .button-name {
    display: none;
  }
}
</style>
