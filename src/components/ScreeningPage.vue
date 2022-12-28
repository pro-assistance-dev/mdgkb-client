<template>
  <div class="ordinatura-page-container">
    <div class="side-container">
      <div class="side-item">
        <div class="card-item">
          <h4>Неонатальный скрининг и расширенный неонатальный скрининг</h4>
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
      <PublicDocumentPage v-if="selectedDocumentType" :public-document-type="selectedDocumentType" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import PublicDocumentPage from '@/components/Educational/Education/PublicDocumentPage.vue';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPage from '@/interfaces/page/IPage';
import IOption from '@/interfaces/schema/IOption';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ScreeningPage',
  components: {
    PublicDocumentPage,
  },
  setup() {
    const mode: Ref<string> = ref('info');
    const pageTitle: Ref<string> = ref('Неонатальный скрининг и расширенный неонатальный скрининг');
    const page: ComputedRef<IPage> = computed(() => Provider.store.getters['pages/page']);
    const selectedDocumentType: Ref<IPageSideMenu | undefined> = ref(undefined);
    const modes: Ref<IOption[]> = ref([]);

    const setModes = async () => {
      // modes.value.push({ value: 'info', label: 'Основные сведения' });
      // modes.value.push({ value: 'structure', label: 'Структура и орган управления организации' });
      page.value.pageSideMenus.forEach((docType: IPageSideMenu) => {
        if (docType.id) {
          modes.value.push({ value: docType.id, label: docType.name });
        }
      });
    };

    const setTabFromRoute = () => {
      let routeMode = Provider.route().query.mode;
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
      const dpoDocumentType = page.value.pageSideMenus.find((dpoDocType: IPageSideMenu) => dpoDocType.id === value);
      if (dpoDocumentType) {
        selectedDocumentType.value = dpoDocumentType;
      } else {
        selectedDocumentType.value = undefined;
      }
      Provider.router.replace(`/screening?mode=${mode.value}`);
    };

    // const filteredDoctors = computed(() => Provider.store.getters['doctors/filteredDoctors']);

    const initLoad = async () => {
      await Provider.store.dispatch('pages/getBySlug', Provider.getPath());
      await setModes();
      setTabFromRoute();
    };

    Hooks.onBeforeMount(initLoad);

    return {
      mode,
      page,
      mounted: Provider.mounted,
      selectedDocumentType,
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
