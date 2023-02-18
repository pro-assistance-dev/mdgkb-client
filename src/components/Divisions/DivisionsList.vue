<template>
  <div v-if="divisions.length" class="card-flex-container">
    <div v-for="division in divisions" :key="division.id" class="card-container">
      <DivisionCard v-if="!division.isCenter" :division="division" />
      <CenterCard v-else :center="division" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="divisions.length" class="loadmore-button">
    <LoadMoreButton @loadMore="$emit('load')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Division from '@/classes/Division';
import CenterCard from '@/components/Divisions/CenterCard.vue';
import DivisionCard from '@/components/Divisions/DivisionCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';

export default defineComponent({
  name: 'DivisionsList',
  components: { DivisionCard, LoadMoreButton, CenterCard },
  props: {
    divisions: {
      type: Array as PropType<Division[]>,
      default: () => [],
    },
  },
  emits: ['load'],
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px 10px 0px;
  justify-content: space-between;
  // margin-right: 20px;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}

.card-container {
  height: 350px;
  min-height: 400px;
  margin-left: 10px;
  margin-bottom: 20px;
}
</style>
