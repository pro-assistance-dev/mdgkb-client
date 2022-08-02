<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <AvatarWithFavourite
          :image="teacher.doctor.human.photoMini"
          error-img-name="doctor-default.webp"
          :domain-id="teacher.doctor.id"
          domain-name="doctor"
          :img-link="{ name: `DoctorPage`, params: { id: teacher.doctor.id, slug: teacher.doctor.human.slug } }"
        />
        <Rating :comments="teacher.doctor.doctorComments" />
        <a v-if="teacher.doctor.mosDoctorLink" :href="teacher.doctor.getMosDoctorLink()">
          <div class="mos-doctor-img">
            <img src="@/assets/img/mos-doctor.webp" />
            <span>Московский</span>
            <span>врач</span>
          </div>
        </a>
      </div>
      <div class="flex-column right-side">
        <div class="division-name" @click="$router.push(`/divisions/${teacher.doctor.division.id}`)">
          {{ teacher.doctor.division.name }}
        </div>
        <div
          class="doctor-name"
          @click="$router.push({ name: `DoctorPage`, params: { id: teacher.doctor.id, slug: teacher.doctor.human.slug } })"
        >
          {{ teacher.doctor.human.getFullName() }}
        </div>
        <div class="spec-list">
          <div
            v-if="teacher.doctor.medicalProfile"
            class="tag-link"
            @click="$router.push(`/medical-profiles/${teacher.doctor.medicalProfile.id}`)"
          >
            {{ teacher.doctor.medicalProfile.name }}
          </div>
        </div>
        <div class="regalias-list">
          <template v-for="(regalia, index) in teacher.doctor.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button @click="$router.push('/dpo/courses')">Программы преподавателя</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import AvatarWithFavourite from '@/components/AvatarWithFavourite.vue';
import Rating from '@/components/Rating.vue';
import ITeacher from '@/interfaces/ITeacher';

export default defineComponent({
  name: 'TeacherCard',
  components: { Rating, AvatarWithFavourite },
  props: {
    teacher: { type: Object as PropType<ITeacher>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.webp');
      }
    };

    return {
      errorImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.tag-link {
  margin: 2px;
  font-size: 10px;
  transition: all 0.2s;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}

.course-name {
  color: #a1a7bd;
  margin-bottom: 5px;
  font-size: 11px;
  &:hover {
    cursor: pointer;
    color: darken(#a1a7bd, 20%);
  }
}
</style>
