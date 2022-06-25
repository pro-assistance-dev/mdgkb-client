<template>
  <div class="container-courses">
    <div v-for="residencyCourse in residencyCourses" :key="residencyCourse.id" class="course" @click="selectCourse(residencyCourse)">
      <span class="code">
        {{ residencyCourse.getMainSpecialization().code }}
      </span>
      <span class="name">
        {{ residencyCourse.getMainSpecialization().name }}
      </span>
      <span v-if="selectedCourse && residencyCourse.id === selectedCourse.id">✓</span>
    </div>
  </div>
  <div class="container-button">
    <button
      :disabled="!selectedCourse"
      class="response-btn"
      @click="$router.push(`/residency-courses/${selectedCourse.id}?respondForm=open`)"
    >
      Подать заявку
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import IResidencyCourse from '@/interfaces/IResidencyCourse';
import buildNameNumbers from '@/mixins/buildNameNumbers';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'SelectResidencyCourseForm',
  setup() {
    const residencyCourses: Ref<IResidencyCourse[]> = computed<IResidencyCourse[]>(() => Provider.store.getters['residencyCourses/items']);
    const selectedCourse: Ref<IResidencyCourse | undefined> = ref(undefined);
    const selectCourse = (course: IResidencyCourse) => {
      selectedCourse.value = course;
    };
    return {
      selectCourse,
      selectedCourse,
      residencyCourses,
      buildNameNumbers,
    };
  },
});
</script>

<style lang="scss" scoped>
.code {
  margin-right: 10px;
}
.response-btn {
  text-align: center;
}
.container-courses {
  margin-bottom: 20px;
}

.course {
  margin-bottom: 5px;
  &:hover {
    background: #ecf5ff;
    cursor: pointer;
  }
}

.container-button {
  text-align: center;
}
</style>
