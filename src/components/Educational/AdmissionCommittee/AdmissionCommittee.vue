<template>
  <PageComponent :custom-sections="customSections">
    <template v-for="section in customSections" :key="section" #[section.id]>
      <component :is="section.component"></component>
    </template>
  </PageComponent>

  <!--  <div class="ordinatura-page-container">-->
  <!--    <div class="side-container">-->
  <!--      <div class="side-item">-->
  <!--        <div class="card-item">-->
  <!--          <h4>Приёмная кампания</h4>-->
  <!--          <el-divider />-->
  <!--          <el-table :data="modes" cell-class-name="cell-row" :show-header="false">-->
  <!--            <el-table-column>-->
  <!--              <template #default="scope" @click="changeTab(scope.row.value)">-->
  <!--                <div class="menu-item" :class="isActive(scope.row.value)" @click="changeTab(scope.row.value)">-->
  <!--                  {{ scope.row.label }}-->
  <!--                </div>-->
  <!--              </template>-->
  <!--            </el-table-column>-->
  <!--          </el-table>-->
  <!--          <div class="button-block">-->
  <!--            <button @click="showForm = !showForm">Подать заявление</button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->

  <!--    <div style="width: 100%">-->
  <!--      <div v-if="mode === 'freePrograms'">-->
  <!--        <p>-->
  <!--          <a-->
  <!--            target="_blank"-->
  <!--            rel="noopener noreferrer nofollow"-->
  <!--            href="https://mosgorzdrav.ru/ru-RU/professional/teaching/target-residency.html"-->
  <!--            >Сайт ДЗМ-->
  <!--          </a>-->
  <!--        </p>-->
  <!--        <p>-->
  <!--          <a target="_blank" rel="noopener noreferrer nofollow" href="http://rf.niioz.ru/reestr/cel1">-->
  <!--            Личный Кабинет для приёма документов в ДЗМ-->
  <!--          </a>-->
  <!--        </p>-->
  <!--        <p><strong>Основание для зачисления:</strong></p>-->
  <!--        <ol>-->
  <!--          <li>Заявление</li>-->
  <!--          <li>Договор с Департаметом здравоохранения г. Москвы</li>-->
  <!--          <li>Аккредитационный бал тестирования от 70</li>-->
  <!--          <li>Полный пакет документов - <em> Оригинал документа об образовании предоставляется до 01.09.2022</em></li>-->
  <!--        </ol>-->
  <!--      </div>-->
  <!--      <div v-if="mode === 'paidPrograms'">-->
  <!--        <p><strong>Основание для зачисления:</strong></p>-->
  <!--        <ol>-->
  <!--          <li>Заявление</li>-->
  <!--          <li>Договор об оказании платных образовательных услуга</li>-->
  <!--          <li>Рекомендация к зачислению приемной комисии Морозовской ДГКБ на основе конкурса индивидуальных баллов</li>-->
  <!--          <li>Оплата обучения</li>-->
  <!--          <li>Аккредитационный балл от 70</li>-->
  <!--          <li>Полный пакет документов - <em> Оригинал документа об образовании предоставляется до 01.09.2022</em></li>-->
  <!--        </ol>-->
  <!--      </div>-->
  <!--      <ResidencyCoursesList-->
  <!--        :paid-programs="false"-->
  <!--        :free-programs="false"-->
  <!--        :cost="mode === 'paidPrograms'"-->
  <!--        :years="false"-->
  <!--      />-->

  <!--      <el-dialog v-model="showForm" width="30%">-->
  <!--        <SelectResidencyCourseForm />-->
  <!--      </el-dialog>-->
  <!--      <CompetitionComponent v-if="mode === 'competition'" />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import CustomSection from '@/classes/CustomSection';
import CompetitionComponent from '@/components/Educational/AdmissionCommittee/CompetitionComponent.vue';
import ResidencyCoursesList from '@/components/Educational/Residency/ResidencyCoursesList.vue';
import PageComponent from '@/components/Page/PageComponent.vue';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdmissionCommittee',
  components: {
    ResidencyCoursesList,
    CompetitionComponent,
    // SelectResidencyCourseForm,
    PageComponent,
  },
  setup() {
    const customSections: Ref<CustomSection[]> = ref([]);
    const showForm: Ref<boolean> = ref(false);

    const initLoad = async () => {
      customSections.value
        .push
        // CustomSection.Create('freePrograms', 'Целевая ординатура', 'ResidencyCourses'),
        // CustomSection.Create('paidPrograms', 'Ординатура по договорам о платных образовательных услугах', 'ResidencyCourses'),
        // CustomSection.Create('competition', 'Поданные заявления, рейтинг, конкурс', 'CompetitionComponent')
        // CustomSection.Create('contacts', 'Контакты', 'ResidencyContacts')
        ();
      await loadPrograms();
    };

    Hooks.onBeforeMount(initLoad);

    const loadPrograms = async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(ResidencyCoursesFiltersLib.onlyThisYear());
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAllWithCount', Provider.filterQuery.value);
    };

    return { mounted: Provider.mounted, showForm, customSections };
  },
});
</script>
