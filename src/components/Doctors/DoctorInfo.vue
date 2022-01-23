<template>
  <div class="card-item">
    <div class="card-item-left">
      <div class="doctor-img">
        <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
        <img v-else src="@/assets/img/doctor-default.png" />
        <div class="favor">
          <FavouriteIcon :domain-id="doctor.id" :domain-name="'doctor'" />
        </div>
      </div>
      <DoctorRating :doctor="doctor" />
    </div>

    <div class="card-item-middle">
      <div class="division-name" @click="$router.push(`/divisions/${doctor.division.id}`)">
        {{ doctor.division.name }}
      </div>
      <div class="doctor-name">
        {{ doctor.human.getFullName() }}
      </div>
      <div class="tag-link">
        {{ doctor.medicalProfile.name }}
      </div>

      <div class="tag-link">
        {{ doctor.position.name }}
      </div>
      <div class="card-item-middle-bottom">
        <div class="regalias-list">
          <template v-for="(regalia, index) in doctor.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
        <div class="address">
          <span v-if="doctor.division.address">
            Адрес приема:
            <a>
              {{ doctor.division.address }}
            </a>
          </span>
        </div>
        <div v-if="doctor.mosDoctorLink" class="mos-doctor-img">
          <div class="mos-doctor-img-container">
            <img src="@/assets/img/mos-doctor.png" />
          </div>
          <a :href="doctor.getMosDoctorLink()">
            <div>
              <div>Московский</div>
              <div>врач</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="card-item-right">
      <button>Запись на прием</button>
      <a v-if="doctor.onlineDoctorId" :href="doctor.getOnlineDoctorLink()" target="_blank">
        <button class="consult">Онлайн консультация</button>
      </a>
      <a @click="$scroll('leave-a-review')">
        <button class="review">Оставить отзыв</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import DoctorRating from '@/components/Doctors/DoctorRating.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import IDoctor from '@/interfaces/IDoctor';
export default defineComponent({
  name: 'DoctorInfo',
  components: { FavouriteIcon, DoctorRating },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info.scss';
</style>
