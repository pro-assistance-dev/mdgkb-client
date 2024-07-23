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
      v-touch:swipe="(direction: string) => $carouselSwipe(direction, carouselRef)"
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

<script lang="ts" setup>
import Event from '@/classes/Event';
import IEventTemplate from '@/interfaces/IEventTemplate';
import makeCarousel from '@/services/MakeCarousel';

const carousel: Ref<IEventTemplate[][]> = ref([]);
const mounted: Ref<boolean> = ref(false);
const carouselRef = ref();

const items: Event[] = EventsStore.Items();

onBeforeMount(async () => {
  mounted.value = true;
  carousel.value = makeCarousel<IEventTemplate>(items, 5);
  mounted.value = true;
});
</script>
