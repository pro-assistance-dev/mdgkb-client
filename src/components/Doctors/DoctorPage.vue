<template>
  <div v-if="mount" class="doctor-page-container">
    <div class="title-out">Главная / Отделения и центры / Гастроэнтерологическое отделение / Бочкова Наталья Геннадьевна</div>
    <DoctorInfo :doctor="doctor" />
    <DoctorEducation :store-name="'doctors'" />
    <DoctorWorkExperience />
    <DoctorServices :store-name="'doctors'" />
    <DoctorCertificates />
    <DoctorDateAndTime />
    <Comments store-name="doctors" :parent-id="doctor.id" :is-reviews="true" />
  </div>
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
import DoctorServices from '@/components/Doctors/DoctorServices.vue';
import DoctorWorkExperience from '@/components/Doctors/DoctorWorkExperience.vue';
import IDoctor from '@/interfaces/IDoctor';
import countRating from '@/mixins/countRating';

export default defineComponent({
  name: 'DoctorPage',
  components: {
    DoctorInfo,
    DoctorEducation,
    DoctorWorkExperience,
    DoctorServices,
    DoctorCertificates,
    DoctorDateAndTime,
    Comments,
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
