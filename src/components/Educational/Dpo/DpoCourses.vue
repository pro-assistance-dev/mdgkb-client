<template>
  <div>
    <el-row :gutter="40">
      <el-col :xl="6" :lg="6" :md="24" class="calendar">
        <ModeButtons
          :second-mode-active="nmoMode"
          :store-mode="false"
          first-mode="Программы ДПО"
          second-mode="Программы НМО"
          @changeMode="changeMode"
        />
        <div class="search_block">
          <DpoCoursesFilters v-if="schemaGet" :sort-models="sortModels" @load="load" />
        </div>
        <div class="links">
          <a type="primary" round @click="$router.push('/public-documents')">Нормативные документы</a>
        </div>
        <DpoCoursesContacts />
      </el-col>
      <el-col :xl="18" :lg="18" :md="24">
        <DpoCoursesList v-if="mounted" :nmo-mode="nmoMode" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import SortModel from '@/classes/filters/SortModel';
import DpoCoursesContacts from '@/components/Educational/Dpo/DpoCoursesContacts.vue';
import DpoCoursesFilters from '@/components/Educational/Dpo/DpoCoursesFilters.vue';
import DpoCoursesList from '@/components/Educational/Dpo/DpoCoursesList.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoCourses',
  components: { DpoCoursesContacts, DpoCoursesFilters, DpoCoursesList, ModeButtons },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const schemaGet: Ref<boolean> = ref(false);

    const nmoMode: Ref<boolean> = ref(route.path === '/nmo');
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterModel = ref();
    const sortModels: Ref<ISortModel[]> = ref([]);

    const createSortModels = (): ISortModel[] => {
      return [
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.name, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.hours, Orders.Asc, 'По длительности', false),
        SortModel.CreateSortModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.start, Orders.Asc, 'По дате начала', false),
      ];
    };

    const setProgramsType = () => {
      filterModel.value.boolean = nmoMode.value;
      filterModel.value.operator = Operators.Eq;
      store.commit('filter/setFilterModel', filterModel.value);
    };

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      sortModels.value = createSortModels();
      schemaGet.value = true;
      store.commit('filter/setStoreModule', 'dpoCourses');
      filterModel.value = FilterModel.CreateFilterModel(schema.value.dpoCourse.tableName, schema.value.dpoCourse.isNmo, DataTypes.Boolean);
      setProgramsType();
      await load();
    });

    const load = async () => {
      filterQuery.value.pagination.cursorMode = false;
      setProgramsType();
      await store.dispatch('dpoCourses/getAll', filterQuery.value);
      mounted.value = true;
    };

    const changeMode = async (dpoModeActive: boolean) => {
      nmoMode.value = !dpoModeActive;
      filterModel.value.boolean = nmoMode.value;
      filterModel.value.operator = Operators.Eq;
      filterModel.value.type = DataTypes.Boolean;
      store.commit('filter/setFilterModel', filterModel.value);
      await load();
      if (nmoMode.value) {
        await router.replace('/nmo');
      } else {
        await router.replace('/dpo');
      }
    };

    return { nmoMode, changeMode, mounted, load, schemaGet, sortModels };
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
</style>
