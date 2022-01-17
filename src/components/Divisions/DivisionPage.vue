<template>
  <div class="division-page-container">
    <div class="left-side">
      <Timetable :timetable="division.timetable" />
    </div>
    <div class="right-side">
      <el-card class="card-content">
        <template #header>
          <div class="card-header">
            <h2>{{ division.name }}</h2>
          </div>
        </template>

        <div class="content article-body" v-html="division.info"></div>

        <div class="footer">
          <el-button @click="$router.push('/map')">Вернуться назад</el-button>
        </div>
      </el-card>
      <el-card v-if="division.doctors.length" class="card-content">
        <template #header>
          <div class="card-header">
            <h2>Врачи</h2>
          </div>
        </template>
        <div v-for="item in division.doctors" :key="item.id" class="doctors-wrapper">
          <DoctorInfoCard :doctor="item" :division="division" />
        </div>
      </el-card>
      <el-card v-if="division.phone || division.email || division.address" class="card-content">
        <template #header>
          <div class="card-header">
            <h2>Контакты</h2>
          </div>
        </template>
        <div class="content article-body">
          <div v-if="division.phone"><b>Телефон:</b> {{ division.phone }}</div>
          <div v-if="division.email"><b>Email:</b> {{ division.email }}</div>
          <div v-if="division.address"><b>Адрес:</b> {{ division.address }}</div>
        </div>
      </el-card>
      <ImageGallery :images="division.divisionImages" />
      <Comments store-name="divisions" :parent-id="division.id" :is-reviews="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Comments from '@/components/Comments.vue';
import DoctorInfoCard from '@/components/DoctorInfoCard.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import Timetable from '@/components/Timetable.vue';
import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'DivisionPage',
  components: { DoctorInfoCard, ImageGallery, Comments, Timetable },
  setup() {
    const store = useStore();
    const route = useRoute();
    const division: ComputedRef<IDivision> = computed<IDivision>(() => store.getters['divisions/division']);

    onBeforeMount(async () => {
      window.scrollTo(0, 0);
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
$left-side-max-width: 370px;
$right-side-max-width: 1000px;

.division-page-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  .left-side {
    margin-right: 20px;
    max-width: $left-side-max-width;
  }
  .right-side {
    max-width: $right-side-max-width;
  }
}
.card-content {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }
  h2 {
    margin: 0;
  }

  .article-body {
    text-align: justify;
  }

  .doctors-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
