<template>
  <div class="page-container">
    <div class="card-item">
      <div class="vacancy-block">
        <div class="vacancy-title">{{ vacancy.title }}</div>
        <div class="vacancy-salary">
          <i>{{ vacancy.getSalary() }}</i>
        </div>
      </div>
      <div class="vacancy-block">
        <div v-if="vacancy.experience">
          <b>Требуемый опыт работы:</b> <i class="experience">{{ vacancy.experience }}</i>
        </div>
        <div v-if="vacancy.schedule" class="schedule-block">
          <div class="schedule-item"><b>График работы:</b></div>
          <span>{{ vacancy.schedule }}</span>
        </div>
      </div>
      <div v-if="vacancy.vacancyDuties" class="vacancy-block">
        <div><b>Должностные обязанности:</b></div>
        <ul>
          <li v-for="duty in vacancy.vacancyDuties" :key="duty.id">
            <i>{{ duty.name }}</i>
          </li>
        </ul>
      </div>
      <div v-if="vacancy.vacancyRequirements" class="vacancy-block">
        <div><b>Требования к кандидату:</b></div>
        <ul>
          <li v-for="requirement in vacancy.vacancyRequirements" :key="requirement.id">
            <i>{{ requirement.name }}</i>
          </li>
        </ul>
      </div>
      <div v-if="vacancy.contactInfo" class="vacancy-block">
        <div><b>Контактная информация:</b></div>
        <div class="vice-doctor-title">
          <ContactBlock :contact-info="vacancy.contactInfo" />
        </div>
      </div>
      <div class="vacancy-footer">
        <button @click="openRespondForm">Откликнуться</button>
      </div>
      <!-- <div class="">{{ vacancy.schedule }}</div> -->
    </div>
    <div v-if="showForm" id="vacancy-form" class="card-item">
      <div class="vacancy-title vacancy-block">Форма для отклика</div>
      <VacancyResponseForm :vacancy-id="vacancy.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import ContactBlock from '@/components/ContactBlock.vue';
import VacancyResponseForm from '@/components/Vacansies/VacancyResponseForm.vue';
import IVacancy from '@/interfaces/IVacancy';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'VacancyPage',
  components: { ContactBlock, VacancyResponseForm },

  setup() {
    const store = useStore();
    const route = useRoute();
    const showForm: Ref<boolean> = ref(false);
    const vacancy: ComputedRef<IVacancy> = computed(() => store.getters['vacancies/vacancy']);

    const showFormFunc = () => {
      showForm.value = true;
    };

    const openRespondForm = () => {
      showFormFunc();
      scroll('vacancy-form');
    };

    onBeforeMount(async () => {
      await store.dispatch('vacancies/getBySlug', route.params['slug']);
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
  font-size: 21px;
  font-weight: bold;
}

.vacancy-salary {
  color: #2754eb;
}

.vacancy-block {
  margin-bottom: 20px;
}
.vacancy-footer {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 30px;
}

.vice-doctor-title {
  display: block;
  width: auto;
  height: auto;
}

:deep(.el-tag--plain) {
  background-color: #2754eb;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  padding: 1px 15px 0px 15px;
  cursor: pointer;
}

:deep(.el-tag--plain):hover {
  background-color: #133dcc;
}

.schedule-block {
  display: flex;
  justify-content: left;
}

.experience {
  color: #2754eb;
}

ul {
  list-style: none;
}

ul li:before {
  content: '-';
  position: relative;
  left: -5px;
}
</style>
