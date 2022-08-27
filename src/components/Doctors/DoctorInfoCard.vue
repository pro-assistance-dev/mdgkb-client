<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <AvatarWithFavourite
          :image="doctor.human.photoMini"
          error-img-name="doctor-default.webp"
          :domain-id="doctor.id"
          domain-name="doctor"
          :img-link="{ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } }"
        />
        <Rating :comments="doctor.doctorComments" />
        <a v-if="doctor.mosDoctorLink" :href="doctor.getMosDoctorLink()">
          <div class="mos-doctor-img">
            <img src="@/assets/img/mos-doctor.webp" />
            <span>Московский</span>
            <span>врач</span>
          </div>
        </a>
      </div>
      <div class="flex-column right-side">
        <div class="division-name" @click="$router.push(`/divisions/${doctor.division.slug}`)">
          {{ doctor.division.name }}
        </div>
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } })">
          {{ doctor.human.getFullName() }}
        </div>
        <div class="spec-list">
          <div v-if="doctor.medicalProfile" class="tag-link" @click="$router.push(`/medical-profiles/${doctor.medicalProfile.id}`)">
            {{ doctor.medicalProfile.name }}
          </div>
        </div>
        <div class="regalias-list">
          <template v-for="(regalia, index) in doctor.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
        <div class="address">
          <span v-if="doctor.division.address">
            Адрес приема:
            <a @click="$router.push(`/map/${doctor.division.id}`)">
              {{ doctor.division.address }}
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
    </div>
  </div>
  <!-- <div class="flex-column">
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@/assets/img/doctor-default.webp" />
        </div>
        <div class="flex-column">
          <span class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } })">
            <b>{{ doctor.human.getFullName() }}</b>
          </span>
          <span>Врач {{ doctor.position }}</span>
          <span>{{ doctor.tags }}</span>
          <span>Прием: {{ division.address }}</span>
          <span>График работы: {{ doctor.schedule }}</span>
        </div>
      </div>
      <span>Отделение: {{ division.name }}</span>
      <span>Образование: {{ doctor.education }}</span>
    </div> -->
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
</style>
