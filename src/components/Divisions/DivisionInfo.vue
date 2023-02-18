<template>
  <HeaderInfo :left-width="'330px'" :background="'#ffffff'" :is-single="false">
    <template #foto>
      <ChiefCard
        :employee="division.chief.employee"
        :chief-role="division.chief.employee.human.isMale ? 'Заведующий' : 'Заведующая' + ' отделением'"
        show-favourite
        favourite-domain="division"
        :favourite-id="division.id"
      />
    </template>

    <template #small-title>
      {{ division.treatDirection.name }}
    </template>

    <template #big-title>
      {{ division.name }}
    </template>

    <template #tags>
      <Rating :comments="division.divisionComments" />
    </template>

    <template #contact>
      <TimetableComponent :timetable="division.timetable" />
      <AddressInfo :address="division.address" :map-id="division.id" />
      <ContactsBlock :contact-info="division.contactInfo" />
    </template>

    <template #icons>
      <svg class="icon-ruble">
        <use xlink:href="#ruble"></use>
      </svg>
      <svg class="icon-credit-card">
        <use xlink:href="#credit-card"></use>
      </svg>
      <svg class="icon-attention">
        <use xlink:href="#attention"></use>
      </svg>
    </template>

    <template #buttons>
      <a @click="$scroll('#block-footer')">
        <button>Запись на прием</button>
      </a>
      <a @click="$scroll('#leave-a-review')">
        <button class="review">Оставить отзыв</button>
      </a>
    </template>
  </HeaderInfo>
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
import AddressInfo from '@/components/AddressInfo.vue';
import HeaderInfo from '@/components/Base/HeaderInfo.vue';
import ChiefCard from '@/components/ChiefCard.vue';
import ContactsBlock from '@/components/ContactsBlock.vue';
import Rating from '@/components/Rating.vue';
import TimetableComponent from '@/components/TimetableComponent.vue';
import IDivision from '@/interfaces/IDivision';

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
    HeaderInfo,
  },
  props: {
    division: { type: Object as PropType<IDivision>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/division-info.scss';
</style>
