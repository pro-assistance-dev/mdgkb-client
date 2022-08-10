<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <div class="button-field">
        <BaseModalButtonClose type="button" @click="close" />
      </div>
      <el-form ref="form" class="modal-editPhone" :model="user" :rules="rules">
        <div class="modal-editPhone-title">
          <h3>Номер телефона</h3>
        </div>

        <div class="form-editPhone">
          <label for="phone" class="label phone-name">Телефон:</label>
          <div class="phone-block">
            <el-form-item prop="phone">
              <el-input
                id="phone"
                v-model="user.phone"
                type="tel"
                class="phone-name"
                placeholder="+7(___) ___ __ __"
                @input="user.formatPhoneNumber()"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-editPhone">
          <div class="send">
            <button v-if="user.phone.length > 17" class="submit" @click.prevent="submit">Сохранить</button>
            <button v-else type="button" class="submit-grey">Сохранить</button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import User from '@/classes/User';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import IFormStatus from '@/interfaces/IFormStatus';
import IUser from '@/interfaces/IUser';
import router from '@/router';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'EditPhone',
  components: {
    BaseModalButtonClose,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const store = useStore();
    const form = ref();
    const mounted = ref(false);
    const userId: ComputedRef<string> = computed(() => Provider.store.getters['auth/user']?.id);
    const user: ComputedRef<IUser> = computed(() => Provider.store.getters['users/item']);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);

    const rules = {
      phone: [{ validator: User.validatePhone, trigger: 'blur' }],
    };

    const loadUser = async () => {
      await Provider.store.dispatch('users/get', userId.value);
    };

    const close = () => {
      emit('close');
    };

    onMounted(loadUser);

    const submit = () => {
      router.push('/profile');
      emit('close');
      store.dispatch('users/update', user.value);
      emit('close');
      ElNotification({
        title: 'Телефон',
        message: 'Номер телефона успешно изменен',
        type: 'success',
        duration: 2000,
      });
      // if (validate(form)) {
      //   return;
      // }
    };

    return {
      mounted,
      user,
      formStatuses,
      submit,
      close,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
/* .hidden {
  display: none;
} */

* {
  padding: 0px;
  margin: 0px;
}

.modal-field {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  left: 50%;
  transform: translateX(-50%);
}

.modal-box {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}

.button-field {
  display: flex;
  justify-content: right;
}

.modal-editPhone {
  padding: 20px;
  padding-top: 0;
  width: 310px;
  height: auto;
}

input {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  width: 250px;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 1px solid #cecece;
  background: #f6f6f6;
  border-radius: 8px;
  margin-top: 10px;
}

.submit {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 8px 14px;
  width: 120px;
  color: white;
  background-color: #f3911c;
}
.submit:hover {
  background-color: darken(#f3911c, 10%);
}

.submit:focus {
  outline: none;
}

.submit-grey {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 8px 14px;
  width: 120px;
  color: white;
  background-color: #a3a9be;
}

.form-editPhone {
  margin: 20px;
  padding-top: 5px;
}

.modal-editPhone-title {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #4a4a4a;
  font-weight: normal;
}

.field-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.phone-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.send {
  display: flex;
  justify-content: center;
}

.field-text {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #9d9d9d;
  font-weight: normal;
}

.sr-only {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
:deep(.el-notification) {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
</style>
