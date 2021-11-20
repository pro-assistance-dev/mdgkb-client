<template>
  <el-table v-if="event" :data="event.eventApplications">
    <el-table-column prop="responseDate" label="Дата" sortable> </el-table-column>
    <!--    <el-table-column prop="coverLetter" label="ФИО" sortable>-->
    <!--      <template #default="scope">-->
    <!--        {{ scope.row.user.human.getFullName() }}-->
    <!--      </template>-->
    <!--    </el-table-column>-->

    <el-table-column v-for="field in event.form.fields" :key="field.id" :label="field.name">
      <template #default="scope">
        {{ scope.row.getFieldValue(field) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-download-button="true" :show-info-button="true" @info="showInfo(scope.row)" @download="pdf(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="showVacancy" :title="'Отклик на вакансию'" width="80%" center>
    <el-descriptions :column="1" border direction="horizontal">
      <el-descriptions-item label="Email">
        {{ showedVacancyResponse.human.contactInfo.emails[0].address }}
      </el-descriptions-item>
      <el-descriptions-item label="Телефон">
        {{ showedVacancyResponse.human.contactInfo.telephoneNumbers[0].number }}
      </el-descriptions-item>
      <el-descriptions-item label="Сопроводительное письмо">
        {{ showedVacancyResponse.coverLetter }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IEvent from '@/interfaces/news/IEvent';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

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
    let showedVacancyResponse: Ref<IVacancyResponse | undefined> = ref(undefined);

    const showInfo = async (vacancyResponse: IVacancyResponse) => {
      vacancyResponse.viewed = true;
      showedVacancyResponse.value = vacancyResponse;
      await store.dispatch('vacancyResponses/update', vacancyResponse);
    };
    const pdf = async (id: string) => {
      await store.dispatch('vacancyResponses/pdf', id);
    };

    // const downloadScan = async (documentId: IVacancyResponse) => {};

    return {
      show,
      showedVacancyResponse,
      pdf,
      showInfo,
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
