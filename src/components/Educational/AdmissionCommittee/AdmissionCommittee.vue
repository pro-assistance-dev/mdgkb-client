<template>
  <PageComponent :custom-sections="customSections">
    <template v-for="section in customSections" :key="section.id" #[section.id]>
      <component :is="section.component"></component>
    </template>
    <template #bottom>
      <div class="button-container">
        <PButton text="Подать документы" type="success" style="margin: 10px 0" @click="toForm()" />
      </div>
    </template>
    <template #title>
      <div class="title-button-container">
        <PButton type="success" text="Подать документы" style="margin: 10px 0" @click="toForm()" />
      </div>
    </template>
  </PageComponent>
</template>

<script lang="ts" setup>
import CustomSection from '@/classes/CustomSection';
import CompetitionComponent from '@/components/Educational/AdmissionCommittee/CompetitionComponent.vue';
import residencyCoursesFiltersLib from '@/libs/filters/ResidencyCoursesFiltersLib';
import residencyCoursesSortsLib from '@/libs/sorts/ResidencyCoursesSortsLib';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

const customSections: CustomSection[] = [];
// const showForm: Ref<boolean> = ref(false);

const initLoad = async () => {
  customSections.push(CustomSection.Create('competition', 'Поданные заявления, рейтинг, конкурс', CompetitionComponent, 0));
  // CustomSection.Create('freePrograms', 'Целевая ординатура', 'ResidencyCourses'),
  // CustomSection.Create('paidPrograms', 'Ординатура по договорам о платных образовательных услугах', 'ResidencyCourses'),
  // CustomSection.Create('contacts', 'Контакты', 'ResidencyContacts')
  await loadPrograms();
};

Hooks.onBeforeMount(initLoad);

const auth: Ref<Auth<User>> = Store.Getters('auth/auth');
const isAuth: Ref<boolean> = computed(() => auth.value.isAuth);
const authModal: ComputedRef<Auth> = Store.Getters('auth/modal');

const toForm = () => {
  if (!isAuth.value) {
    PHelp.Notification.Warning('Для подачи документов необходмо зарегистрироваться и войти в систему');
    authModal.value.open();
    return;
  }
  Router.To('/admission-form');
};

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
