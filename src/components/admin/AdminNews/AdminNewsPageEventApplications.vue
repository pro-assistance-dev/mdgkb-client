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
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default defineComponent({
  name: 'AdminNewsPageEventApplications',
  components: { TableButtonGroup },
  props: {
    event: {
      type: Object as PropType<IEvent>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    let mounted = ref(false);
    const form = ref();
    const show = ref(false);
    let showedItem: Ref<IEventApplication | undefined> = ref(undefined);

    const eventApplicationsPdf = async (id: string) => {
      await store.dispatch('events/eventApplicationsPdf', id);
    };

    // const dow = async (documentId: IVacancyResponse) => {};

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
