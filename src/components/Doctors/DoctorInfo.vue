<template>
  <div class="card-item">
    <div class="card-item-left">
      <div class="doctor-img">
        <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
        <img v-else src="@/assets/img/doctor-default.png" />
        <div class="favor">
          <HeartOutlined />
        </div>
      </div>
      <DoctorRating :doctor="doctor" />
    </div>

    <div class="card-item-middle">
      <div class="division-name">
        {{ doctor.division.name }}
      </div>
      <div class="doctor-name">
        {{ doctor.human.getFullName() }}
      </div>
      <div class="tag-link">
        {{ doctor.medicalProfile.name }}
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
        <div class="mos-doctor-img">
          <div class="mos-doctor-img-container">
            <img src="@/assets/img/mos-doctor.png" />
          </div>
          <div>
            <div>Московский</div>
            <div>врач</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-item-right">
      <button>Запись на прием</button>
      <button class="consult">Онлайн консультация</button>
      <button class="review">Оставить отзыв</button>
    </div>
  </div>
</template>

<script lang="ts">
import { HeartOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';

import DoctorRating from '@/components/Doctors/DoctorRating.vue';
import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'DoctorInfo',
  components: { HeartOutlined, DoctorRating },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info.scss';
</style>
