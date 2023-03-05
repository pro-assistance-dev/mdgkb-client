<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Приёмная кампания</h4>
          <el-divider />
          <el-table :data="modes" cell-class-name="cell-row" :show-header="false">
            <el-table-column>
              <template #default="scope" @click="changeTab(scope.row.value)">
                <div class="menu-item" :class="isActive(scope.row.value)" @click="changeTab(scope.row.value)">
                  {{ scope.row.label }}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="button-block">
            <button @click="showForm = !showForm">Подать заявление</button>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 100%">
      <div v-if="selectedDocumentType" class="content-container">
        <div class="card-item">
          <h2>{{ selectedDocumentType.name }}</h2>
          <EditorContent :content="selectedDocumentType.description" />
        </div>
        <DocumentsList :documents="selectedDocumentType.documents" />
      </div>
      <div v-if="mode === 'freePrograms'">
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://mosgorzdrav.ru/ru-RU/professional/teaching/target-residency.html"
            >Сайт ДЗМ
          </a>
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://rf.niioz.ru/reestr/cel1">
            Личный Кабинет для приёма документов в ДЗМ
          </a>
        </p>
        <p><strong>Основание для зачисления:</strong></p>
        <ol>
          <li>Заявление</li>
          <li>Договор с Департаметом здравоохранения г. Москвы</li>
          <li>Аккредитационный бал тестирования от 70</li>
          <li>Полный пакет документов - <em> Оригинал документа об образовании предоставляется до 01.09.2022</em></li>
        </ol>
      </div>
      <div v-if="mode === 'paidPrograms'">
        <p><strong>Основание для зачисления:</strong></p>
        <ol>
          <li>Заявление</li>
          <li>Договор об оказании платных образовательных услуга</li>
          <li>Рекомендация к зачислению приемной комисии Морозовской ДГКБ на основе конкурса индивидуальных баллов</li>
          <li>Оплата обучения</li>
          <li>Аккредитационный балл от 70</li>
          <li>Полный пакет документов - <em> Оригинал документа об образовании предоставляется до 01.09.2022</em></li>
        </ol>
      </div>
      <ResidencyCoursesList
        v-if="mode === 'freePrograms' || mode === 'paidPrograms'"
        :paid-programs="false"
        :free-programs="false"
        :cost="mode === 'paidPrograms'"
        :years="false"
      />

      <el-dialog v-model="showForm" width="30%">
        <SelectResidencyCourseForm />
      </el-dialog>
      <CompetitionComponent v-if="mode === 'competition'" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import PageSideMenu from '@/classes/PageSideMenu';
import EditorContent from '@/components/EditorContent.vue';
import CompetitionComponent from '@/components/Educational/AdmissionCommittee/CompetitionComponent.vue';
import SelectResidencyCourseForm from '@/components/Educational/AdmissionCommittee/SelectResidencyCourseForm.vue';
import DocumentsList from '@/components/Educational/Dpo/DocumentsList.vue';
import ResidencyCoursesList from '@/components/Educational/Residency/ResidencyCoursesList.vue';
import IOption from '@/interfaces/schema/IOption';
import Page from '@/services/classes/Page';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';
import Provider from '@/services/Provider/Provider';
import store from '@/store';

export default defineComponent({
  name: 'AdmissionCommittee',
  components: {
    EditorContent,
    DocumentsList,
    ResidencyCoursesList,
    CompetitionComponent,
    SelectResidencyCourseForm,
  },
  setup() {
    const modes: Ref<IOption[]> = ref([]);
    const mode: Ref<string> = ref('');
    const route = useRoute();
    const page: ComputedRef<Page> = computed(() => store.getters['pages/item']);
    const selectedDocumentType: Ref<PageSideMenu | undefined> = ref(undefined);
    const showForm: Ref<boolean> = ref(false);
    const setModes = async () => {
      page.value.pageSideMenus.forEach((docType: PageSideMenu) => {
        if (docType.id) {
          modes.value.push({ value: docType.id, label: docType.name });
        }
      });
      modes.value.push(
        { value: 'freePrograms', label: 'Целевая ординатура' },
        { value: 'paidPrograms', label: 'Ординатура по договорам о платных образовательных услугах' },
        { value: 'competition', label: 'Поданные заявления, рейтинг, конкурс' }
      );
      selectedDocumentType.value = page.value.pageSideMenus[0];
      mode.value = page.value.pageSideMenus[0].id ? page.value.pageSideMenus[0].id : '';
    };

    const changeTab = async (value: string) => {
      const docType = page.value.pageSideMenus.find((doc: PageSideMenu) => doc.id === value);
      if (docType) {
        selectedDocumentType.value = docType;
      } else {
        selectedDocumentType.value = undefined;
        await loadPrograms();
      }
      mode.value = value;
      showForm.value = false;
      await Provider.router.replace(`/admission-committee?mode=${mode.value}`);
    };

    const initLoad = async () => {
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
      await loadPrograms();
      await setModes();
      setTabFromRoute();
    };

    Hooks.onBeforeMount(initLoad);

    const loadPrograms = async () => {
      Provider.resetFilterQuery();
      Provider.setFilterModels(ResidencyCoursesFiltersLib.onlyThisYear());
      Provider.setSortModels(ResidencyCoursesSortsLib.byName(Orders.Asc));
      Provider.filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAllWithCount', Provider.filterQuery.value);
    };

    const setTabFromRoute = () => {
      let routeMode = route.query.mode;
      if (typeof routeMode === 'string' && modes.value.some((m: IOption) => m.value === routeMode)) {
        mode.value = routeMode;
      }
      changeTab(mode.value);
    };

    const isActive = (name: string): string => {
      return name === mode.value ? 'is-active' : '';
    };

    return { mounted: Provider.mounted, mode, modes, isActive, changeTab, selectedDocumentType, showForm };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
$side-cotainer-max-width: 300px;
$content-max-width: 1000px;
$card-margin-size: 30px;

.menu-item {
  padding: 10px 0;
}

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
  padding: 0 !important;
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

.button-block {
  button {
    margin-top: 10px;
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
  text-align: center;
  padding: 4px 0 0px 0;
  margin-top: 10px;
}
</style>
