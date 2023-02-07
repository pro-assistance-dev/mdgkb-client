<template>
  <component
    :is="'MainContainer'"
    header-title="Мероприятия"
    header-button-title="Все мероприятия"
    background-color="white"
    header-button-link="/news"
  >
    <el-carousel
      v-if="mounted"
      ref="carouselRef"
      v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
      :interval="5000"
      indicator-position="outside"
      height="200px"
    >
      <el-carousel-item v-for="(events, i) in carousel" :key="i">
        <MainEventCard v-for="item in events" :key="item.id" :item="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainContainer from '@/components/Main/MainContainer.vue';
import MainEventCard from '@/components/Main/MainEventCard.vue';
import IEventTemplate from '@/interfaces/IEventTemplate';
import IEvent from '@/interfaces/news/IEvent';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'MainEvents',
  components: { MainEventCard, MainContainer },

  setup() {
    const carousel: Ref<IEventTemplate[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    const store = useStore();
    const items: ComputedRef<IEvent[]> = computed<IEvent[]>(() => store.getters['events/items']);

    onBeforeMount(async () => {
      await store.dispatch('events/getAllMain');
      mounted.value = true;
      carousel.value = makeCarousel<IEventTemplate>(items.value, 5);
      mounted.value = true;
    });

    return {
      carousel,
      carouselRef,
      mounted,
    };
  },
});
</script>
