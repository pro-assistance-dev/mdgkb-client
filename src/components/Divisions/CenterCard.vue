<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <div class="doctor-img" @click="$router.push({ name: `CenterPage`, params: { id: center.id, slug: center.slug } })">
          <!--          <img v-if="doctor.photoMini.fileSystemPath" :src="doctor.photoMini.getImageUrl()" alt="alt" @error="errorImg" />-->
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
  <svg width="0" height="0" class="hidden">
    <symbol id="phone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M12 6.5H11C10.9996 6.1023 10.8414 5.721 10.5602 5.43978C10.279 5.15856 9.8977 5.0004 9.5 5V4C10.1628 4.00079 10.7982 4.26444 11.2669 4.73311C11.7356 5.20178 11.9992 5.8372 12 6.5Z"
      ></path>
      <path
        d="M14 6.5H13C12.9989 5.57207 12.6299 4.68244 11.9737 4.0263C11.3176 3.37015 10.4279 3.00106 9.5 3V2C10.6931 2.00132 11.8369 2.47585 12.6805 3.31948C13.5241 4.16311 13.9987 5.30693 14 6.5Z"
      ></path>
      <path
        d="M10.167 10.741L11.287 9.621C11.4369 9.47105 11.6275 9.36838 11.8352 9.32572C12.043 9.28306 12.2586 9.30228 12.4555 9.381L13.8195 9.927C14.0205 10.0074 14.1929 10.1463 14.3142 10.3256C14.4356 10.5049 14.5005 10.7165 14.5005 10.933V13.4135C14.5009 13.5609 14.4711 13.7069 14.4131 13.8424C14.3551 13.978 14.27 14.1002 14.1631 14.2018C14.0562 14.3033 13.9297 14.3819 13.7914 14.4329C13.653 14.4838 13.5057 14.506 13.3585 14.498C3.7975 13.903 1.8665 5.805 1.508 2.704C1.49063 2.5524 1.50556 2.39884 1.5518 2.25342C1.59805 2.108 1.67455 1.97402 1.77628 1.86029C1.87802 1.74656 2.00268 1.65566 2.14206 1.59356C2.28145 1.53146 2.43241 1.49958 2.585 1.5H5.0215C5.23803 1.5 5.4496 1.56487 5.62892 1.68625C5.80823 1.80764 5.94706 1.97996 6.0275 2.181L6.573 3.545C6.65172 3.74189 6.67094 3.95755 6.62828 4.16526C6.58562 4.37296 6.48295 4.56359 6.333 4.7135L5.213 5.8335C5.213 5.8335 5.834 10.1995 10.167 10.741Z"
      ></path>
    </symbol>
    <symbol id="email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22H17V20H12C7.66 20 4 16.34 4 12C4 7.66 7.66 4 12 4C16.34 4 20 7.66 20 12V13.43C20 14.22 19.29 15 18.5 15C17.71 15 17 14.22 17 13.43V12C17 9.24 14.76 7 12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C13.38 17 14.64 16.44 15.54 15.53C16.19 16.42 17.31 17 18.5 17C20.47 17 22 15.4 22 13.43V12C22 6.48 17.52 2 12 2ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
      ></path>
    </symbol>

    <symbol id="time" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M8 1C4.1402 1 1 4.1402 1 8C1 11.8598 4.1402 15 8 15C11.8598 15 15 11.8598 15 8C15 4.1402 11.8598 1 8 1ZM10.3051 11.2949L7.3 8.2898V3.8H8.7V7.7102L11.2949 10.3051L10.3051 11.2949Z"
      ></path>
    </symbol>

    <symbol id="map-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        d="M7.99923 0.888916C6.61487 0.890072 5.28722 1.439 4.30625 2.4158C3.32529 3.39261 2.77072 4.71791 2.76367 6.10225C2.76367 8.1778 3.92812 9.91558 4.78145 11.1822L4.93701 11.4134C5.78602 12.6439 6.69682 13.8306 7.66589 14.9689L8.00367 15.3645L8.34145 14.9689C9.31041 13.8305 10.2212 12.6438 11.0703 11.4134L11.2259 11.1778C12.0748 9.91114 13.2392 8.1778 13.2392 6.10225C13.2322 4.71714 12.677 3.39117 11.6951 2.41424C10.7131 1.43731 9.38435 0.888898 7.99923 0.888916ZM7.99923 8.44447C7.42259 8.44447 6.85889 8.27348 6.37943 7.95311C5.89997 7.63275 5.52628 7.1774 5.30561 6.64465C5.08493 6.1119 5.0272 5.52568 5.13969 4.96012C5.25219 4.39456 5.52987 3.87505 5.93762 3.46731C6.34537 3.05956 6.86487 2.78188 7.43043 2.66938C7.99599 2.55688 8.58221 2.61462 9.11496 2.83529C9.64771 3.05597 10.1031 3.42966 10.4234 3.90912C10.7438 4.38858 10.9148 4.95227 10.9148 5.52892C10.9148 6.30217 10.6076 7.04375 10.0608 7.59053C9.51406 8.1373 8.77248 8.44447 7.99923 8.44447Z"
      ></path>
      <path
        d="M8.00055 7.18665C8.91612 7.18665 9.65833 6.44444 9.65833 5.52887C9.65833 4.61331 8.91612 3.87109 8.00055 3.87109C7.08499 3.87109 6.34277 4.61331 6.34277 5.52887C6.34277 6.44444 7.08499 7.18665 8.00055 7.18665Z"
      ></path>
    </symbol>
  </svg>
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
