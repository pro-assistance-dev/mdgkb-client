<template>
  <div class="card-item flex-column" style="background-image: ">
    <div class="flex-row">
      <div class="flex-column left-side">
        <div class="doctor-img" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } })">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@/assets/img/doctor-default.png" />
          <div class="favor">
            <HeartOutlined />
          </div>
        </div>
        <DoctorRating :doctor="doctor" />
        <div class="mos-doctor-img">
          <img src="@/assets/img/mos-doctor.png" />
          <span>Московский</span>
          <span>врач</span>
        </div>
      </div>
      <div class="flex-column right-side">
        <div class="division-name">
          {{ doctor.division.name }}
        </div>
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { id: doctor.id, slug: doctor.human.slug } })">
          {{ doctor.human.getFullName() }}
        </div>
        <div class="spec-list">
          <div class="tag-link">
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
            <a>
              {{ doctor.division.address }}
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button>Запись на прием</button>
    </div>
  </div>
  <!-- <div class="flex-column">
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@/assets/img/doctor-default.png" />
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
import { HeartOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import DoctorRating from '@/components/Doctors/DoctorRating.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfoCard',
  components: { HeartOutlined, DoctorRating },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
