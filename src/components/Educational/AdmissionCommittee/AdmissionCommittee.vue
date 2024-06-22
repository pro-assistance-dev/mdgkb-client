<template>
  <PageComponent :custom-sections="customSections">
    <template v-for="section in customSections" :key="section" #[section.id]>
      <component :is="section.component"></component>
    </template>
    <template #bottom>
      <!--      <div class="button-container">-->
      <!--        <el-button type="success" style="margin: 10px 0" @click="$router.push('/admission-form')">Подать документы</el-button>-->
      <!--      </div>-->
    </template>
    <template #title>
      <!--      <div class="title-button-container">-->
      <!--        <el-button type="success" style="margin: 10px 0" @click="$router.push('/admission-form')">Подать документы</el-button>-->
      <!--      </div>-->
    </template>
  </PageComponent>
</template>

<script lang="ts" setup>
import CustomSection from '@/classes/CustomSection';
import CompetitionComponent from '@/components/Educational/AdmissionCommittee/CompetitionComponent.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import residencyCoursesFiltersLib from '@/libs/filters/ResidencyCoursesFiltersLib';
import residencyCoursesSortsLib from '@/libs/sorts/ResidencyCoursesSortsLib';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

const customSections: Ref<CustomSection[]> = ref([]);
// const showForm: Ref<boolean> = ref(false);

const initLoad = async () => {
  customSections.value.push(CustomSection.Create('competition', 'Поданные заявления, рейтинг, конкурс', CompetitionComponent, 0));
  // CustomSection.Create('freePrograms', 'Целевая ординатура', 'ResidencyCourses'),
  // CustomSection.Create('paidPrograms', 'Ординатура по договорам о платных образовательных услугах', 'ResidencyCourses'),
  // CustomSection.Create('contacts', 'Контакты', 'ResidencyContacts')
  await loadPrograms();
};

Hooks.onBeforeMount(initLoad);

const loadPrograms = async () => {
  const ftsp = new FTSP();
  ftsp.setF(residencyCoursesFiltersLib.onlyThisYear());
  ftsp.setS(residencyCoursesSortsLib.byName(Orders.Asc));
  await Store.FTSP('residencyCourses', { ftsp: ftsp });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.button-container {
  background: #f6f6f6;
  text-align: center;
}

.title-button-container {
  position: absolute;
  right: 0;
  margin-left: 10px;
}

@media screen and (max-width: 1024px) {
  .title-button-container {
    position: unset;
  }
}
</style>
