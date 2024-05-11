<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div class="flex-column left-side">
        <AvatarWithFavourite
          :image="teacher.employee.human.photoMini"
          error-img-name="doctor-default.webp"
          :domain-id="teacher.id"
          domain-name="doctor"
          :img-link="{ name: `DoctorPage`, params: { id: teacher.id, slug: teacher.employee.human.slug } }"
        />
      </div>
      <div class="flex-column right-side">
        <div
          class="doctor-name"
          @click="$router.push({ name: `DoctorPage`, params: { id: teacher.doctor.id, slug: teacher.doctor.employee.human.slug } })"
        >
          {{ teacher.employee.human.getFullName() }}
        </div>
        <div class="regalias-list">
          <template v-for="(regalia, index) in teacher.employee.regalias" :key="regalia.id">
            <span v-if="index !== 0"> • </span><span>{{ regalia.name }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="doctor-card-footer">
      <button @click="$router.push('/nmo-courses')">Программы преподавателя</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Teacher from '@/classes/Teacher';
import AvatarWithFavourite from '@/components/AvatarWithFavourite.vue';

export default defineComponent({
  name: 'TeacherCard',
  components: { AvatarWithFavourite },
  props: {
    teacher: { type: Object as PropType<Teacher>, required: true },
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
@import '@/assets/styles/base-style.scss';

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

:deep(.el-rate__icon) {
  margin: 0;
  font-size: 18px;
}
:deep(.el-rate__text) {
  margin-left: 5px;
}

.mos-doctor-img {
  border-radius: $border-radius;
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
