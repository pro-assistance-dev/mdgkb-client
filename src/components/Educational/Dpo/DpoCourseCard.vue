<template>
  <div class="card-item-container">
    <div class="card-item">
      <div>
        <div class="card-item-title" @click="$router.push({ name: `DivisionPage`, params: { id: dpoCourse.id } })">
          <b> {{ dpoCourse.name }}</b>
        </div>
        <!-- <div class="tag-link" @click="$router.push(`/doctors/${dpoCourse.teacher.doctor.human.slug}`)">
            Преподаватель: {{ dpoCourse.teacher.doctor.human.getFullName() }}
          </div> -->
        <div v-if="dpoCourse.teacher.doctor.human.name">
          <div>Преподаватель:</div>
          <router-link :to="`/doctors/${dpoCourse.teacher.doctor.human.slug}`">
            {{ dpoCourse.teacher.doctor.human.getFullName() }}
          </router-link>
        </div>
        <div>
          Часов:
          {{ dpoCourse.hours }}
        </div>
      </div>
      <div class="card-item-footer">
        <button @click="$router.push({ name: `DpoCoursePage`, params: { id: dpoCourse.id } })">Подробнее</button>
        <button class="respond-btn" @click="$router.push(`/dpo/courses/${dpoCourse.id}?respondForm=open`)">Записаться</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDpoCourse from '@/interfaces/IDpoCourse';

export default defineComponent({
  name: 'DpoCourseCard',
  components: {},
  props: {
    dpoCourse: { type: Object as PropType<IDpoCourse>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.png');
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
</style>
