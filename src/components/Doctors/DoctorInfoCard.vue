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
        <a v-if="doctor.mosDoctorLink" :href="doctor.getMosDoctorLink()" target="_blank">
          <div class="mos-doctor-img">
            <img src="@/assets/img/mos-doctor.webp" />
            <span>Московский</span>
            <span>врач</span>
          </div>
        </a>
      </div>
      <div class="flex-column right-side">
        <div
          v-if="doctor.doctorsDivisions && doctor.doctorsDivisions.length > 0"
          class="division-name"
          @click="$router.push(`/divisions/${doctor.doctorsDivisions[0].division.slug}`)"
        >
          {{ doctor.doctorsDivisions[0].division.name }}
        </div>
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
        <div v-for="doctorDivision in doctor.doctorsDivisions" :key="doctorDivision.id" class="address">
          <span v-if="doctorDivision.division.address.length">
            Адрес приема:
            <a v-if="doctorDivision.division.address.length" @click="$router.push(`/map/${doctorDivision.division.id}`)">
              {{ doctorDivision.division.address }}
            </a>
          </span>
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

import AvatarWithFavourite from '@/components/AvatarWithFavourite.vue';
import Rating from '@/components/Rating.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfoCard',
  components: { Rating, AvatarWithFavourite },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
@import '@/assets/styles/elements/base-style.scss';
.mos-doctor-img {
  border-radius: $normal-border-radius;
  border: $normal-border;
  padding: 10px 15px;
}

.mos-doctor-img:hover {
  background: $site_light_gray;
}

.mos-doctor-img:active {
  background: #ffffff;
}

:deep(.icon-comment) {
  width: 25px;
  height: 24px;
  fill: #2653ea;
  margin-right: 5px;
}

:deep(.numbers-comment) {
  justify-content: left;
}
</style>
