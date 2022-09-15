<template>
  <component
    :is="'MainContainer'"
    v-if="mounted && carousel.length > 0"
    header-title="Специалисты отделения"
    header-button-title="Все врачи отделения"
    header-button-link="/doctors"
  >
    <el-carousel
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

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import IDivision from '@/interfaces/IDivision';
import IDoctor from '@/interfaces/IDoctor';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'DivisionSpecialists',
  components: { DoctorInfoCard, MainContainer },

  setup() {
    const store = useStore();
    const mounted: Ref<boolean> = ref(false);
    const carousel: Ref<IDoctor[][]> = ref([]);
    const carouselRef = ref();
    const division: ComputedRef<IDivision> = computed<IDivision>(() => store.getters['divisions/division']);

    onBeforeMount(async () => {
      carousel.value = makeCarousel<IDoctor>(division.value.doctors, 3);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
      carouselRef,
    };
  },
});
</script>
