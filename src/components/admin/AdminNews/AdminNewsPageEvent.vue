<template>
  <el-row>
    <el-button v-if="!news.event" type="success" @click="createEvent(true)">Сделать новость событием</el-button>
    <el-button v-if="news.event" type="danger" @click="createEvent(false)">Сделать событие новостью</el-button>
  </el-row>
  <el-row v-if="news.event">
    <FormConstructor :form="news.event.form" />
  </el-row>
  <el-row>
    <AdminNewsPageEventApplications v-if="news.event" :event="news.event" />
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import Event from '@/classes/Event';
import News from '@/classes/News';
import AdminNewsPageEventApplications from '@/components/admin/AdminNews/AdminNewsPageEventApplications.vue';
import FormConstructor from '@/components/FormConstructor/FormConstructor.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminNewsPageEvent',
  components: { FormConstructor, AdminNewsPageEventApplications },
  setup() {
    const news: Ref<News> = computed(() => Provider.store.getters['news/item']);

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
@import '@/assets/styles/base-style.scss';
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
