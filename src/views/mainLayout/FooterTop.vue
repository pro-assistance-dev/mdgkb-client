<template>
  <div class="footer-top">
    <div class="container">
      <el-carousel v-if="mounted" :interval="5000">
        <el-carousel-item v-for="(banners, i) in carousel" :key="i">
          <div v-for="item in banners" :key="item.id" class="image">
            <a :href="item.link ? `http://${item.link}` : null">
              <img v-if="item.fileInfo.fileSystemPath" :src="item.fileInfo.getImageUrl()" :alt="item.name" />
            </a>
          </div>
        </el-carousel-item>
      </el-carousel>
      <el-row> </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import IBanner from '@/interfaces/banners/IBanner';

export default defineComponent({
  name: 'FooterTop',

  setup() {
    const store = useStore();
    const banners = computed(() => store.getters['banners/banners']);
    const carousel: Ref<IBanner[][]> = ref([]);
    const mounted = ref(false);

    const makeCarousel = (array: IBanner[], size: number): IBanner[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    const loadBanners = async () => {
      await store.dispatch('banners/getAll');
      carousel.value = makeCarousel(banners.value, 4);
      mounted.value = true;
    };

    onMounted(loadBanners);

    return { carousel, mounted };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-carousel__item) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

:deep(.el-carousel__container) {
  max-height: 200px;

  @media only screen and (max-width: 992px) {
    max-height: unset;
  }
}

img {
  max-height: 150px;
  &:hover {
    transform: scale(1.01);
    //   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
}
</style>
