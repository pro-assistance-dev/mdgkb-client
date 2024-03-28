<template>
  <div v-if="employee.id" data-test="chief-id" class="foto-field">
    <div class="division-img">
      <img
        v-if="employee.human.photo.fileSystemPath"
        :src="employee.human.photo.getImageUrl()"
        alt="avatar"
        data-test="chief-photo"
        @error="employee.human.photo.errorImg"
      />
      <img v-else data-test="chief-alt-photo" src="src/assets/img/doctor-default.webp" alt="avatar" />
      <div data-test="chief-name" class="doctor-name">
        <router-link class="recent-news-item" :to="`/doctors/${employee.human.slug}`" style="padding-left: 0">
          {{ employee.human.getFullName() }}
        </router-link>
      </div>
      <div class="status">{{ chiefRole }}</div>
      <div class="favor">
        <FavouriteIcon :domain-id="favouriteId" :domain-name="favouriteDomain" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Employee from '@/classes/Employee';
import FavouriteIcon from '@/components/FavouriteIcon.vue';

export default defineComponent({
  name: 'ChiefCard',
  components: {
    FavouriteIcon,
  },
  props: {
    employee: { type: Object as PropType<Employee>, required: true },
    chiefRole: { type: String as PropType<string>, required: true },
    showFavourite: { type: Boolean as PropType<boolean>, required: true, default: false },
    favouriteId: { type: String as PropType<string>, required: false },
    favouriteDomain: { type: String as PropType<string>, required: false },
  },
});
</script>

<style lang="scss" scoped>
.division-name {
  margin: 0px;
}

.foto-field {
  max-width: 280px;
  background-color: white;
  background-clip: padding-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .division-img {
    position: relative;
    z-index: 1;
    img {
      border-radius: 5px;
      height: 280px;
      width: auto;
    }
    .favor {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      border-radius: 50%;
      border: 1px solid rgb(black, 0.1);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
      width: 30px;
      height: 30px;
      &:hover {
        transform: scale(1.1);
      }
      .anticon {
        font-size: 20px;
        color: #bdc2d1;
      }
    }
  }
  .doctor-name {
    font-size: 15px;
    font-weight: bold;
    margin: 2px 0 5px 0;
    line-height: 1.15;
  }

  .status {
    color: #a1a7bd;
    margin-bottom: 5px;
    font-size: 12px;
  }
}
</style>
