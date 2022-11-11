<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <AvatarWithFavourite
          :image="doctor.employee.human.photoMini"
          error-img-name="doctor-default.webp"
          :domain-id="doctor.id"
          domain-name="doctor"
          :img-link="{ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.employee.human.slug } }"
        />
        <Rating :comments="doctor.doctorComments" />
      </div>
      <div class="flex-column right-side">
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.employee.human.slug } })">
          {{ doctor.employee.human.getFullName() }}
        </div>
        <div class="spec-list">
          <div v-if="doctor.medicalProfile" class="tag-link" @click="$router.push(`/medical-profiles/${doctor.medicalProfile.id}`)">
            {{ doctor.medicalProfile.name }}
          </div>
        </div>
        <div class="regalias-list">
          <template v-for="(regalia, index) in doctor.employee.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import AvatarWithFavourite from '@/components/AvatarWithFavourite.vue';
import Rating from '@/components/Rating.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'AcademicCard',
  components: { Rating, AvatarWithFavourite },
  props: {
    doctor: {
      type: Object as PropType<IDoctor>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
