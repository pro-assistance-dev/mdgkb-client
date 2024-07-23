<template>
  <div v-if="mounted" data-test="doctor-component" class="doctor-page-container">
    <!--    <div class="title-out">Главная / Отделения и центры / Гастроэнтерологическое отделение / Бочкова Наталья Геннадьевна</div>-->
    <DoctorInfo :doctor="doctor" />
    <DoctorEducation :doctor="doctor" />
    <DoctorWorkExperience :doctor="doctor" />
    <PaidServices :items-with-paid-service="doctor.doctorPaidServices" />
    <DoctorAchievements :doctor="doctor" />
    <ScansSlider :gallery-elements="doctor.employee.certificates" />
    <DoctorDateAndTime :doctor="doctor" />
    <NewsSlider :news="doctor.newsDoctors" />
    <CommentsComponent :comments="doctor.comments" domen="doctors" :item-id="doctor.id" :is-reviews="true" />
  </div>
</template>

<script lang="ts" setup>
import Doctor from '@/classes/Doctor';

const doctor: Doctor = DoctorsStore.Item();
const mounted = ref(false);

onBeforeMount(async () => {
  DoctorsStore.Get(Router.Slug());
  mounted.value = true;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;
/* .hidden {
  display: none;
} */

.doctor-page-container {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    // max-width: $left-side-max-width;
  }
  // .right-side {
  //   max-width: $right-side-max-width;
  // }
}
h2 {
  margin: 0;
}
.card-header {
  text-align: center;
}
.doctor-img-container {
  margin: 0 10px 10px 0;
  img {
    width: 150px;
  }
}
.flex-row {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.title-out {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #343e5c;
  margin-left: 4px;
  height: 50px;
  align-items: center;
  font-weight: bold;
}
:deep(.leave-a-review) {
  padding: 40px 190px 35px 175px;
}
</style>
