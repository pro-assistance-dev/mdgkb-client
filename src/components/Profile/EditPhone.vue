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
    const form = ref();
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
      Provider.store.dispatch('users/update', user.value);
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
@import '@/assets/styles/elements/callback.scss';

.modal-editPhone {
  padding: 20px;
  padding-top: 0;
  width: 310px;
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
</style>
