<template>
  <div v-if="mount" class="doctor-page-container">
    <div class="title-out">Главная / Отделения и центры / Гастроэнтерологическое отделение / Бочкова Наталья Геннадьевна</div>
    <DivisionInfo :division="division" />
    <DivisionServices :store-module="'doctors'" />
    <DivisionOrderOfDay />
    <DivisionSpecialists />
    <NewsSlider :news="division.newsDivisions" />
    <DivisionCertificates />
    <DivisionDateAndTime />
    <Comments store-module="divisions" :parent-id="division.id" :is-reviews="true" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Comments from '@/components/Comments/Comments.vue';
import DivisionCertificates from '@/components/Divisions/DivisionCertificates.vue';
import DivisionDateAndTime from '@/components/Divisions/DivisionDateAndTime.vue';
import DivisionInfo from '@/components/Divisions/DivisionInfo.vue';
import DivisionOrderOfDay from '@/components/Divisions/DivisionOrderOfDay.vue';
import DivisionServices from '@/components/Divisions/DivisionServices.vue';
import DivisionSpecialists from '@/components/Divisions/DivisionSpecialists.vue';
import NewsSlider from '@/components/NewsSlider.vue';
// import IDoctor from '@/interfaces/IDoctor';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'DivisionPage',
  components: {
    DivisionInfo,
    DivisionServices,
    DivisionOrderOfDay,
    DivisionSpecialists,
    NewsSlider,
    DivisionCertificates,
    DivisionDateAndTime,
    Comments,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const division: ComputedRef<IDivision> = computed<IDivision>(() => store.getters['divisions/division']);

    onBeforeMount(async () => {
      await store.dispatch('divisions/get', route.params['slug']);
      store.commit('divisions/setOnlyShowed', true);
    });

    return {
      division,
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
:deep(.leave-a-review) {
  padding: 40px 190px 35px 175px;
}
</style>
