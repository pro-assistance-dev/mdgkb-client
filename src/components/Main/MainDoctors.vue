<template>
  <MainContainer header-title="Наши специалисты" header-button-title="Все врачи" header-button-link="/doctors">
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
  </MainContainer>
</template>

<script lang="ts" setup>
import Doctor from '@/classes/Doctor';
import makeCarousel from '@/services/MakeCarousel';

const doctors: Doctor[] = DoctorsStore.Items();
const mounted: Ref<boolean> = ref(false);
const carousel: Ref<Doctor[][]> = ref([]);
const carouselRef = ref();

onBeforeMount(async () => {
  const ftsp = new FTSP();
  ftsp.p.limit = 8;
  await DoctorsStore.FTSP({ ftsp: ftsp, withCache: true });
  carousel.value = makeCarousel<Doctor>(doctors, 3);
  mounted.value = true;
});
</script>
