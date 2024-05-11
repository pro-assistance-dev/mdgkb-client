<template>
  <PageWrapper v-if="mounted">
    <template #filters>
      <!-- <DivisionsListFilters :modes="modes" :mode="mode" @selectMode="selectMode" @load="loadDivisions" /> -->
    </template>
    <DivisionsList :divisions="divisions" @load="loadMore" />
  </PageWrapper>
</template>

<script lang="ts" setup>
import Division from '@/classes/Division';
import PageWrapper from '@/components/PageWrapper.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import DivisionsFiltersLib from '@/libs/filters/DivisionsFiltersLib';
import DivisionsSortsLib from '@/libs/sorts/DivisionsSortsLib';
import Provider from '@/services/Provider/Provider';

const modes: Ref<IOption[]> = ref([]);
const mode: Ref<string> = ref('divisions');
const divisions: Ref<Division[]> = Store.Items('divisions')
const onlyDivisionsFilterModel: Ref<FilterModel> = ref(new FilterModel());
const onlyCentersFilterModel: Ref<FilterModel> = ref(new FilterModel());
const count: Ref<number> = ref(1);
const mounted = ref(false)
const load = async () => {
  // Provider.setSortModels(DivisionsSortsLib.byName());
  // Provider.setSortList(...createSortModels(DivisionsSortsLib));
  onlyDivisionsFilterModel.value = DivisionsFiltersLib.onlyDivisions();
  onlyCentersFilterModel.value = DivisionsFiltersLib.onlyCenters();

  if (!Provider.route().query.mode || Provider.route().query.mode === 'divisions') {
    Provider.setFilterModel(onlyDivisionsFilterModel.value);
  } else {
    Provider.setFilterModel(onlyCentersFilterModel.value);
  }

  Provider.store.commit('filter/setStoreModule', 'divisions');
  await loadDivisions();
  modes.value.push({ value: 'divisions', label: 'Отделения' }, { value: 'centers', label: 'Центры' });
  mounted.value = true
};

Hooks.onBeforeMount(load);

const loadDivisions = async () => {
  Provider.filterQuery.value.pagination.append = false;
  Provider.filterQuery.value.pagination.limit = mode.value === 'divisions' ? 6 : 8;
  if (!mode.value) {
    Provider.filterQuery.value.pagination.limit = 6;
  }
  await Provider.store.dispatch('divisions/getAll', { filterQuery: Provider.filterQuery.value });
};

const loadMore = async () => {
  Provider.filterQuery.value.pagination.append = true;
  Provider.filterQuery.value.pagination.offset = divisions.value.length;
  await Provider.store.dispatch('divisions/getAll', { filterQuery: Provider.filterQuery.value });
};

const selectMode = async (selectedMode: string) => {
  mode.value = selectedMode;
  if (mode.value === 'divisions' && count.value !== 1) {
    Provider.replaceFilterModel(onlyDivisionsFilterModel.value, onlyCentersFilterModel.value.id);
  } else if (mode.value === 'centers' && count.value !== 1) {
    Provider.replaceFilterModel(onlyCentersFilterModel.value, onlyDivisionsFilterModel.value.id);
  }
  count.value--;
  await loadDivisions();
};
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
