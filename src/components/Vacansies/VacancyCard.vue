<template>
  <div class="card-item-container">
    <div class="card-item">
      <div>
        <div class="card-item-title">
          <b> {{ vacancy.title }}</b>
        </div>
        <div class="card-item-body">
          <div v-if="vacancy.getSalary()">
            <div>
              <b><i> Заработная плата:</i></b>
            </div>
            {{ vacancy.getSalary() }}
          </div>
          <div v-if="vacancy.experience">
            <div>
              <b><i> Опыт работы:</i></b>
            </div>
            {{ vacancy.experience }}
          </div>
          <ContactBlock :contact-info="vacancy.contactInfo" />
        </div>
      </div>
      <div class="card-item-footer">
        <button @click="$router.push(`/vacancies/${vacancy.slug}`)">Подробнее</button>
        <button class="respond-btn" @click="$router.push(`/vacancies/${vacancy.slug}?respondForm=open`)">Откликнуться</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ContactBlock from '@/components/ContactBlock.vue';
import IVacancy from '@/interfaces/IVacancy';

export default defineComponent({
  name: 'VacanncyCard',
  components: { ContactBlock },
  props: {
    vacancy: {
      type: Object as PropType<IVacancy>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.card-item-container {
  width: 300px;
  height: auto;
  padding-bottom: 40px;
}
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px;
  height: 100%;
  &-title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  &-footer {
    display: flex;
    justify-content: space-evenly;
  }
  button {
    cursor: pointer;
    padding: 7px 15px;
    letter-spacing: 1px;
    border-radius: 5px;
    border: none;
    background-color: #2754ec;
    color: white;
    &:hover {
      background-color: lighten(#2754ec, 10%);
    }
  }
  .respond-btn {
    background-color: #31af5e;
    &:hover {
      background-color: lighten(#31af5e, 10%);
    }
  }
}
</style>
