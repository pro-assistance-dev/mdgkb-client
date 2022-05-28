<template>
  <div v-if="mounted">
    <div v-if="mode === 'programs'" class="filter-block">
      <div class="full-width"></div>
      <ResidencyFilters :modes="modes" :mode="mode" @selectMode="selectMode" @load="load" />
    </div>
    <div v-else class="filter-block-2">
      <div class="full-width-2"></div>
      <ResidencyFilters :modes="modes" :mode="mode" @selectMode="selectMode" @load="load" />
    </div>
    <div v-if="selectedDocumentType && selectedDocumentType.description !== '<p>undefined</p>'" v-html="selectedDocumentType.description" />
    <div v-if="mode === 'programs' || mode === ''" class="sort">
      <div class="sort-item-2">
        <div class="item-3"><h3>Сортировать</h3></div>
        <div class="item-4">
          <SortList :models="sortModels" :store-mode="true" @load="load" />
        </div>
      </div>
    </div>

    <ResidencyCoursesList v-if="mode === 'programs'" :free-programs="false" />
    <DocumentsList v-if="selectedDocumentType" :documents="selectedDocumentType.documents" />
    <ResidencyContacts v-if="mode === 'contacts'" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import DocumentsList from '@/components/Educational/Dpo/DocumentsList.vue';
import ResidencyContacts from '@/components/Educational/Residency/ResidencyContacts.vue';
import ResidencyCoursesList from '@/components/Educational/Residency/ResidencyCoursesList.vue';
import ResidencyFilters from '@/components/Educational/Residency/ResidencyFilters.vue';
import SortList from '@/components/SortList/SortList.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';
import IResidencyDocumentType from '@/interfaces/IResidencyDocumentType';
import IOption from '@/interfaces/schema/IOption';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import ResidencyCoursesFiltersLib from '@/services/Provider/libs/filters/ResidencyCoursesFiltersLib';
import ResidencyCoursesSortsLib from '@/services/Provider/libs/sorts/ResidencyCoursesSortsLib';

