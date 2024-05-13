<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <AvatarWithFavourite
          :image="employee.human.photoMini"
          error-img-name="doctor-default.webp"
          :domain-id="employee.id"
          domain-name="doctor"
          :img-link="{ name: `DoctorPage`, params: { id: employee.id, slug: employee.human.slug } }"
        />
      </div>
      <div class="flex-column right-side">
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: employee.id, slug: employee.human.slug } })">
          {{ employee.human.getFullName() }}
        </div>
        <div class="regalias-list">
          <template v-for="(regalia, index) in employee.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Employee from '@/classes/Employee';
import AvatarWithFavourite from '@/components/AvatarWithFavourite.vue';

export default defineComponent({
  name: 'AcademicCard',
  components: { AvatarWithFavourite },
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
