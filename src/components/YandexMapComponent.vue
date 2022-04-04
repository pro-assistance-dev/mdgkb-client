<template>
  <yandex-map style="height: 600px" :coords="[55.725317, 37.619214]" zoom="16.24" :settings="settings" />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { loadYmap, yandexMap } from 'vue-yandex-maps';

export default defineComponent({
  name: 'YandexMapComponent',
  components: { yandexMap },
  setup() {
    const settings = {
      center: [55.74954, 37.621587],
      zoom: 10,
    };

    onMounted(async () => {
      await loadYmap();
    });

    return { settings };
  },
});
</script>

<style scoped></style>
