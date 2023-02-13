<template>
  <div v-if="employee.id" data-test="chief-id" class="card-item-left">
    <div class="division-img">
      <img
        v-if="employee.human.photo.fileSystemPath"
        :src="employee.human.photo.getImageUrl()"
        alt="alt"
        data-test="chief-photo"
        @error="employee.human.photo.errorImg"
      />
      <img v-else data-test="chief-alt-photo" src="@/assets/img/doctor-default.webp" />
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
@import '@/assets/styles/elements/division-info.scss';

// test block
.test {
  width: 290px;
  height: 290px;
  background: #c4c4c4;
}

.division-name {
  margin: 0px;
}
</style>