export default defineComponent({
  name: 'ResidencyPage',
  components: { DocumentsList, SortList, ResidencyFilters, ResidencyContacts, ResidencyCoursesList },

  setup() {
    const schemaGet: Ref<boolean> = ref(false);
    const residencyDocumentTypes: Ref<IResidencyDocumentType[]> = computed(() => Provider.store.getters['residencyDocumentTypes/items']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.store.getters['filter/filterQuery']);

    const documentTypes: ComputedRef<IResidencyDocumentType[]> = computed(() => Provider.store.getters['residencyDocumentTypes/items']);
    const selectedDocumentType: Ref<IDocumentType | undefined> = ref(undefined);
    const sortModels: Ref<ISortModel[]> = ref([]);
    const mode: Ref<string> = ref('programs');
    const modes: Ref<IOption[]> = ref([]);

    const selectMode = async (value: string) => {
      if (value === mode.value) {
        return;
      }
      mode.value = value;
      const documentType = documentTypes.value.find((dpoDocType: IDpoDocumentType) => dpoDocType.documentType.id === value);
      if (documentType) {
        selectedDocumentType.value = documentType.documentType;
      } else {
        selectedDocumentType.value = undefined;
      }
    };

    const createSortModels = (): ISortModel[] => {
      const sortModels: ISortModel[] = [
        ResidencyCoursesSortsLib.byName(Orders.Asc),
        ResidencyCoursesSortsLib.byStartYear(Orders.Asc),
        ResidencyCoursesSortsLib.byFreePlaces(Orders.Asc),
        ResidencyCoursesSortsLib.byPaidPlaces(Orders.Asc),
        ResidencyCoursesSortsLib.byCost(Orders.Asc),
      ];
      Provider.store.commit(`filter/addSortModels`, sortModels);
      return sortModels;
    };

    const setModes = async () => {
      await Provider.store.dispatch('residencyDocumentTypes/getAll');
      modes.value.push({ value: 'programs', label: 'Программы' });
      documentTypes.value.forEach((docType: IResidencyDocumentType) => {
        if (docType.documentType.id) {
          modes.value.push({ value: docType.documentType.id, label: docType.documentType.name });
        }
      });
      modes.value.push({ value: 'contacts', label: 'Контакты' });
    };

    const initLoad = async () => {
      sortModels.value = createSortModels();
      await setModes();
      schemaGet.value = true;
      Provider.setFilterModel(ResidencyCoursesFiltersLib.notThisYear());
      Provider.store.commit('filter/setStoreModule', 'residencyCourses');
      await load();
    };

    Hooks.onBeforeMount(initLoad);

    const load = async () => {
      Provider.store.commit(`filter/checkSortModels`);
      filterQuery.value.pagination.cursorMode = false;
      await Provider.store.dispatch('residencyCourses/getAll', filterQuery.value);
    };

    return {
      modes,
      selectedDocumentType,
      mode,
      selectMode,
      mounted: Provider.mounted,
      load,
      schemaGet,
      sortModels,
      residencyDocumentTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}

.links {
  text-align: left;
  padding-left: 7px;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-time {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.search_block {
  padding-top: 10px;
}

.contact-data {
  margin-top: 25px;
}

.contact-data-list {
  list-style-type: none;
}

.contact-data-list-item-h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  justify-content: left;
}

.contact-data-list-item {
  padding-bottom: 20px;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin: 2px;
}

.item {
  font-size: 14px;
  display: flex;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

.el-descriptions__label {
  font-size: 15px;
}

.links {
  text-align: left;
  padding-left: 7px;
}

.icon-phone {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-email {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-time {
  width: 20px;
  height: 20px;
  fill: #2754eb;
}

.icon-map-marker {
  width: 23px;
  height: 23px;
  fill: #2754eb;
}

.search_block {
  padding-top: 10px;
}

.contact-data {
  margin-top: 25px;
}

.contact-data-list {
  list-style-type: none;
}

.contact-data-list-item-h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  overflow-wrap: break-word;
  color: #4a4a4a;
  text-align: left;
  justify-content: left;
}

.contact-data-list-item {
  padding-bottom: 20px;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin: 2px;
}

.item {
  font-size: 14px;
  display: flex;
  padding-right: 10px;
  width: auto;
  align-items: center;
  text-align: left;
}

:deep(.main-box) {
  margin: 0px !important;
}

:deep(.page-container) {
  background: #f6f6f6 !important;
}

.way {
  height: 40px;
  background: #f6f6f6;
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 14px;
  font-weight: normal;
  color: #343e5c;
}

h3 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 16px;
  font-weight: normal;
  color: #343e5c;
}

.filter-block {
  height: 80px;
  background: #ffffff;
  z-index: 200;
}

.full-width {
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0;
  height: 80px;
  margin-top: 20px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  width: 100%;
}

.full-width-2 {
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0;
  height: 80px;
  margin-top: 20px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  width: 100%;
}

.block-item {
  width: 272px;
  margin-top: 22px;
}

.hidden {
  display: none;
}

.sort {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 60px;
}

.sort-item-1 {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  margin-right: 30px;
}

.sort-item-2 {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
}

.item-1 {
  width: auto;
  display: flex;
  margin-right: 20px;
}

.item-2 {
  width: 138px;
  display: flex;
}

.item-3 {
  width: auto;
  display: flex;
  margin-right: 20px;
}

.item-4 {
  width: 188px;
  display: flex;
}

@media screen and (max-width: 897px) {
  .full-width {
    height: 144px;
  }

  .filter-block {
    height: 144px;
  }
}

@media screen and (max-width: 605px) {
  .full-width {
    height: 206px;
  }

  .filter-block {
    height: 206px;
  }
}

@media screen and (max-width: 400px) {
  .item-3 {
    width: auto;
    display: flex;
    margin-right: 5px;
  }
  .item-4 {
    width: 158px;
    display: flex;
  }
}
</style>
