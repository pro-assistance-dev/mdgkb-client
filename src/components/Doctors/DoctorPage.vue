<template>
  <div v-if="mount" class="doctor-page-container">
    <div class="title-out">Главная / Отделения и центры / Гастроэнтерологическое отделение / Бочкова Наталья Геннадьевна</div>
    <DoctorInfo :doctor="doctor" />
    <DoctorEducation :store-name="'doctors'" />
    <DoctorWorkExperience />
    <DoctorServices :store-name="'doctors'" />
    <DoctorCertificates />
    <DoctorDateAndTime />
    <DoctorReviews store-name="doctors" :parent-id="doctor.id" :is-reviews="true" />

    <!-- <el-card>
      <template #header>
        <div class="card-header">
          <h2>{{ doctor.human.getFullName() }}</h2>
          <el-rate :model-value="countRating(doctor.doctorComments)" disabled show-score text-color="#ff9900" score-template="{value}">
          </el-rate>
        </div>
      </template>
      <div class="flex-row">
        <div class="doctor-img-container">
          <img v-if="doctor.fileInfo.fileSystemPath" :src="doctor.fileInfo.getImageUrl()" alt="alt" @error="errorImg" />
          <img v-else src="@//assets/img/310x310.png" />
        </div>
        <div class="flex-column">
          <span><b>Должность:</b> {{ doctor.position }}</span>
          <span>{{ doctor.tags }}</span>
          <span><b>Прием:</b> {{ doctor.division.address }}</span>
          <span>
            <b>Отделение:</b>
            <span class="link" @click="$router.push(`/divisions/${doctor.division.id}`)"> {{ doctor.division.name }}</span>
          </span>
          <span><b>Образование:</b> {{ doctor.education }}</span>
          <span><b>Специализация:</b> {{ doctor.medicalProfile?.name }}</span>
        </div>
      </div>
      <el-timeline>
        <el-timeline-item v-for="education in doctor.educations" :key="education.institution" :timestamp="education.institution">
          {{ education.getEndYear() }}
        </el-timeline-item>
      </el-timeline>
    </el-card> -->
    <Comments store-name="doctors" :parent-id="doctor.id" :is-reviews="true" />
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Comments from '@/components/Comments.vue';
import DoctorCertificates from '@/components/Doctors/DoctorCertificates.vue';
import DoctorDateAndTime from '@/components/Doctors/DoctorDateAndTime.vue';
import DoctorEducation from '@/components/Doctors/DoctorEducation.vue';
import DoctorInfo from '@/components/Doctors/DoctorInfo.vue';
import DoctorReviews from '@/components/Doctors/DoctorReviews.vue';
import DoctorServices from '@/components/Doctors/DoctorServices.vue';
import DoctorWorkExperience from '@/components/Doctors/DoctorWorkExperience.vue';
import IDoctor from '@/interfaces/IDoctor';
import countRating from '@/mixins/countRating';

export default defineComponent({
  name: 'DoctorPage',
  components: {
    Comments,
    DoctorInfo,
    DoctorEducation,
    DoctorWorkExperience,
    DoctorServices,
    DoctorCertificates,
    DoctorDateAndTime,
    DoctorReviews,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const doctor: Ref<IDoctor> = computed<IDoctor>(() => store.getters['doctors/item']);
    const mount = ref(false);

    onBeforeMount(async () => {
      await store.dispatch('doctors/get', route.params['slug']);
      mount.value = true;
    });

    return {
      countRating,
      doctor,
      mount,
    };
  },
});
</script>

<style scoped lang="scss">
// $left-side-max-width: 370px;
// $right-side-max-width: 1000px;
.hidden {
  display: none;
}

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
</style>
