<template>
  <div class="card-item">
    <div class="card-item-left">
      <div class="doctor-img">
        <img
          v-if="doctor.human.photo.fileSystemPath"
          data-test="doctor-photo"
          :src="doctor.human.photo.getImageUrl()"
          alt="alt"
          @error="user.human.photo.errorImg($event)"
        />
        <img v-else data-test="doctor-alt-photo" src="@/assets/img/doctor-default.webp" />
        <div class="favor">
          <FavouriteIcon :domain-id="doctor.id" :domain-name="'doctor'" />
        </div>
      </div>
      <Rating :comments="doctor.doctorComments" />
    </div>

    <div class="card-item-middle">
      <template v-for="doctorDivision in doctor.doctorsDivisions" :key="doctorDivision.id">
        <div
          v-if="doctorDivision.division.name"
          data-test="division-name"
          class="division-name"
          @click="$router.push(`/divisions/${doctorDivision.division.slug}`)"
        >
          {{ doctorDivision.division.name }}
        </div>
      </template>
      <div data-test="doctor-name" class="doctor-name">
        {{ doctor.human.getFullName() }}
      </div>
      <div v-if="doctor.isChief()" data-test="is-chief-block" class="green-tag-link">Заведующий отделением</div>
      <div
        v-if="doctor.medicalProfile?.name"
        data-test="medical-profile-name"
        class="tag-link"
        @click="$router.push(`/doctors?medical-profile=${doctor.medicalProfile.id}`)"
      >
        {{ doctor.medicalProfile.name }}
      </div>

      <div
        v-if="doctor.position?.name"
        data-test="position-name"
        class="tag-link"
        @click="$router.push(`/doctors?position=${doctor.position.id}`)"
      >
        {{ doctor.position.name }}
      </div>
      <div class="card-item-middle-bottom">
        <div class="regalias-list">
          <span v-if="doctor.academicDegree.length > 1" data-test="regalia-list">
            <span>{{ doctor.academicDegree }}</span
            ><span v-if="doctor.regalias || doctor.academicRank.length > 1"> • </span>
          </span>
          <span v-if="doctor.academicRank.length > 1" data-test="regalia-list">
            <span>{{ doctor.academicRank }}</span
            ><span v-if="doctor.regalias"> • </span>
          </span>
          <template v-for="(regalia, index) in doctor.regalias" :key="regalia.id">
            <span v-if="regalia?.name" data-test="regalia-list">
              <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
            </span>
          </template>
        </div>
        <div class="contact-h3">
          <TimetableComponent :timetable="doctor.timetable" />
        </div>
        <div class="address">
          <span v-if="doctor.division?.address">
            Адрес приема:
            <a data-test="map-link" @click="$router.push(`/map/${doctor.division.id}`)">
              {{ doctor.division.address }}
            </a>
          </span>
        </div>
        <router-link v-if="doctor.mosDoctorLink" data-test="mos-doctor-link" class="mos-doctor-img" :to="doctor.getMosDoctorLink()">
          <div class="mos-doctor-img-container">
            <img src="@/assets/img/mos-doctor.webp" />
          </div>
          <div>
            <div>Московский</div>
            <div>врач</div>
          </div>
        </router-link>
        <div class="card-item-bottom-bottom">
          <WorkAndTeaching :doctor="doctor" />
        </div>
      </div>
    </div>

    <div class="card-item-right">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
      <a v-if="doctor.onlineDoctorId" data-test="online-consult-button" :href="doctor.getOnlineDoctorLink()" target="_blank">
        <button class="consult">Онлайн консультация</button>
      </a>
      <a @click="$scroll('#leave-a-review')">
        <button class="review">Оставить отзыв</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import WorkAndTeaching from '@/components/Doctors/WorkAndTeaching.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import Rating from '@/components/Rating.vue';
import TimetableComponent from '@/components/TimetableComponent.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfo',
  components: { FavouriteIcon, Rating, WorkAndTeaching, TimetableComponent },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info.scss';
@import '@/assets/styles/elements/base-style.scss';
.moscow-doctor {
  height: 60px;
}

.card-item-bottom-bottom {
  position: absolute;
  bottom: 0px;
}

.card-item-middle {
  position: relative;
}
.hidden {
  display: none;
}

.mos-doctor-img {
  border-radius: $normal-border-radius;
  border: $normal-border;
  padding: 10px 15px;
  width: 150px;
  margin-bottom: 60px;
}

.mos-doctor-img:hover {
  background: $site_light_gray;
}

.mos-doctor-img:active {
  background: #ffffff;
}

:deep(.el-rate__icon) {
  margin: 0;
  font-size: 20px;
}

.contact-h3 {
  display: flex;
  justify-content: left;
  font-family: Roboto, Verdana, sans-serif;
  font-size: 12px;
  font-weight: lighter;
  color: #4a4a4a;
  align-content: center;
  text-align: center;
  margin-top: 15px;
  width: auto;
}
</style>
