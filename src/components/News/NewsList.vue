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
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import NewsCard from '@/components/News/NewsCard.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import { computed } from 'vue';

export default {
  name: 'NewsList',
  components: { NewsCalendar, NewsCard },
  async setup() {
    const store = useStore();
    await store.dispatch('news/getAll');
    const news = computed(() => store.getters['news/news']);
    return {
      news,
    };
  },
};
</script>

<style scoped lang="scss">
.calendar {
  margin-bottom: 40px;
}
</style>
