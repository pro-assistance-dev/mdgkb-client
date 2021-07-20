<template>
  <el-row :gutter="40">
    <el-col :xl="6" :lg="6" :md="24" class="calendar">
      <NewsCalendar v-model:news="news" />
    </el-col>
    <el-col :xl="18" :lg="18" :md="24">
      <el-row>
        <el-col :xl="8" :lg="8" :md="12" :sm="12" v-for="item in news" :key="item.id" :style="{ padding: '10px', display: 'flex' }">
          <div style="margin: 0 auto">
            <NewsCard :news="item" />
          </div>
        </el-col>
      </el-row>
      <div class="load-more">
        <el-button @click="load">Загрузить ещё</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NewsList',
  components: { NewsCalendar, NewsCard },
  async setup() {
    const store = useStore();

    const loading = ref(false);

    await store.dispatch('news/getAll');
    const news = computed(() => store.getters['news/news']);

    const load = async () => {
      loading.value = true;
      await store.dispatch('news/getAll', news.value[news.value.length - 1].publishedOn);
    };

    return {
      loading,
      load,
      news,
    };
  },
});
</script>

<style scoped lang="scss">
.calendar {
  margin-bottom: 40px;
}
.load-more {
  margin: 50px 0 50px 0;
  text-align: center;
}
</style>
