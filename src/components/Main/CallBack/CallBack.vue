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
                @input="callback.formatPhoneNumber()"
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
            <button class="submit" @click.prevent="submit">Заказать</button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CallbackRequest from '@/classes/CallbackRequest';
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
import ICallbackRequest from '@/interfaces/ICallbackRequest';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'CallBack',
  components: {
    BaseModalButtonClose,
  },
  emits: ['close'],

  setup(_, { emit }) {
    const store = useStore();
    const callbackForm = ref();
    const callback: ComputedRef<ICallbackRequest> = computed(() => store.getters['callbacks/item']);
    const rules = {
      name: [{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }],
      phone: [{ validator: CallbackRequest.validatePhone, trigger: 'blur' }],
    };

    const close = () => {
      emit('close');
    };

    const submit = () => {
      if (!validate(callbackForm)) {
        return;
      }
      store.dispatch('callbacks/create');
      emit('close');
      ElNotification({
        title: 'Обратный звонок',
        message: 'Спасибо за заявку.\nМы вам перезвоним в ближайшее время',
        type: 'success',
        duration: 2000,
      });
    };

    return {
      close,
      submit,
      callback,
      callbackForm,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/callback.scss';
</style>
