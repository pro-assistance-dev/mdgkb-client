<template>
  <div v-if="educationalManagers.length" class="card-flex-container">
    <div v-for="manager in educationalManagers" :key="manager.id" class="card-container">
      <EducationalManagerCard :educational-manager="manager" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="educationalManagers.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts" setup>
import EducationalManager from '@/classes/EducationalManager';

const educationalManagers: EducationalManager[] = EducationalManagersStore.Items();

onBeforeMount(async () => {
  await EducationalManagersStore.GetAll();
});

const loadMore = async () => {
  await EducationalManagersStore.GetAll();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/doctor-info-card.scss';

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
