<template>
  <div v-if="contactInfo.telephoneNumbers[0].number" class="contact-h3">
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
import IContactInfo from '@/interfaces/contacts/IContactInfo';

export default defineComponent({
  name: 'ContactsBlock',
  components: {
    Phone,
    Email,
  },
  props: {
    contactInfo: { type: Object as PropType<IContactInfo>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/division-info.scss';

// test block
.test {
  width: 290px;
  height: 290px;
  background: #c4c4c4;
}

.division-name {
  margin: 0px;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  margin-left: -1px;
  width: 23px;
  height: 23px;
  fill: #2754eb;
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

.item {
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}
.hidden {
  display: none;
}
</style>
