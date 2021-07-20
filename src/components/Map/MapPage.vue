<template>
  <div class="container">
    <div id="mapcontainer">
      <map-svg :buildings="buildings"></map-svg>
    </div>
  </div>
</template>

<script>
import MapSvg from './MapSvg';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MapPage',
  components: {
    MapSvg,
  },

  async setup() {
    const store = useStore();

    await store.dispatch('buildings/getAll');
    const buildings = computed(() => store.getters['buildings/buildings']);

    return {
      buildings,
    };
  },
});
</script>

<style scoped></style>
