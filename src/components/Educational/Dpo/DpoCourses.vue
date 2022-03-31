<template>
  <!--  <div class="way">-->
  <!--    <h4>Главная / Образование / <font color="#2754EB">Дополнительное профессиональное образование</font></h4>-->
  <!--  </div>-->
  <div class="filter-block">
    <DpoCoursesFilters v-if="mounted" :modes="modes" @selectMode="selectMode" />
    <!-- <DpoCoursesFilters v-if="schemaGet" :sort-models="sortModels" @load="load" /> -->
  </div>

  <div class="sort">
    <div class="sort-item-1">
      <div class="item-1"><h3>Дата&nbsp;проведения</h3></div>
      <div class="item-2"><SortList :models="sortModels" :store-mode="true" @load="load" /></div>
    </div>
    <div class="sort-item-2">
      <div class="item-3"><h3>Сортировать</h3></div>
      <div class="item-4"><SortList :models="sortModels" :store-mode="true" @load="load" /></div>
    </div>
  </div>

  <template v-if="mounted">
    <DpoCoursesList v-if="mode === 'programs'" />
    <DocumentsList v-if="selectedDocumentType" :documents="selectedDocumentType.documents" />
    <DpoCoursesContacts v-if="mode === 'info'" />
  </template>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import SortModel from '@/classes/filters/SortModel';
import DocumentsList from '@/components/Educational/Dpo/DocumentsList.vue';
import DpoCoursesContacts from '@/components/Educational/Dpo/DpoCoursesContacts.vue';
import DpoCoursesFilters from '@/components/Educational/Dpo/DpoCoursesFilters.vue';
import DpoCoursesList from '@/components/Educational/Dpo/DpoCoursesList.vue';
import SortList from '@/components/SortList/SortList.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';
import IOption from '@/interfaces/schema/IOption';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoCourses',
  components: { DocumentsList, DpoCoursesContacts, DpoCoursesFilters, DpoCoursesList, SortList },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const schemaGet: Ref<boolean> = ref(false);
    const mode: Ref<string> = ref('');

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const documentTypes: ComputedRef<IDpoDocumentType[]> = computed(() => store.getters['dpoDocumentTypes/items']);
    const selectedDocumentType: Ref<IDocumentType | undefined> = ref(undefined);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterModel = ref();
    const sortModels: Ref<ISortModel[]> = ref([]);

    const modes: Ref<IOption[]> = ref([]);

    const selectMode = (value: string): void => {
      mode.value = value;
      const dpoDocumentType = documentTypes.value.find((dpoDocType: IDpoDocumentType) => dpoDocType.documentType.id === value);
      if (dpoDocumentType) {
        selectedDocumentType.value = dpoDocumentType.documentType;
      }
    };

    const createSortModels = (): ISortModel[] => {
      const sortModels: ISortModel[] = [
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.hours, Orders.Asc, 'По длительности', false),
        // SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.start, Orders.Asc, 'По дате начала', false),
      ];
      store.commit(`filter/addSortModels`, sortModels);
      return sortModels;
    };

    const setModes = async () => {
      await store.dispatch('dpoDocumentTypes/getAll');
      modes.value.push({ value: 'programs', label: 'Программы' });
      documentTypes.value.forEach((docType: IDpoDocumentType) => {
        if (docType.documentType.id) {
          modes.value.push({ value: docType.documentType.id, label: docType.documentType.name });
        }
      });
      modes.value.push({ value: 'info', label: 'Информация' });
    };

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      await setModes();
      sortModels.value = createSortModels();
      schemaGet.value = true;
      store.commit('filter/setStoreModule', 'dpoCourses');
      filterModel.value = FilterModel.CreateFilterModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.isNmo, DataTypes.Boolean);
      await load();
      mounted.value = true;
    });

    const load = async () => {
      store.commit(`filter/checkSortModels`);
      filterQuery.value.pagination.cursorMode = false;
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
    };

    // const changeMode = async (dpoModeActive: boolean) => {
    //   nmoMode.value = !dpoModeActive;
    //   filterModel.value.boolean = nmoMode.value;
    //   filterModel.value.operator = Operators.Eq;
    //   filterModel.value.type = DataTypes.Boolean;
    //   store.commit('filter/setFilterModel', filterModel.value);
    //   await load();
    //   if (nmoMode.value) {
    //     await router.replace('/nmo');
    //   } else {
    //     await router.replace('/dpo');
    //   }
    // };

    return { selectedDocumentType, mode, mounted, load, schemaGet, sortModels, modes, selectMode };
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
  height: 103px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  background: #ffffff;
}

.block-item {
  width: 272px;
  margin-top: 22px;
}

.sort {
  height: 60px;
}

.hidden {
  display: none;
}

.sort {
  display: flex;
  justify-content: right;
  align-items: center;
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
</style>
