<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <div class="doctor-img" @click="$router.push({ name: `DivisionPage`, params: { id: division.id, slug: division.slug } })">
          <!--          <img v-if="doctor.photoMini.fileSystemPath" :src="doctor.photoMini.getImageUrl()" alt="alt" @error="errorImg" />-->
          <img src="@/assets/img/building-default.png" />
          <div class="favor">
            <FavouriteIcon :domain-id="division.id" domain-name="division" />
          </div>
        </div>
        <RatingBlock :division="division" />
      </div>
      <div class="flex-column right-side">
        <div class="doctor-name" @click="$router.push({ name: `DivisionPage`, params: { id: division.id, slug: division.slug } })">
          {{ division.name }}
        </div>
        <div class="address">
          <span v-if="division.getAddress()">
            Адрес:
            <a @click="$router.push(`/map/${division.id}`)">
              {{ division.address }}
            </a>
          </span>
        </div>
      </div>
    </div>
    <div v-if="division.phone">Телефон: {{ division.phone }}</div>
    <div v-if="division.email">Email: {{ division.phone }}</div>
    <div class="doctor-card-footer">
      <button>Запись на прием</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import RatingBlock from '@/components/Divisions/RatingBlock.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'DivisionCard',
  components: { RatingBlock, FavouriteIcon },
  props: {
    division: { type: Object as PropType<IDivision>, required: true },
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
