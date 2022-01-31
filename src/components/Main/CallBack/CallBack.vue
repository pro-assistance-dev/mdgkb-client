<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <div class="button-field">
        <BaseModalButtonClose @click="close" />
      </div>
      <form class="modal-callback">
        <div class="modal-callback-title">
          <h3>Заказ обратного звонка</h3>
        </div>
        <div class="form-callback">
          <label for="name" class="field-name">Имя</label>
          <div class="name-block">
            <input id="name" type="text" class="field-name" name="name" placeholder="Ваше имя" />
          </div>
        </div>
        <div class="form-callback">
          <label for="phone" class="phone-name">Телефон</label>
          <div class="phone-block">
            <input id="phone" type="text" class="phone-name" placeholder="+7(xxx) xxx xx xx" />
          </div>
        </div>
        <div class="field-text">Мы перезвоним Вам в течение дня</div>
        <div class="form-callback">
          <div class="send">
            <button type="submit" class="submit">Заказать</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseModalButtonClose from '@/components/Base/BaseModalButtonClose.vue';
export default {
  components: {
    BaseModalButtonClose,
  },
  emits: ['close'],
  mounted() {
    this.$el.focus();
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}

* {
  padding: 0px;
  margin: 0px;
}

.modal-field {
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 93%;
}

.modal-box {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.button-field {
  display: flex;
  justify-content: right;
}

.modal-callback {
  padding: 20px;
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
  background: #ffffff;
  border-radius: 5px;
  padding: 8px 14px;
  width: 120px;
}
.submit:hover {
  box-shadow: inset 0px -20px 20px #ffffff;
}

.submit:focus {
  outline: none;
}

.form-callback {
  margin: 20px;
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
</style>
