<template>
  <div class="card-item">
    <div class="card-item-left">
      <div class="doctor-img">
        <img
          v-if="doctor.human.photo.fileSystemPath"
          :src="doctor.human.photo.getImageUrl()"
          alt="alt"
          @error="user.human.photo.errorImg($event)"
        />
        <img v-else src="@/assets/img/doctor-default.webp" />
        <div class="favor">
          <FavouriteIcon :domain-id="doctor.id" :domain-name="'doctor'" />
        </div>
      </div>
      <Rating :comments="doctor.doctorComments" />
    </div>

    <div class="card-item-middle">
      <div v-if="doctor.division?.name" class="division-name" @click="$router.push(`/divisions/${doctor.division.slug}`)">
        {{ doctor.division.name }}
      </div>
      <div class="doctor-name">
        {{ doctor.human.getFullName() }}
      </div>
      <div
        v-if="doctor.medicalProfile?.name"
        class="tag-link"
        @click="$router.push(`/doctors?medical-profile=${doctor.medicalProfile.id}`)"
      >
        {{ doctor.medicalProfile.name }}
      </div>

      <div v-if="doctor.position?.name" class="tag-link" @click="$router.push(`/doctors?position=${doctor.position.id}`)">
        {{ doctor.position.name }}
      </div>
      <div class="card-item-middle-bottom">
        <div class="regalias-list">
          <template v-for="(regalia, index) in doctor.regalias" :key="regalia.id">
            <span v-if="regalia?.name">
              <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
            </span>
          </template>
        </div>
        <div class="address">
          <span v-if="doctor.division?.address">
            Адрес приема:
            <a @click="$router.push(`/map/${doctor.division.id}`)">
              {{ doctor.division.address }}
            </a>
          </span>
        </div>
        <div v-if="doctor.mosDoctorLink" class="mos-doctor-img">
          <div class="mos-doctor-img-container">
            <img src="@/assets/img/mos-doctor.webp" />
          </div>
          <a :href="doctor.getMosDoctorLink()">
            <div>
              <div>Московский</div>
              <div>врач</div>
            </div>
          </a>
        </div>
        <div class="card-item-bottom-bottom">
          <WorkAndTeaching :doctor="doctor" />
        </div>
      </div>
    </div>

    <div class="card-item-right">
      <button @click="$router.push('/appointments/oms')">Запись на прием</button>
      <a v-if="doctor.onlineDoctorId" :href="doctor.getOnlineDoctorLink()" target="_blank">
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
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfo',
  components: { FavouriteIcon, Rating, WorkAndTeaching },
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
}
</style>
