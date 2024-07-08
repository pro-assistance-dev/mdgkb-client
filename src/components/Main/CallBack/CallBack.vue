<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <div class="button-field">
        <BaseModalButtonClose @click="close" />
      </div>
      <el-form ref="callbackForm" class="modal-callback" :model="callback" :rules="rules">
        <div class="modal-callback-title">
          <h3>Заказ обратного звонка</h3>
        </div>
        <div class="form-callback">
          <label for="name" class="label field-name">Имя:</label>
          <div class="name-block">
            <el-form-item prop="name">
              <el-input id="name" v-model="callback.name" type="text" class="field-name" name="name" placeholder="Ваше имя" />
            </el-form-item>
          </div>
        </div>
        <div class="form-callback">
          <label for="phone" class="label phone-name">Телефон:</label>
          <div class="phone-block">
            <el-form-item prop="phone">
              <el-input
                id="phone"
                v-model="callback.phone"
                type="tel"
                class="phone-name"
                placeholder="+7(___) ___ __ __"
                @input="($event) => (callback.phone = PhoneService.Format($event))"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-callback">
          <label for="phone" class="label phone-description">Комментарий:</label>
          <div class="phone-block">
            <el-form-item prop="description">
              <el-input id="phone" v-model="callback.description" type="textarea" class="phone-description" placeholder="Комментарий" />
            </el-form-item>
          </div>
        </div>
        <div class="field-text">Мы перезвоним Вам в течение дня</div>
        <div class="form-callback">
          <div class="send">
            <button v-if="callback.phone.length > 17" class="submit" @click.prevent="submit">Заказать</button>
            <button v-else type="button" class="submit-grey">Заказать</button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import CallbackRequest from '@/services/classes/CallbackRequest';
import PhoneService from '@/services/PhoneService';
import validate from '@/services/validate';

const emits = defineEmits(['close']);

const callbackForm = ref();
const callback: ComputedRef<CallbackRequest> = Store.Item('callback');
const rules = {
  name: [{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }],
  phone: [{ validator: PhoneService.validatePhone, trigger: 'blur' }],
};

const close = () => {
  emits('close');
};

const submit = () => {
  if (!validate(callbackForm)) {
    return;
  }
  Store.Dispatch('callbacks/create');
  emits('close');
  PHelp.Notification.Success('Спасибо за заявку.\nМы Вам перезвоним в ближайшее время');
};
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

.modal-callback {
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

.form-callback {
  margin: 20px;
  padding-top: 5px;
}

.modal-callback-title {
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
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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
</style>
