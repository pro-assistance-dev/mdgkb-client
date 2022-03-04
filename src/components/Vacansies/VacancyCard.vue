<template>
  <div class="card-item-container">
    <div class="card-item">
      <div>
        <div class="card-item-title">
          {{ vacancy.title }}
        </div>
        <hr class="hr-line" />
        <div class="card-item-body">
          <div v-if="vacancy.getSalary()">
            <div>Заработная плата:</div>
            <div class="color-font">
              <i> {{ vacancy.getSalary() }} </i>
            </div>
          </div>
          <div v-if="vacancy.experience">
            <div class="padding-block">Опыт работы:</div>
            <div class="color-font">
              <i> {{ vacancy.experience }} </i>
            </div>
          </div>
        </div>
      </div>
      <div class="card-item-footer">
        <div class="contact-block"><ContactBlock :contact-info="vacancy.contactInfo" /></div>
        <div class="button-block">
          <button @click="$router.push(`/vacancies/${vacancy.slug}`)">Подробнее</button>
          <button class="respond-btn" @click="$router.push(`/vacancies/${vacancy.slug}?respondForm=open`)">Откликнуться</button>
        </div>
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
  padding: 15px;
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
    border-radius: 40px;
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

.color-font {
  color: #2754eb;
}

.card-item-title {
  font-size: 16px;
  min-height: 60px;
  color: #343e5c;
  font-weight: bold;
}

.padding-block {
  padding-top: 5px;
}

.card-item-body {
  padding-top: 5px;
}

.card-item-footer {
  display: block;
}

.contact-block {
  padding-bottom: 15px;
}

.button-block {
  display: flex;
  justify-content: space-evenly;
}

.hr-line {
  border: none;
  background-color: #e4e5e7; /* Цвет линии для браузера Firefox и Opera */
  height: 1px;
  background: #e4e5e7;
}
</style>
