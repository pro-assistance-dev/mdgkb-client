<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <div class="doctor-img" @click="$router.push({ name: `CenterPage`, params: { id: center.id, slug: center.slug } })">
          <!--          <img v-if="doctor.photoMini.fileSystemPath" :src="doctor.photoMini.getImageUrl()" alt="alt" @error="errorImg" />-->
          <img src="@/assets/img/building-default.png" />
          <div class="favor">
            <FavouriteIcon :domain-id="center.id" domain-name="center" />
          </div>
        </div>
      </div>
      <div class="flex-column right-side">
        <div class="doctor-name" @click="$router.push({ name: `CenterPage`, params: { id: center.id, slug: center.slug } })">
          {{ center.name }}
        </div>
        <div class="address">
          Адрес:
          <a @click="$router.push(`/map/${center.id}`)">
            {{ center.address }}
          </a>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FavouriteIcon from '@/components/FavouriteIcon.vue';
import ICenter from '@/interfaces/ICenter';

export default defineComponent({
  name: 'CenterCard',
  components: { FavouriteIcon },
  props: {
    center: { type: Object as PropType<ICenter>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.png');
      }
    };

    return {
      errorImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
