<template>
  <div class="card-item">
    <ChiefCard
      :employee="division.chief.employee"
      :chief-role="division.chief.employee.human.isMale ? 'Заведующий' : 'Заведующая' + ' отделением'"
      show-favourite
      favourite-domain="division"
      :favourite-id="division.id"
    />

    <div class="card-item-field">
      <div class="card-item-middle">
        <div class="division-line" data-test="treatDirection-name">
          {{ division.treatDirection.name }}
        </div>
        <div class="division-name" data-test="division-name">
          {{ division.name }}
          <div class="size320"><Rating :comments="division.divisionComments" /></div>
        </div>
        <div class="card-item-middle-bottom">
          <div class="info-block">
            <div class="contact-h3">
              <TimetableComponent :timetable="division.timetable" />
            </div>
            <AddressInfo :address="division.address" :map-id="division.id" />
            <ContactsBlock :contact-info="division.contactInfo" />
            <div class="contact-h3">
              <div class="icon-block">
                <svg class="icon-ruble">
                  <use xlink:href="#ruble"></use>
                </svg>
                <svg class="icon-credit-card">
                  <use xlink:href="#credit-card"></use>
                </svg>
                <svg class="icon-attention">
                  <use xlink:href="#attention"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-item-right">
        <a @click="$scroll('#block-footer')">
          <button>Запись на прием</button>
        </a>
        <a @click="$scroll('#leave-a-review')">
          <button class="review">Оставить отзыв</button>
        </a>
      </div>
    </div>
  </div>
  <Time />
  <Ruble />
  <CreditCard />
  <Attention />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Attention from '@/assets/svg/DivisionCard/Attention.svg';
import CreditCard from '@/assets/svg/DivisionCard/CreditCard.svg';
import Ruble from '@/assets/svg/DivisionCard/Ruble.svg';
import Division from '@/classes/Division';
import AddressInfo from '@/components/AddressInfo.vue';
import ChiefCard from '@/components/ChiefCard.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import Rating from '@/components/Rating.vue';
import TimetableComponent from '@/components/TimetableComponent.vue';

export default defineComponent({
  name: 'DivisionInfo',
  components: {
    AddressInfo,
    ChiefCard,
    TimetableComponent,
    Rating,
    Attention,
    Ruble,
    CreditCard,
    ContactsBlock,
  },
  props: {
    division: { type: Object as PropType<Division>, required: true },
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
