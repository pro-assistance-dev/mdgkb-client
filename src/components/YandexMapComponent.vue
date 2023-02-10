<template>
  <yandex-map ref="map" :key="'cb3c832b-28b0-447e-8a83-d845d7290b8e'" style="height: 600px" zoom="17.24" :coords="coords">
    <ymap-marker marker-id="123" :coords="coords" :marker-events="['click']"></ymap-marker>
  </yandex-map>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { yandexMap as YandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'YandexMapComponent',
  components: { YandexMap, ymapMarker },
  props: {
    coords: {
      type: Array as PropType<number[]>,
      default: () => [55.72430294200026, 37.61724675131226],
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped></style>
