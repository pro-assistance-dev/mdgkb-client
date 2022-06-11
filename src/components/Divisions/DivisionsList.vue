<template>
  <div v-if="divisions.length" class="card-flex-container">
    <div v-for="division in divisions" :key="division.id" class="card-container">
      <DivisionCard :division="division" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="divisions.length" class="loadmore-button">
    <LoadMoreButton @loadMore="$emit('load')" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import DivisionCard from '@/components/Divisions/DivisionCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DivisionsList',
  components: { DivisionCard, LoadMoreButton },

  emits: ['load'],
  setup() {
    const divisions: Ref<IDivision[]> = computed<IDivision[]>(() => Provider.store.getters['divisions/divisions']);

    return {
      divisions,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px 10px 10px;
}
.card-container {
  height: auto;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
