<template>
  <div v-if="socialsGroups.length > 0" class="image-gallery-container">
    <div class="gallery-container">
      <el-carousel
        ref="carouselRef"
        v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
        arrow="always"
        :interval="4000"
        indicator-position="outside"
      >
        <el-carousel-item v-for="socialGroup in socialsGroups" :key="socialGroup">
          <div style="display: flex">
            <div v-for="social in socialGroup" :key="social">
              <a :href="social.permalink">
                <img :src="social.mediaUrl" style="height: 100px; width: 100px" />
                <div>{{ social.caption.substring(1, 100) }}...</div>
              </a>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import ISocial from '@/interfaces/ISocial';

export default defineComponent({
  name: 'SocialGallery',

  setup() {
    const store = useStore();
    const socials: ComputedRef<ISocial[]> = computed(() => store.getters['meta/socials']);
    let socialsGroups: Ref<ISocial[][]> = ref([]);
    const mounted = ref(false);
    const carouselRef = ref();

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('meta/getSocial');
      // socialsGroups = splitByGroups(socials.value);
      const results: ISocial[][] = [];

      while (socials.value.length) {
        results.push(socials.value.splice(0, 3));
      }
      socialsGroups.value = results;
      mounted.value = true;
    });

    // const splitByGroups = (socials: ISocial[]): ISocial[][] => {
    //   const results: ISocial[][] = [];
    //   while (socials.length) {
    //     results.push(socials.splice(0, 3));
    //   }
    //   return results;
    // };
    //
    // const splitByGroups = (socials: ISocial[]): ISocial[][] => {
    //   const socialsGroups: ISocial[][] = [[]];
    //   const limit = 5;
    //   socials.forEach((social: ISocial) => {
    //     socialsGroups;
    //   });
    //   // for (let i = 0; i++; i< limit) {
    //   //
    //   // }
    // };

    return {
      socialsGroups,
      mounted,
      carouselRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery-container {
  margin-top: 30px;
  max-width: 1000px;
  img {
    width: 100%;
    max-width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
:deep(.el-carousel__arrow) {
  background-color: white;
  color: black;

  &:hover {
    background-color: #9c9c9c;
  }
}
:deep(.el-dialog__body),
:deep(.el-dialog__header) {
  padding: 0 !important;
  height: auto !important;
  img {
    width: 100%;
    max-width: 100%;
  }
}
</style>
