<template>
  <div class="title">Выберите программу</div>
  <div class="container-courses">
    <div v-for="residencyCourse in residencyCourses" :key="residencyCourse.id" class="course" @click="selectCourse(residencyCourse)">
      <span class="code">
        {{ residencyCourse.getMainSpecialization().code }}
      </span>
      <span v-if="selectedCourse && residencyCourse.id === selectedCourse.id" class="name-check">
        {{ residencyCourse.getMainSpecialization().name }}
      </span>
      <span v-else: class="name">
        {{ residencyCourse.getMainSpecialization().name }}
      </span>
      <span v-if="selectedCourse && residencyCourse.id === selectedCourse.id" class="check">✓</span>
    </div>
  </div>
  <div class="container-button">
    <button
      :disabled="!selectedCourse"
      class="response-btn"
      @click="$router.push(`/admission-courses/${selectedCourse.id}?respondForm=open`)"
    >
      Подать заявку
    </button>
  </div>
</template>

<script lang="ts">
import ResidencyCourse from '@/classes/ResidencyCourse';
import buildNameNumbers from '@/services/buildNameNumbers';
export default defineComponent({
  name: 'SelectResidencyCourseForm',
  setup() {
    const residencyCourses: ResidencyCourse[] = ResidencyCoursesStore.Items();
    const selectedCourse: Ref<ResidencyCourse | undefined> = ref(undefined);
    const selectCourse = (course: ResidencyCourse) => {
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
@import '@/assets/styles/base-style.scss';
.code {
  margin-right: 10px;
  font-size: 16px;
}

.name {
  font-size: 16px;
  margin: 5px;
  color: #2754eb;
}

.response-btn {
  text-align: center;
  border-radius: 20px;
  background-color: #31af5e;
  padding: 10px 20px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgb(black, 0.05);
  &:hover {
    cursor: pointer;
    background-color: lighten(#31af5e, 10%);
  }
  &:disabled {
    background-color: #76cc94;
    cursor: auto;
  }
}
.container-courses {
  margin-bottom: 20px;
}

.course {
  margin-bottom: 5px;

  &:hover {
    color: #0a216f;
    background: #ecf5ff;
    cursor: pointer;
  }
  &:active {
    color: #0a216f;
  }
}

.container-button {
  text-align: center;
}

.check {
  margin-left: 20px;
  color: #0a216f;
  font-size: 16px;
  font-weight: bold;
}

.name-check {
  margin-left: 5px;
  color: #03103a;
  font-size: 16px;
  font-weight: bold;
}

.title {
  height: 30px;
  justify-content: center;
  display: flex;
  font-size: 18px;
  align-items: center;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
