<template>
  <div class="user-mini-info">
    <div class="avatar-block">
      <div class="avatar">
        <img :src="user.human.photo.getFileUrl()" alt="user-photo" @error="user.human.photo.errorImg($event)" />
      </div>
    </div>
    <div class="right-block">
      <el-form :model="user">
        <div class="user-name">
          <div class="user-name-field">
            <el-form-item label="Имя">
              <h4>
                <b>{{ user.human.getFullName() }}</b>
              </h4>
            </el-form-item>
          </div>
        </div>
        <div class="user-info">
          <div class="contact-mail">
            <el-form-item prop="email" label="Email">
              <h4>{{ user.email }}</h4>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/services/interfaces/IUser';
export default defineComponent({
  name: 'UserInfoMini',

  setup() {
    const store = useStore();

    const user: Ref<IUser> = computed(() => store.getters['users/item']);

    return {
      user,
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
  margin-bottom: 30px;
}

.user-name {
  display: flex;
  justify-content: center;
}

.user-name-field {
  display: flex;
  font-family: 'Open sans', sans-serif, Arial;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  min-height: 20px;
  margin: 0 10px 5px 10px;
  text-align: center;
}

.user-mini-info {
  height: 100;
  align-content: center;
}

h4 {
  margin: 0;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
  padding: 0;
}

:deep(.el-form-item__label) {
  display: none;
}

:deep(.el-form-item) {
  margin: 0;
}

:deep(.el-form-item__content) {
  line-height: 20px;
}

.right-block {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 560px) {
  .user-mini-info {
    display: flex;
    justify-content: left;
    height: 120px;
    align-items: center;
    background: #ffffff;
  }
  .avatar-block {
    padding: 0;
    margin: 10px 20px 0 10px;
  }
  .user-name-field {
    text-align: left;
    margin: 0 10px 5px 0px;
  }
  .contact-mail {
    display: flex;
    justify-content: left;
    align-items: center;
    color: #a3a9be;
    height: 20px;
    margin-bottom: 0;
  }
}
</style>
