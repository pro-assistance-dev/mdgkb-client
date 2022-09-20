<template>
  <PageWrapper v-if="mounted" :title="title">
    <template #filters>
      <DivisionsListFilters :modes="modes" :mode="mode" @selectMode="selectMode" @load="loadDivisions" />
    </template>
    <h2>Терапевтическое направление</h2>
    <DivisionsList v-if="mode === 'departments'" @load="loadMore" />
    <CentersList v-else />
  </PageWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import CentersList from '@/components/Divisions/CentersList.vue';
import DivisionsList from '@/components/Divisions/DivisionsList.vue';
import DivisionsListFilters from '@/components/Divisions/DivisionsListFilters.vue';
import PageWrapper from '@/components/PageWrapper.vue';
// import ModeButtons from '@/components/ModeButtons.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IDivision from '@/interfaces/IDivision';
import IOption from '@/interfaces/schema/IOption';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DivisionsSortsLib from '@/services/Provider/libs/sorts/DivisionsSortsLib';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DivisionsCentersList',
  components: {
    CentersList,
    DivisionsList,
    DivisionsListFilters,
    PageWrapper,
  },

  emits: ['selectMode'],
  setup() {
    const route = useRoute();
    const divisionsMode: Ref<boolean> = ref(route.path === '/divisions');
    const modes: Ref<IOption[]> = ref([]);
    const mode: Ref<string> = ref('departments');
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => Provider.store.getters['divisions/divisions']);

    const selectMode = async (value: string) => {
      if (value === mode.value) {
        return;
      }
      mode.value = value;
    };

    const load = async () => {
      Provider.setSortModels(DivisionsSortsLib.byName());
      Provider.filterQuery.value.pagination.limit = 6;
      Provider.setSortList(...createSortModels(DivisionsSortsLib));
      Provider.store.commit('filter/setStoreModule', 'divisions');
      await loadDivisions();
      await loadFilters();
      await setModes();
    };

    Hooks.onBeforeMount(load);

    const loadDivisions = async () => {
      Provider.filterQuery.value.pagination.append = false;
      Provider.filterQuery.value.pagination.limit = 6;
      await Provider.store.dispatch('divisions/getAll', Provider.filterQuery.value);
    };

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.append = true;
      Provider.filterQuery.value.pagination.offset = divisions.value.length;
      await Provider.store.dispatch('divisions/getAll', Provider.filterQuery.value);
    };

    const changeMode = async (divisionsModeActive: boolean) => {
      divisionsMode.value = divisionsModeActive;
      if (divisionsModeActive) {
        await Provider.router.replace('/divisions');
      } else {
        await Provider.router.replace('/centers');
      }
    };

    const setModes = async () => {
      // await store.dispatch('dpoDocumentTypes/getAll');
      modes.value.push({ value: 'departments', label: 'Отделения' });
      modes.value.push({ value: 'centers', label: 'Центры' });
    };

    // const createSortModels = (): ISortModel[] => {
    //   return [
    //     DivisionsSortsLib.byName(),
    //     DivisionsSortsLib.byCommentsCount(),
    //   ];
    // };

    const loadFilters = async () => {
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.treatDirection);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
    };

    return {
      createSortModels,
      divisionsMode,
      changeMode,
      TokenService,
      Operators,
      DataTypes,
      modes,
      mode,
      selectMode,
      mounted: Provider.mounted,
      load,
      loadMore,
      loadDivisions,
      loadFilters,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  .right-side {
    // max-width: $right-side-max-width;
  }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
.filters {
  position: sticky;
  top: 79px;
  height: 100%;
}

.full-width {
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0;
  height: 145px;
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
  height: 145px;
  margin-top: 20px;
  border: 1px solid #e4e6f2;
  border-radius: 5px;
  width: 100%;
}

.filter-block {
  height: 145px;
  background: #ffffff;
  z-index: 200;
}

.filter-block-2 {
  height: 145px;
  background: #ffffff;
  z-index: 200;
}

.sort {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 60px;
  padding: 0 10px;
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

h3 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 16px;
  font-weight: normal;
  color: #343e5c;
}

h2 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 20px;
  font-weight: bold;
  color: #343e5c;
}

@media screen and (max-width: 1216px) {
  .full-width {
    height: 200px;
  }

  .filter-block {
    height: 200px;
  }
}

@media screen and (max-width: 605px) {
  .full-width {
    height: 324px;
  }

  .filter-block {
    height: 324px;
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
