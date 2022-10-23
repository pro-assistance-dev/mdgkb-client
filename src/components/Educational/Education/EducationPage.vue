<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Сведения об образовательной организации</h4>
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
        </div>
      </div>
    </div>
    <div class="content-container">
      <InfoPage v-if="mode === 'info'" />
      <StructurePage v-if="mode === 'structure'" />
      <PublicDocumentPage v-if="selectedDocumentType" :public-document-type="selectedDocumentType" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import InfoPage from '@/components/Educational/Education/InfoPage.vue';
import PublicDocumentPage from '@/components/Educational/Education/PublicDocumentPage.vue';
import StructurePage from '@/components/Educational/Education/StructurePage.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';
import IOption from '@/interfaces/schema/IOption';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'EducationPage',
  components: {
    InfoPage,
    StructurePage,
    PublicDocumentPage,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const mode: Ref<string> = ref('info');
    const pageTitle: Ref<string> = ref('Основные сведения');
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const publicDocumentsTypes: ComputedRef<IPublicDocumentType[]> = computed(() => store.getters['publicDocumentTypes/items']);
    const selectedDocumentType: Ref<IPublicDocumentType | undefined> = ref(undefined);
    const modes: Ref<IOption[]> = ref([]);

    const setModes = async () => {
      modes.value.push({ value: 'info', label: 'Основные сведения' });
      modes.value.push({ value: 'structure', label: 'Структура и орган управления организации' });
      publicDocumentsTypes.value.forEach((docType: IPublicDocumentType) => {
        if (docType.id) {
          modes.value.push({ value: docType.id, label: docType.name });
        }
      });
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

    const changeTab = (value: string) => {
      mode.value = value;
      const dpoDocumentType = publicDocumentsTypes.value.find((dpoDocType: IPublicDocumentType) => dpoDocType.id === value);
      if (dpoDocumentType) {
        selectedDocumentType.value = dpoDocumentType;
      } else {
        selectedDocumentType.value = undefined;
      }
      router.replace(`/educational-info?mode=${mode.value}`);
    };

    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    const loadDocs = async () => {
      await store.dispatch('publicDocumentTypes/getAll', filterQuery.value);
    };

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      await store.dispatch('educationalOrganization/get');
      await loadDocs();
      await setModes();
      mounted.value = true;
      setTabFromRoute();
    });

    return {
      mode,
      publicDocumentsTypes,
      filteredDoctors,
      mounted,
      selectedDocumentType,
      educationalOrganisation,
      test,
      modes,
      isActive,
      changeTab,
      pageTitle,
    };
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
</style>
