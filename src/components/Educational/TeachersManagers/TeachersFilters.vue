<template>
  <div v-if="mount" class="left-side-container">
    <RemoteSearch key-value="teacher" @select="selectSearch" />

    <FilterReset @load="load" />
    <SortList :models="createSortModels()" @load="load" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import FilterReset from '@/components/Filters/FilterResetButton.vue';
import SortModel from '@/services/classes/SortModel';
import ISearchObject from '@/services/interfaces/ISearchObject';

const router = useRouter();
const mount = ref(false);

onBeforeMount(async () => {
  await load();
  mount.value = true;
});

const load = async () => {
  // filterQuery.value.pagination.cursorMode = false;
  // filterQuery.value.pagination.limit = 6;
  await Store.FTSP('teachers');
};

const createSortModels = (): SortModel[] => {};

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await router.push(`/divisions/${event.value}`);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
</style>
