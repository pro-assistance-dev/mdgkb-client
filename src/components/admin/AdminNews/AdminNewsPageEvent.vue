<template>
  <el-row>
    <el-button v-if="!news.event" type="success" @click="createEvent(true)">Сделать новость событием</el-button>
    <el-button v-if="news.event" type="danger" @click="createEvent(false)">Сделать событие новостью</el-button>
  </el-row>
  <el-row v-if="news.event">
    <FormConstructor :form="news.event.form" />
  </el-row>
  <el-row>
    <AdminNewsPageEventApplications :event="news.event" />
  </el-row>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import Event from '@/classes/news/Event';
import AdminNewsPageEventApplications from '@/components/admin/AdminNews/AdminNewsPageEventApplications.vue';
import FormConstructor from '@/components/admin/FormConstructor.vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'AdminNewsPageEvent',
  components: { FormConstructor, AdminNewsPageEventApplications },
  setup() {
    const store = useStore();

    const news: Ref<INews> = computed(() => store.getters['news/newsItem']);

    const createEvent = (newsIsEvent: boolean) => {
      if (!newsIsEvent) {
        news.value.event = undefined;
        return;
      }
      news.value.event = new Event();
    };

    return {
      news,
      createEvent,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
