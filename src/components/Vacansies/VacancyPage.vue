<template>
  <div class="page-container">
    <div class="card-item">
      <div class="vacancy-block">
        <div class="vacancy-title">{{ vacancy.title }}</div>
        <div class="vacancy-salary">{{ vacancy.salary }}</div>
      </div>
      <div class="vacancy-block">
        <div v-if="vacancy.experience"><b>Требуемый опыт работы:</b> {{ vacancy.experience }}</div>
        <div v-if="vacancy.schedule"><b>График работы:</b> {{ vacancy.schedule }}</div>
      </div>
      <div v-if="vacancy.duties" class="vacancy-block">
        <div><b>Должностные обязанности:</b></div>
        <div>{{ vacancy.duties }}</div>
      </div>
      <div v-if="vacancy.requirements" class="vacancy-block">
        <div><b>Требования к кандидату:</b></div>
        <div>{{ vacancy.requirements }}</div>
      </div>
      <div v-if="vacancy.description" class="vacancy-block">
        <div><b>Контактная информация:</b></div>
        <div>{{ vacancy.description }}</div>
      </div>
      <div class="vacancy-footer">
        <button @click="openRespondForm">Откликнуться</button>
      </div>
      <!-- <div class="">{{ vacancy.schedule }}</div> -->
    </div>
    <div v-if="showForm" id="vacancy-form" class="card-item">
      <div class="vacancy-title vacancy-block">Форма для отклика</div>
      <VacancyResponseForm />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import VacancyResponseForm from '@/components/Vacansies/VacancyResponseForm.vue';
import IVacancy from '@/interfaces/vacancies/IVacancy';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'VacancyPage',
  components: { VacancyResponseForm },

  setup() {
    const store = useStore();
    const route = useRoute();
    const showForm: Ref<boolean> = ref(false);
    const vacancy: ComputedRef<IVacancy> = computed(() => store.getters['vacancies/vacancy']);

    const showFormFunc = () => {
      showForm.value = true;
    };

    const openRespondForm = async () => {
      await showFormFunc();
      scroll('vacancy-form');
    };

    onBeforeMount(async () => {
      await store.dispatch('vacancies/get', route.params['id']);
      if (route.query.respondForm) {
        openRespondForm();
      }
    });

    return {
      vacancy,
      openRespondForm,
      showForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
:deep(.card-item) {
  font-weight: 16px;
  margin-bottom: 20px;
  button {
    border-radius: 20px;
    background-color: #31af5e;
    padding: 10px 20px;
    height: auto;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }
}
.vacancy-title {
  font-size: 24px;
  font-weight: bold;
}
.vacancy-block {
  margin-bottom: 20px;
}
.vacancy-footer {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 30px;
}
</style>
