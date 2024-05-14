й
<template>
  <CollapseItem v-if="carousel.length > 0" tab-id="6" :collapsed="false">
    <template #inside-title>
      <div class="title-in">{{ headerTitle ? headerTitle : 'Специалисты' }}</div>
    </template>
    <template #inside-content>
      <component
        :is="'MainContainer'"
        v-if="carousel.length > 0"
        :header-button-title="headerButtonTitle ?? ''"
        :header-button-link="headerButtonLink ?? ''"
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
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Doctor from '@/classes/Doctor';
import DoctorInfoCard from '@/components/Doctors/DoctorInfoCard.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'DoctorsCarousel',
  components: { DoctorInfoCard, MainContainer, CollapseItem },
  props: {
    doctors: { type: Array as PropType<Doctor[]>, default: () => [] },
    headerTitle: { type: String as PropType<string>, default: 'Специалисты' },
    headerButtonTitle: { type: String as PropType<string>, default: 'Все врачи' },
    headerButtonLink: { type: String as PropType<string>, default: '/doctors' },
  },
  setup(props) {
    const carousel: Ref<Doctor[][]> = ref([]);
    const carouselRef = ref();

    onBeforeMount(() => {
      carousel.value = makeCarousel<Doctor>(props.doctors, 3);
    });

    return {
      carousel,
      carouselRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}
</style>
