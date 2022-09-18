<template>
  <component :is="'MainContainer'" v-if="mounted && items.length" header-title="Соцсети" background-color="white">
    <SocialMediaCarousel :social-medias="items" />
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MainContainer from '@/components/Main/MainContainer.vue';
import SocialMediaCarousel from '@/components/SocialMediaCarousel.vue';
import ISocialMedia from '@/interfaces/ISocialMedia';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'MainSocialMedia',
  components: { SocialMediaCarousel, MainContainer },

  setup() {
    const mounted: Ref<boolean> = ref(false);

    const items: ComputedRef<ISocialMedia[]> = computed<ISocialMedia[]>(() => Provider.store.getters['meta/socialMedia']);

    onBeforeMount(async () => {
      await Provider.store.dispatch('meta/getSocialMedia');
      mounted.value = true;
    });

    return {
      items,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 980px) {
  .size {
    width: 170px;
  }
}

@media screen and (max-width: 480px) {
  :deep(.main-page-container-header-title) {
    margin-left: 15px;
    letter-spacing: 0;
    font-size: 18px;
  }
}
</style>
