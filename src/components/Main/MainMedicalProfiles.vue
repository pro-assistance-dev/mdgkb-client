<template>
  <component :is="'MainContainer'" header-title="Профили медицинской помощи" footer-button-title="Все профили">
    <div class="main-medical-profiles">
      <div v-for="item in items" :key="item.name" class="main-medical-profiles-card">
        {{ item.name }}
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';

export default defineComponent({
  name: 'MainMedicalProfiles',
  components: { MainContainer },
  setup() {
    const items = [
      {
        name: 'Педиатрия',
      },
      {
        name: 'Нейрохирургия',
      },
      {
        name: 'Травматология',
      },
      {
        name: 'Ортопедия',
      },
      {
        name: 'Челюстно-лицевая хирургия',
      },
      {
        name: 'Детская хирургия',
      },
      {
        name: 'Детская кардиология',
      },
      {
        name: 'Ревматология',
      },
      {
        name: 'Пульмонология',
      },
      {
        name: 'Неврология',
      },
      {
        name: 'Гематология',
      },
      {
        name: 'Детская онкология',
      },
    ];

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-medical-profiles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 30px;
  &-card {
    text-align: center;
    border-radius: 5px;
    background-color: #34adcb;
    color: white;
    letter-spacing: 1px;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 20px;
    padding-bottom: 100%;
  }
}
</style>
