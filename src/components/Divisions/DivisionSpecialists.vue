<template>
  <component
    :is="'MainContainer'"
    v-if="carousel.length > 0"
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
      <el-carousel-item v-for="(doctors, i) in carousel" :key="i" data-test="doctors-carousel">
        <DoctorInfoCard v-for="item in doctors" :key="item.id" :doctor="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import IDoctor from '@/interfaces/IDoctor';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'DivisionSpecialists',
  components: { DoctorInfoCard, MainContainer },
  props: {
    doctors: { type: Array as PropType<IDoctor[]>, required: true },
  },
  setup(props) {
    const carousel: Ref<IDoctor[][]> = ref([]);
    const carouselRef = ref();

    onBeforeMount(() => {
      carousel.value = makeCarousel<IDoctor>(props.doctors, 3);
    });

    return {
      carousel,
      carouselRef,
    };
  },
});
</script>
