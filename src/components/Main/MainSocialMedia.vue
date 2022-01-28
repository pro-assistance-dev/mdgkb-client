<template>
  <component :is="'MainContainer'" header-title="Соцсети" background-color="white">
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="350px">
      <el-carousel-item v-for="(socialMedias, i) in carousel" :key="i">
        <SocialMediaCard v-for="item in socialMedias" :key="item.description" :item="item" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainContainer from '@/components/Main/MainContainer.vue';
import SocialMediaCard from '@/components/SocialMediaCard.vue';
import ISocialMedia from '@/interfaces/ISocialMedia';

export default defineComponent({
  name: 'MainSocialMedia',
  components: { MainContainer, SocialMediaCard },

  setup() {
    const carousel: Ref<ISocialMedia[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);

    const makeCarousel = (array: ISocialMedia[], size: number): ISocialMedia[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    const store = useStore();
    const items: ComputedRef<ISocialMedia[]> = computed<ISocialMedia[]>(() => store.getters['meta/socialMedia']);

    onBeforeMount(async () => {
      await store.dispatch('meta/getSocialMedia');
      carousel.value = makeCarousel(items.value, 5);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
    };
  },
});
</script>
