<template>
  <div v-if="contactInfo.telephoneNumbers.length > 0" class="contact-h3">
    <div class="item">
      <svg class="icon-phone">
        <use xlink:href="#phone"></use>
      </svg>
    </div>
    <div class="item-p">
      <div v-for="phone in contactInfo.telephoneNumbers" :key="phone.id" class="item">{{ phone.number }}</div>
    </div>
  </div>
  <div class="contact-h3">
    <div class="item">
      <svg class="icon-email">
        <use xlink:href="#email"></use>
      </svg>
    </div>
    <div class="item-p">
      <div v-for="email in contactInfo.emails" :key="email.id" class="item">{{ email.address }}</div>
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
</style>
