<template>
  <div v-if="full" class="contact-container">
    <el-form-item label="Описание">
      <el-input :model-value="contactInfo.description" @input="(e) => contactInfo.updateDescription(e)" />
    </el-form-item>
    <el-form-item label="Время работы">
      <el-input :model-value="contactInfo.time" @input="(e) => contactInfo.updateTime(e)" />
    </el-form-item>
    <el-form-item label="Широта (для карты)">
      <el-input :model-value="contactInfo.latitude" @input="(e) => contactInfo.updateLatitude(e)" />
    </el-form-item>
    <el-form-item label="Долгота (для карты)">
      <el-input :model-value="contactInfo.longitude" @input="(e) => contactInfo.updateLongitutde(e)" />
    </el-form-item>
  </div>

  <div class="contact-container" :style="{ background: contactInfo.phones.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !contactInfo.phones.length ? '#c4c4c4' : '#303133' }">Телефоны</div>
      <button class="admin-add" @click.prevent="contactInfo.addTelephoneNumber()">+ Добавить</button>
    </div>

    <div v-for="(phone, i) in contactInfo.phones" :key="phone" class="contact-container-item">
      <button class="admin-del" @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.phones, [])">Удалить</button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <el-form-item label="Номер телефона:">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="Описание:">
        <el-input v-model="phone.description" />
      </el-form-item>
    </div>
  </div>

  <div class="contact-container" :style="{ background: contactInfo.emails.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !contactInfo.emails.length ? '#c4c4c4' : '#303133' }">Электронная почта</div>
      <button class="admin-add" @click.prevent="contactInfo.addEmail()">+ Добавить</button>
    </div>

    <div v-for="(email, i) in contactInfo.emails" :key="email" class="contact-container-item">
      <button class="admin-del" @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.emails, contactInfo.emailsForDelete)">
        Удалить
      </button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <el-form-item label="Email:">
        <el-input v-model="email.address" />
      </el-form-item>
      <el-form-item label="Описание:">
        <el-input v-model="email.description" />
      </el-form-item>
    </div>
  </div>

  <div class="contact-container" :style="{ background: contactInfo.postAddresses.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !contactInfo.postAddresses.length ? '#c4c4c4' : '#303133' }">Почтовые адреса</div>
      <button class="admin-add" @click.prevent="contactInfo.addPostAddress()">+ Добавить</button>
    </div>

    <div v-for="(postAddress, i) in contactInfo.postAddresses" :key="postAddress" class="contact-container-item">
      <button
        class="admin-del"
        @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.postAddresses, contactInfo.postAddressesForDelete)"
      >
        Удалить
      </button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <el-form-item label="Почтовый адрес:">
        <el-input v-model="postAddress.address" />
      </el-form-item>
      <el-form-item label="Описание:">
        <el-input v-model="postAddress.description" />
      </el-form-item>
    </div>
  </div>

  <div class="contact-container" :style="{ background: contactInfo.websites.length ? '' : '#F9FAFB' }">
    <div class="bottom-buttons">
      <div class="title" :style="{ color: !contactInfo.websites.length ? '#c4c4c4' : '#303133' }">Сайты</div>
      <button class="admin-add" @click.prevent="contactInfo.addWebsite()">+ Добавить</button>
    </div>

    <div v-for="(website, i) in contactInfo.websites" :key="website" class="contact-container-item">
      <button
        class="admin-del"
        @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.websites, contactInfo.websitesForDelete)"
      >
        Удалить
      </button>
      <div class="list-number">
        {{ i + 1 }}
      </div>
      <el-form-item label="Адрес сайта:">
        <el-input v-model="website.address" />
      </el-form-item>
      <el-form-item label="Описание:">
        <el-input v-model="website.description" />
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import ContactInfo from '@/services/classes/ContactInfo';

export default defineComponent({
  name: 'ContactsForm',
  props: {
    contactInfo: {
      type: Object as PropType<ContactInfo>,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const form = ref();

    return {
      form,
    };
  },
});
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
