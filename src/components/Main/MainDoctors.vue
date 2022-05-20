<template>
  <component :is="'MainContainer'" header-title="Наши специалисты" header-button-title="Все врачи" header-button-link="/doctors">
    <el-carousel
      v-if="mounted"
      ref="carouselRef"
      v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
      :interval="5000"
      indicator-position="outside"
      height="350px"
    >
      <el-carousel-item v-for="(doctors, i) in carousel" :key="i">
        <DoctorInfoCard v-for="item in doctors" :key="item.id" :doctor="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'MainDoctors',
  components: { DoctorInfoCard, MainContainer },

  setup() {
    const store = useStore();
    const doctors: ComputedRef<IDoctor[]> = computed(() => store.getters['doctors/items']);
    const mounted: Ref<boolean> = ref(false);
    const carousel: Ref<IDoctor[][]> = ref([]);
    const carouselRef = ref();

    const makeCarousel = (array: IDoctor[], size: number): IDoctor[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    onBeforeMount(async () => {
      const fq = new FilterQuery();
      fq.pagination.limit = 8;
      await store.dispatch('doctors/getAllMain', fq);
      carousel.value = makeCarousel(doctors.value, 3);
      mounted.value = true;
    });

    return {
      mounted,
      carousel,
      carouselRef,
    };
  },
});
</script>
