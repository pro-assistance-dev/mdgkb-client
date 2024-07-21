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
                @input="($event) => (user.phone = PhoneService.Format($event))"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-editPhone">
          <div class="send">
            <PButton v-if="user.phone.length > 17" skin="profile" text="Сохранить" @click="submit" />
            <PButton v-else skin="profile" type="disabled" text="Сохранить" />
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';

import FormStatus from '@/classes/FormStatus';
import User from '@/classes/User';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import PhoneService from '@/services/PhoneService';

export default defineComponent({
  name: 'EditPhone',
  components: {
    BaseModalButtonClose,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const user: User = UsersStore.Item();
    const formStatuses: FormStatus[] = FormStatusesStore.Items();

    const rules = {
      phone: [{ validator: PhoneService.validatePhone, trigger: 'blur' }],
    };

    const close = () => {
      emit('close');
    };

    const submit = async () => {
      Router.To('/profile');
      emit('close');
      await UsersStore.Update();
      emit('close');
      ElNotification({
        title: 'Телефон',
        message: 'Номер телефона успешно изменен',
        type: 'success',
        duration: 2000,
      });
    };

    return {
      user,
      formStatuses,
      submit,
      close,
      rules,
      PhoneService,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

.phone-name {
  font-family: 'Comfortaa', 'Open-sans', sans-serif;
  color: #4a4a4a;
  font-weight: normal;
}

.send {
  display: flex;
  justify-content: center;
}

.modal-editPhone {
  padding: 20px;
  padding-top: 0;
  width: 270px;
  height: auto;
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
  background-color: $base-light-font-color;
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
</style>
