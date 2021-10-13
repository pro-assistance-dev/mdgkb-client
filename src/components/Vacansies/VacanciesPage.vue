<template>
  <div class="header-center">
    <h2>Вакансии</h2>
  </div>
  <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти документ" size="large" />

  <el-collapse class="collapse" accordion @change="collapseChangeHandler">
    <el-collapse-item v-for="vacancy in vacanciesList" :key="vacancy.id" v-model="activeName">
      <template #title>
        <h3 class="collapseHeader">{{ vacancy.title }}</h3>
      </template>
      <el-descriptions :column="1" border direction="horizontal" class="contact-form">
        <el-descriptions-item label="Должность">
          {{ vacancy.title }}
        </el-descriptions-item>
        <el-descriptions-item v-if="vacancy.schedule" label="График работы">
          {{ vacancy.schedule }}
        </el-descriptions-item>
        <el-descriptions-item v-if="vacancy.salary" label="Заработная плата">
          {{ vacancy.salary }}
        </el-descriptions-item>
        <el-descriptions-item v-if="vacancy.duties" label="Должостные обязанности">
          {{ vacancy.duties }}
        </el-descriptions-item>
        <el-descriptions-item label="Требования к кандидату">
          {{ vacancy.requirements }}
        </el-descriptions-item>
        <el-descriptions-item label="Опыт работы">
          {{ vacancy.experience }}
        </el-descriptions-item>
        <el-descriptions-item label="Описание">
          {{ vacancy.description }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="contact-form right-button">
        <el-button
          v-if="!vacancy.opened && (!vacancy.vacancyResponses[0] || (vacancy.vacancyResponses[0] && !vacancy.vacancyResponses[0].sended))"
          type="success"
          @click="openResponse(vacancy)"
          >Откликнуться</el-button
        >
        <el-button v-if="vacancy.opened" type="danger" @click="vacancy.opened = !vacancy.opened">Закрыть</el-button>
        <el-button v-if="vacancy.vacancyResponses[0] && vacancy.vacancyResponses[0].sended" type="info">Отклик отправлен</el-button>
      </div>
      <div v-if="vacancy.opened" class="contact-form">
        <div class="text-center">
          <h3>Отклик на вакансию</h3>
        </div>
        <el-form v-model="vacancy.vacancyResponses[0]">
          <el-form-item
            v-for="(email, i) in vacancy.vacancyResponses[0].contactInfo.emails"
            :key="email.id"
            label="Email"
            label-width="100px"
          >
            <el-input v-model="vacancy.vacancyResponses[0].contactInfo.emails[i].address"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(phone, i) in vacancy.vacancyResponses[0].contactInfo.telephoneNumbers"
            :key="phone.id"
            label="Телефон"
            label-width="100px"
          >
            <el-input v-model="vacancy.vacancyResponses[0].contactInfo.telephoneNumbers[i].number"></el-input>
          </el-form-item>
          <el-form-item label="Информация" label-width="100px">
            <el-input v-model="vacancy.vacancyResponses[0].coverLetter" type="textarea" :rows="10"></el-input>
          </el-form-item>
          <div class="right-button">
            <el-button type="success" @click="sendResponse(vacancy)">Откликнуться</el-button>
          </div>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import VacancyResponse from '@/classes/VacancyResponse';
import IVacancy from '@/interfaces/vacancies/IVacancy';

export default defineComponent({
  name: 'NormativeDocuments',
  setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');

    const vacancies = computed(() => store.getters['vacancies/vacancies']);
    const vacanciesList = computed((): IVacancy => {
      if (filter.value) {
        return vacancies.value.filter((o: IVacancy) => {
          if (o.title) return o.title.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return vacancies.value;
      }
    });

    const activeName = ref(1);

    onBeforeMount(async () => {
      await store.dispatch('vacancies/getAll');
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    const openResponse = (vacancy: IVacancy) => {
      vacancy.opened = true;
      vacancy.vacancyResponses.push(new VacancyResponse());
      vacancy.vacancyResponses[0].contactInfo.pushFirstInfo();
      vacancy.vacancyResponses[0].vacancyId = vacancy.id;
    };

    const sendResponse = async (vacancy: IVacancy) => {
      await store.dispatch('vacancyResponses/create', vacancy.vacancyResponses[0]);
      vacancy.vacancyResponses[0].sended = true;
      vacancy.opened = false;
    };

    return {
      sendResponse,
      openResponse,
      filePath,
      vacancies,
      vacanciesList,
      activeName,
      filter,
      collapseChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';

.collapse {
  margin-top: 10px;
}

.contact-form {
  margin: 20px 100px 20px 10px;
}

.text-center {
  text-align: center;
}
.right-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
