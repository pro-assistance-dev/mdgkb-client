<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Сведения об образовательной организации</h4>
          <el-divider />
          <el-table :data="menu" cell-class-name="cell-row" :show-header="false">
            <el-table-column>
              <template #default="scope">
                <div :class="isActive(scope.row.name)" @click="changeTab(scope.row.name)">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="content-container">
      <InfoPage v-if="activeMenuName === 'Основные сведения'" />
      <StructurePage v-if="activeMenuName === 'Структура и орган управления организации'" />
      <DocumentsPage v-if="activeMenuName === 'Документы'" />
      <EducationPage v-if="activeMenuName === 'Образование'" />
      <StandartsPage v-if="activeMenuName === 'Образовательные стандарты'" />
      <ManagersPage v-if="activeMenuName === 'Руководство. Педагогический состав'" />
      <MaterialPage v-if="activeMenuName === 'Материально-техническое обеспечение и оснащенность образовательного процесса'" />
      <MoneyPage v-if="activeMenuName === 'Стипендии и иные виды материальной поддержки'" />
      <PaidServicesPage v-if="activeMenuName === 'Платные образовательные услуги'" />
      <FinancePage v-if="activeMenuName === 'Финансово-хозяйственная деятельность'" />
      <VacancyPage v-if="activeMenuName === 'Вакантные места для приема (перевода)'" />
      <InvalidsPage v-if="activeMenuName === 'Доступная среда'" />
      <InternationalPage v-if="activeMenuName === 'Международное сотрудничество'" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DocumentsPage from '@/components/Educational/EducationalOrganizationInfo/DocumentsPage.vue';
import EducationPage from '@/components/Educational/EducationalOrganizationInfo/EducationPage.vue';
import FinancePage from '@/components/Educational/EducationalOrganizationInfo/FinancePage.vue';
import InfoPage from '@/components/Educational/EducationalOrganizationInfo/InfoPage.vue';
import InternationalPage from '@/components/Educational/EducationalOrganizationInfo/InternationalPage.vue';
import InvalidsPage from '@/components/Educational/EducationalOrganizationInfo/InvalidsPage.vue';
import ManagersPage from '@/components/Educational/EducationalOrganizationInfo/ManagersPage.vue';
import MaterialPage from '@/components/Educational/EducationalOrganizationInfo/MaterialPage.vue';
import MoneyPage from '@/components/Educational/EducationalOrganizationInfo/MoneyPage.vue';
import PaidServicesPage from '@/components/Educational/EducationalOrganizationInfo/PaidServicesPage.vue';
import StandartsPage from '@/components/Educational/EducationalOrganizationInfo/StandartsPage.vue';
import StructurePage from '@/components/Educational/EducationalOrganizationInfo/StructurePage.vue';
import VacancyPage from '@/components/Educational/EducationalOrganizationInfo/VacancyPage.vue';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

export default defineComponent({
  name: 'EducationalOrganizationInfo',
  components: {
    InfoPage,
    StructurePage,
    DocumentsPage,
    EducationPage,
    StandartsPage,
    ManagersPage,
    MaterialPage,
    MoneyPage,
    FinancePage,
    PaidServicesPage,
    VacancyPage,
    InvalidsPage,
    InternationalPage,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();

    const pageTitle: Ref<string> = ref('Основные сведения');
    const activeMenuName: Ref<string> = ref('Основные сведения');

    const menu = [
      { name: 'Основные сведения' },
      { name: 'Структура и орган управления организации' },
      { name: 'Документы' },
      { name: 'Образование' },
      { name: 'Образовательные стандарты' },
      { name: 'Руководство. Педагогический состав' },
      { name: 'Материально-техническое обеспечение и оснащенность образовательного процесса' },
      { name: 'Стипендии и иные виды материальной поддержки' },
      { name: 'Платные образовательные услуги' },
      { name: 'Финансово-хозяйственная деятельность' },
      { name: 'Вакантные места для приема (перевода)' },
      { name: 'Доступная среда' },
      { name: 'Международное сотрудничество' },
    ];

    const isActive = (name: string): string => {
      return name === activeMenuName.value ? 'is-active' : '';
    };
    const changeTab = (name: string) => {
      activeMenuName.value = name;
    };
    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };
    // const rules = ref(SideOrganizationRules);
    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');
      mounted.value = true;
    });

    return {
      filteredDoctors,
      mounted,
      // rules,
      educationalOrganisation,
      test,
      menu,
      isActive,
      changeTab,
      pageTitle,
      activeMenuName,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

h4 {
  margin: 0;
}
.el-divider {
  margin: 10px 0 0;
}
:deep(.cell) {
  padding: 0 !important;
}
:deep(.cell-row) {
  cursor: pointer;
}
.ordinatura-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.content-container {
  max-width: $content-max-width;
  width: 100%;
}
.is-active {
  color: #42a4f5;
}
</style>
