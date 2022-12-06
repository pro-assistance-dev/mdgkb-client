<template>
  <div class="modal-field" tabindex="-1" @click.self="close" @keydown.esc="close">
    <div class="modal-box">
      <el-form class="modal-callback">
        <el-form-item label="Название категории:">
          <el-input v-model="dishesGroup.name" placeholder="Введите название"></el-input>
        </el-form-item>
        <div class="button-field">
          <button class="button-cancel" @click="close">Отмена</button>
          <button class="button-save" @click="saveDishesGroup">Сохранить</button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AddGroupForm',
  emits: ['close'],

  setup(_, { emit }) {
    const dishSampleConstructorVisible: Ref<boolean> = ref(false);
    const dishesGroup: Ref<IDishesGroup> = computed(() => Provider.store.getters['dishesGroups/item']);
    const dishSample: Ref<IDishSample> = computed(() => Provider.store.getters['dishesSamples/item']);
    const dishesGroupConstructorVisible: Ref<boolean> = ref(false);
    const close = () => {
      emit('close');
    };

    const saveDishSample = async () => {
      await Provider.store.dispatch('dishesSamples/create', dishSample.value);
      dishSampleConstructorVisible.value = false;
    };

    const saveDishesGroup = async () => {
      await Provider.store.dispatch('dishesGroups/create', dishesGroup.value);
      dishesGroupConstructorVisible.value = false;
    };

    return {
      close,
      saveDishSample,
      dishesGroup,
      saveDishesGroup,
    };
  },
});
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

.modal-field {
  width: 100%;
  height: 100%;
}

.modal-box {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  position: absolute;
  top: 25%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 101;
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  padding-top: 20px;
}

.button-field {
  display: flex;
  justify-content: right;
  margin-top: 15px;
}

.modal-callback {
  padding: 20px;
  padding-top: 0;
  height: auto;
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.new-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
}

.new-group-title {
  font-size: 14px;
  color: #838385;
  display: flex;
  justify-content: left;
  align-items: center;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  height: 30px;
  width: 340px;
}

.button-save {
  height: 30px;
  border: 1px solid #449d7c;
  border-radius: 15px;
  background: #d6ecf4;
  color: #449d7c;
  padding: 0 15px;
  transition: 0.3s;
}

.button-save:hover {
  background: #449d7c;
  color: #ffffff;
}

.button-cancel {
  height: 30px;
  border: 1px solid #1979cf;
  border-radius: 15px;
  background: #d6ecf4;
  color: #1979cf;
  padding: 0 15px;
  transition: 0.3s;
  margin-right: 10px;
}

.button-cancel:hover {
  background: #1979cf;
  color: #ffffff;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 30px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  color: #a3a9be;
  padding: 0 !important;
  margin-left: 5px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: left;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}
</style>
