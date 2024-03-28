<template>
  <el-form-item label="Email:">
    <el-input v-model="email.address" @blur="update" />
  </el-form-item>
  <el-form-item label="Описание:">
    <el-input v-model="email.description" @blur="update" />
  </el-form-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import Email from '@/services/classes/Email';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  email: {
    type: Object as PropType<Email>,
    required: true,
  },
});

const update = async () => {
  await Provider.store.dispatch('emails/update', props.email);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.admin-add {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  position: absolute;
  top: 23px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}

.contact-container {
  width: calc(100% - 62px);
  position: relative;
  padding: 0 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0px 20px 20px 20px;
  background: #dff2f8;
}

.contact-container-item {
  position: relative;
  width: calc(100% - 42px);
  margin: 0px 10px 20px 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.list-number {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
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
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

@media screen and (max-width: 400px) {
  .contact-container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }

  .contact-container-item {
    width: calc(100% - 22px);
    margin: 0px 0px 20px 0px;
  }

  .admin-del {
    padding: 1px 0px;
  }

  .bottom-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
  }
}
</style>
