<template>
  <div class="map-container">
    <map-svg :buildings="buildings"></map-svg>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import MapSvg from './MapSvg';

export default defineComponent({
  name: 'MapPage',
  components: {
    MapSvg,
  },

  async setup() {
    const store = useStore();

    await store.dispatch('buildings/getAll');
    const buildings = computed(() => store.getters['buildings/items']);

    return {
      buildings,
    };
  },
});
</script>

<style scoped lang="scss">
.map-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
