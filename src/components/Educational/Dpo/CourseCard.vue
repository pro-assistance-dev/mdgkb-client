<template>
  <div class="card-item-container">
    <div class="card-item">
      <div>
        <div class="doctor-name" @click="$router.push(`/nmo-courses/${nmoCourse.id}`)">
          {{ nmoCourse.name }}
        </div>
        <!-- <div class="tag-link" @click="$router.push(`/doctors/${nmoCourse.teacher.doctor.employee.human.slug}`)">
            Преподаватель: {{ nmoCourse.teacher.doctor.employee.human.getFullName() }}
          </div> -->
        <div v-if="nmoCourse.teacher.doctor.employee.human.name">
          <div>Преподаватель:</div>
          <router-link :to="`/doctors/${nmoCourse.teacher.doctor.employee.human.slug}`">
            {{ nmoCourse.teacher.doctor.employee.human.getFullName() }}
          </router-link>
        </div>
        <div>
          Часов:
          {{ nmoCourse.hours }}
        </div>
      </div>
      <div class="card-item-footer">
        <button @click="$router.push({ name: `DpoCoursePage`, params: { id: nmoCourse.id } })">Подробнее</button>
        <button class="respond-btn" @click="$router.push(`/nmo-courses/${nmoCourse.id}?respondForm=open`)">Записаться</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import NmoCourse from '@/classes/NmoCourse';

export default defineComponent({
  name: 'CourseCard',
  components: {},
  props: {
    nmoCourse: { type: Object as PropType<NmoCourse>, required: true },
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
.card-item-container {
  width: 300px;
  height: auto;
  padding-bottom: 40px;
}
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px;
  height: 100%;
  &-title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  &-footer {
    display: flex;
    justify-content: space-evenly;
  }
  button {
    cursor: pointer;
    padding: 7px 15px;
    letter-spacing: 1px;
    border-radius: 5px;
    border: none;
    background-color: #2754ec;
    color: white;
    &:hover {
      background-color: lighten(#2754ec, 10%);
    }
  }
  .respond-btn {
    background-color: #31af5e;
    &:hover {
      background-color: lighten(#31af5e, 10%);
    }
  }
}

/* @media screen and (max-width: 607px) {
  .info-tags-block {
    display: block;
    margin: 5px;
  }
  .hidden-mobile {
    display: none;
  }
  .tag {
    margin: 5px;
  }
}

@media screen and (max-width: 420px) {
  .size {
    width: calc(100% - 10px);
    padding: 0 5px;
  }
} */

@media screen and (max-width: 400px) {
  :deep(.response-btn) {
    font-size: 12px;
    border-radius: 20px;
    background-color: #31af5e;
    padding: 0 10px;
    height: 30px;
    letter-spacing: 2px;
    color: white;
    border: 1px solid rgb(black, 0.05);
    &:hover {
      cursor: pointer;
      background-color: lighten(#31af5e, 10%);
    }
  }

  :deep(.card-item) {
    padding: 15px 5px;
  }
  h3 {
    font-size: 18px;
  }

  h2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 350px) {
  .size {
    width: calc(100% - 6px);
    padding: 0 3px;
  }
  :deep(.card-item) {
    padding: 15px 2px;
  }
}
</style>
