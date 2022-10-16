<template>
  <div class="card-item">
    <ChiefCard :chief="course.getMainTeacher().doctor" chief-role="Руководитель курса" :show-favourite="false" />

    <div class="card-item-field">
      <div class="card-item-middle">
        <!--        <div class="division-line" data-test="treatDirection-name">-->
        <!--          {{ division.treatDirection.name }}-->
        <!--        </div>-->
        <div class="division-name" data-test="division-name">
          {{ course.getFullName() }}
        </div>
        <div class="card-item-middle-bottom">
          <div class="info-block">
            <div class="contact-h3">
              <TimetableComponent :timetable="timetable" />
            </div>
            <AddressInfo :address="address" />
            <ContactsBlock :contact-info="contactInfo" />
          </div>
        </div>
      </div>

      <div class="card-item-right">
        <a @click="$scroll('#block-footer')">
          <button>Запросить обратную связь</button>
        </a>
      </div>
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ContactInfo from '@/classes/contacts/ContactInfo';
import Email from '@/classes/contacts/Email';
import TelephoneNumber from '@/classes/contacts/TelephoneNumber';
import Timetable from '@/classes/timetable/Timetable';
import AddressInfo from '@/components/AddressInfo.vue';
import ChiefCard from '@/components/ChiefCard.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import TimetableComponent from '@/components/TimetableComponent.vue';
import IResidencyCourse from '@/interfaces/IResidencyCourse';

export default defineComponent({
  name: 'ResidencyCourseInfo',
  components: {
    ChiefCard,
    TimetableComponent,
    AddressInfo,
    ContactsBlock,
  },
  props: {
    course: { type: Object as PropType<IResidencyCourse>, required: true },
  },
  setup() {
    const contactInfo = new ContactInfo();
    const phone = new TelephoneNumber();
    phone.number = '+7 (495) 959-88-01 доб. ординатура 11-36';
    contactInfo.telephoneNumbers = [phone];

    const email = new Email();
    email.address = 'pdo@morozdgkb.ru';
    contactInfo.emails = [email];
    const address = '4-й Добрынинский переулок 1/9 корпус 11, 2 этаж';
    const timetable = Timetable.CreateStandartTimetable([]);
    return { contactInfo, address, timetable };
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
