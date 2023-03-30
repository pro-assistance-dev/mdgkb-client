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

import Doctor from '@/classes/Doctor';
import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'MainDoctors',
  components: { DoctorInfoCard, MainContainer },

  setup() {
    const store = useStore();
    const doctors: ComputedRef<Doctor[]> = computed(() => store.getters['doctors/items']);
    const mounted: Ref<boolean> = ref(false);
    const carousel: Ref<Doctor[][]> = ref([]);
    const carouselRef = ref();

    onBeforeMount(async () => {
      const fq = new FilterQuery();
      fq.pagination.limit = 8;
      await store.dispatch('doctors/getAll', fq);
      carousel.value = makeCarousel<Doctor>(doctors.value, 3);
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
