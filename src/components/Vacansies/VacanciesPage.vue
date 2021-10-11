<template>
  <div class="header-center">
    <h2>Вакансии</h2>
  </div>
  <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти документ" size="large" />
  <el-collapse accordion @change="collapseChangeHandler">
    <el-collapse-item v-for="vacancy in vacanciesList" :key="vacancy.id" v-model="activeName">
      <template #title>
        <h3 class="collapseHeader">{{ vacancy.title }}</h3>
      </template>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Должность">
          {{ vacancy.title }}
        </el-descriptions-item>
        <el-descriptions-item label="Описание">
          {{ vacancy.description }}
        </el-descriptions-item>
        <el-descriptions-item label="Заработная плата">
          {{ vacancy.salary }}
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import IVacancy from '@/interfaces/vacancies/IVacancy';

export default defineComponent({
  name: 'NormativeDocuments',
  setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const modalOpen = ref(false);
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

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    const openModal = (path: string): void => {
      filePath.value = path;
      modalOpen.value = !modalOpen.value;
      return;
    };

    onBeforeMount(async () => {
      await store.dispatch('vacancies/getAll');
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    return {
      filePath,
      modalOpen,
      vacancies,
      vacanciesList,
      getFileUrl,
      activeName,
      openModal,
      filter,
      collapseChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';
.document-icon {
  font-size: 20px;
}
</style>
