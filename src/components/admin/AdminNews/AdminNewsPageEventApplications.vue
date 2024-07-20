<template>
  <el-button @click="eventApplicationsPdf(event.id)">Скачать все заявки</el-button>
  <el-table v-if="event" :data="event.eventApplications">
    <el-table-column v-for="field in event.form.fields" :key="field.id" :label="field.name">
      <template #default="scope">
        {{ scope.row.getFieldValue(field) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-download-button="true" :show-info-button="true" @download="pdf(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import Event from '@/classes/Event';
import EventApplication from '@/classes/EventApplication';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminNewsPageEventApplications',
  components: { TableButtonGroup },
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup() {
    let mounted = ref(false);
    const form = ref();
    const show = ref(false);
    let showedItem: Ref<EventApplication | undefined> = ref(undefined);

    const eventApplicationsPdf = async (id: string) => {
      await EventsStore.EventApplicationsPdf(id);
    };

    return {
      show,
      showedItem,
      eventApplicationsPdf,
      mounted,
      form,
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
