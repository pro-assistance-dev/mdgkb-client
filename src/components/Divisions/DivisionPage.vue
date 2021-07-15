<template>
  <el-card class="card-content">
    <template #header>
      <div class="card-header">
        <h1 class="title article-title">{{ division.name }}</h1>
      </div>
    </template>

    <div class="content article-body" v-html="division.info"></div>

    <div class="footer">
      <el-button @click="$router.push('/map')">Вернуться назад</el-button>
    </div>
  </el-card>
  <el-card class="card-content">
    <template #header>
      <div class="card-header">
        <h1 class="title article-title">Контакты</h1>
      </div>
      <div class="content article-body"><i class="el-icon-phone"></i> {{ division.phone }}</div>
    </template>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DivisionPage',
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
  margin-bottom: 100px;

  .card-header {
    text-align: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
