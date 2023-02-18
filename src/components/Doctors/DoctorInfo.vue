<template>
  <HeaderInfo :left-width="'330px'" :background="'#ffffff'" :is-single="true">
    <template #foto>
      <div class="foto-field">
        <div class="doctor-img">
          <img
            v-if="doctor.employee.human.photo.fileSystemPath"
            data-test="doctor-photo"
            :src="doctor.employee.human.photo.getImageUrl()"
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
    </template>

    <template #small-title>
      <template v-for="doctorDivision in doctor.doctorsDivisions" :key="doctorDivision.id">
        <div
          v-if="doctorDivision.division.name"
          data-test="division-name"
          class="division-name"
          @click="$router.push(`/divisions/${doctorDivision.division.id}`)"
        >
          {{ doctorDivision.division.name }}
        </div>
      </template>
    </template>

    <template #big-title>
      {{ doctor.employee.human.getFullName() }}
    </template>

    <template #tags>
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
    </template>

    <template #contact>
      <div class="regalias-list">
        <span v-if="doctor.employee.academicDegree.length" data-test="regalia-list">
          <span>{{ doctor.employee.academicDegree }}</span>
          <span v-if="doctor.employee.regalias.length || doctor.employee.academicRank.length"> • </span>
        </span>
        <span v-if="doctor.employee.academicRank.length > 1" data-test="regalia-list">
          <span>{{ doctor.employee.academicRank }}</span>
          <span v-if="doctor.employee.regalias"> • </span>
        </span>
        <template v-for="(regalia, index) in doctor.employee.regalias" :key="regalia.id">
          <span v-if="regalia?.name" data-test="regalia-list">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </span>
        </template>
      </div>
      <TimetableComponent :timetable="doctor.timetable" />
      <div v-if="doctor.division?.address" class="address">
        Адрес приема:
        <a data-test="map-link" @click="$router.push(`/map/${doctor.division.id}`)">
          {{ doctor.division.address }}
        </a>
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
    </template>

    <template #icons>
      <WorkAndTeaching :doctor="doctor" />
    </template>

    <template #buttons>
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
      <a v-if="doctor.onlineDoctorId" data-test="online-consult-button" :href="doctor.getOnlineDoctorLink()" target="_blank">
        <button class="consult">Онлайн консультация</button>
      </a>
      <a @click="$scroll('#leave-a-review')">
        <button class="review">Оставить отзыв</button>
      </a>
    </template>
  </HeaderInfo>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import HeaderInfo from '@/components/Base/HeaderInfo.vue';
import WorkAndTeaching from '@/components/Doctors/WorkAndTeaching.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import Rating from '@/components/Rating.vue';
import TimetableComponent from '@/components/TimetableComponent.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfo',
  components: { FavouriteIcon, Rating, WorkAndTeaching, TimetableComponent, HeaderInfo },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info.scss';
</style>
