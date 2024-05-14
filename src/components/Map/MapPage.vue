<template>
  <div class="map-container">
    <!-- <map-svg :buildings="buildings"></map-svg> -->
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MapPage',

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

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.map-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
