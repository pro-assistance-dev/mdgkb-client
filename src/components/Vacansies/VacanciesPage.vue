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
        <el-button type="success" @click="openResponse(vacancy.id)">Откликнуться</el-button>
        <!--        <el-button v-if="vacancy.opened" type="danger" @click="openVacanciesResponse">Закрыть</el-button>-->
        <!--        <el-button v-if="vacancy.vacancyResponses[0] && vacancy.vacancyResponses[0].sended" type="info">Отклик отправлен</el-button>-->
      </div>
    </el-collapse-item>
  </el-collapse>
  <VacancyResponseForm></VacancyResponseForm>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import VacancyResponseForm from '@/components/Vacansies/VacancyResponseForm.vue';
import IVacancy from '@/interfaces/vacancies/IVacancy';

export default defineComponent({
  name: 'VacanciesPage',
  components: { VacancyResponseForm },
  async setup() {
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

    const openResponse = (vacancyId: string) => store.commit('vacancies/openVacancyResponse', vacancyId);

    return {
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
</style>
