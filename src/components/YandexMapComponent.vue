<template>
  <yandex-map ref="map" :key="'cb3c832b-28b0-447e-8a83-d845d7290b8e'" style="height: 600px" zoom="16.24" :coords="[55.723983, 37.618551]">
    <ymap-marker marker-id="123" :coords="[55.723983, 37.618551]" :marker-events="['click']"></ymap-marker>
  </yandex-map>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { yandexMap as YandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'YandexMapComponent',
  components: { YandexMap, ymapMarker },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
