<template>
  <el-card class="card-content">
    <template #header>
      <div class="card-header">
        <h2 class="title article-title">{{ division.name }}</h2>
      </div>
    </template>

    <div class="content article-body" v-html="division.info"></div>

    <div class="footer">
      <el-button @click="$router.push('/map')">Вернуться назад</el-button>
    </div>
  </el-card>
  <el-card class="card-content" v-if="division.doctors.length">
    <template #header>
      <div class="card-header">
        <h2 class="title article-title">Врачи</h2>
      </div>
    </template>
    <div v-for="item in division.doctors" :key="item.id" class="doctors-wrapper">
      <DoctorInfoCard :doctor="item" :division="division" />
    </div>
  </el-card>
  <el-card class="card-content" v-if="division.phone || division.email || division.address">
    <template #header>
      <div class="card-header">
        <h2 class="title article-title">Контакты</h2>
      </div>
    </template>
    <div class="content article-body">
      <div v-if="division.phone"><b>Телефон:</b> {{ division.phone }}</div>
      <div v-if="division.email"><b>Email:</b> {{ division.email }}</div>
      <div v-if="division.address"><b>Адрес:</b> {{ division.address }}</div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineComponent } from 'vue';
import DoctorInfoCard from '@/components/DoctorInfoCard.vue';

export default defineComponent({
  name: 'DivisionPage',
  components: { DoctorInfoCard },
  async setup() {
    const store = useStore();
    const route = useRoute();
    await store.dispatch('divisions/get', route.params['id']);
    const division = computed(() => store.getters['divisions/division']);

    return {
      division,
    };
  },
});
</script>

<style scoped lang="scss">
.card-content {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;

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
