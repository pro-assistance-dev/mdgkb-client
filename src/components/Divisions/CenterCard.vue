<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <div class="doctor-img" @click="$router.push({ name: `CenterPage`, params: { id: center.id, slug: center.slug } })">
          <!--          <img v-if="doctor.employee.human.photoMini.fileSystemPath" :src="doctor.employee.human.photoMini.getImageUrl()" alt="alt" @error="errorImg" />-->
          <img src="@/assets/img/building-default.webp" />
          <div class="favor">
            <FavouriteIcon :domain-id="center.id" domain-name="center" />
          </div>
        </div>
      </div>
      <div class="flex-column right-side">
        <div class="doctor-name" @click="$router.push({ name: `CenterPage`, params: { id: center.id, slug: center.slug } })">
          {{ center.name }}
        </div>
        <div class="contact-h3">
          <div class="item">
            <svg v-if="center.address" class="icon-map-marker">
              <use xlink:href="#map-marker"></use>
            </svg>
          </div>
          <div class="item">
            <a @click="$router.push(`/map/${center.id}`)">
              {{ center.address }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
    </div>
  </div>
  <Phone />
  <Email />
  <Time />
  <MapMarker />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Email from '@/assets/svg/DivisionCard/Email.svg';
import MapMarker from '@/assets/svg/DivisionCard/MapMarker.svg';
import Phone from '@/assets/svg/DivisionCard/Phone.svg';
import Time from '@/assets/svg/DivisionCard/Time.svg';
import Division from '@/classes/Division';
import FavouriteIcon from '@/components/FavouriteIcon.vue';

export default defineComponent({
  name: 'CenterCard',
  components: { FavouriteIcon, Phone, Email, MapMarker, Time },
  props: {
    center: { type: Object as PropType<Division>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.webp');
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
