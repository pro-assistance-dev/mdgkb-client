<template>
  <div v-if="contactInfo.telephoneNumbers[0].number" class="block-line">
    <div class="item">
      <svg class="icon-phone">
        <use xlink:href="#phone"></use>
      </svg>
    </div>
    <div class="item-p">
      <div v-for="phone in contactInfo.telephoneNumbers" :key="phone.id" class="item">{{ phone.number }}</div>
    </div>
  </div>
  <div v-if="contactInfo.emails[0].address" class="contact-h3">
    <div class="item">
      <svg class="icon-email">
        <use xlink:href="#email"></use>
      </svg>
    </div>
    <div class="item-p">
      <div v-for="email in contactInfo.emails" :key="email.id" class="item">
        {{ email.address }} <span v-if="email.description">: {{ email.description }} </span>
      </div>
    </div>
  </div>
  <Phone />
  <Email />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Email from '@/assets/svg/DivisionCard/Email.svg';
import Phone from '@/assets/svg/DivisionCard/Phone.svg';
import ContactInfo from '@/services/classes/ContactInfo';

export default defineComponent({
  name: 'ContactsBlock',
  components: {
    Phone,
    Email,
  },
  props: {
    contactInfo: { type: Object as PropType<ContactInfo>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.icon-phone {
  margin-left: 1px;
  width: $width;
  height: $height;
  fill: $site_dark_gray;
}

.icon-email {
  width: $width;
  height: $height;
  fill: $site_dark_gray;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin-top: 5px;
}

.block-line {
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
