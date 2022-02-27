<template>
  <div class="vacansies-container">
    <div class="vacansies-container-left">
      <VacanciesFilters />
    </div>
    <div>
      <h2>Вакансии</h2>
      <div class="vacansies-container-right">
        <VacancyCard v-for="item in vacancies" :key="item.id" :vacancy="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import VacanciesFilters from '@/components/Vacansies/VacanciesFilters.vue';
import VacancyCard from '@/components/Vacansies/VacancyCard.vue';

export default defineComponent({
  name: 'VacanciesList',
  components: { VacanciesFilters, VacancyCard },

  setup() {
    const store = useStore();
    const vacancies = computed(() => store.getters['vacancies/vacancies']);

    return {
      vacancies,
    };
  },
});
</script>

<style lang="scss" scoped>
.vacansies-container {
  display: flex;
  &-left {
    margin-right: 30px;
    flex-shrink: 0;
    width: 300px;
    position: sticky;
    top: 79px;
    height: 100%;
  }
  &-right {
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-gap: 5px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
}
</style>
