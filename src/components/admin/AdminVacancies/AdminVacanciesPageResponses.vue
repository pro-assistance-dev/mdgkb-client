<template>
  <el-table :data="vacancyResponses">
    <el-table-column width="100" label="Новый">
      <template #default="scope">
        <span>
          <i v-if="!scope.row.viewed" class="el-icon-warning icon" />
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="responseDate" label="Дата" sortable> </el-table-column>
    <el-table-column prop="coverLetter" label="ФИО" sortable>
      <template #default="scope">
        {{ scope.row.human.getFullName() }}
      </template>
    </el-table-column>

    <el-table-column v-for="documentsType in documentsTypes" :key="documentsType.id" :label="documentsType.name">
      <template #default="scope">
        <a :href="scope.row.findDocument(documentsType.id).getScan().getFileUrl()" target="_blank">
          <el-button size="mini" icon="el-icon-download">Скачать</el-button>
        </a>
        <!--        {{ scope.row.findDocument(documentType.id).scanFileSystemPath() }}-->
        <!--        <el-button @click="downloadScan(documentsType.id)">Скачать документ</el-button>-->
      </template>
    </el-table-column>
    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup
          :show-download-button="true"
          :show-info-button="true"
          @info="showVacancyResponse(scope.row)"
          @download="pdfVacancyResponse(scope.row.id)"
        />
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

import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default defineComponent({
  name: 'AdminVacanciesPageResponses',
  components: { TableButtonGroup },
  props: {
    vacancyResponses: {
      type: Object as PropType<IVacancyResponse[]>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    let mounted = ref(false);
    const form = ref();
    const showVacancy = ref(false);
    let showedVacancyResponse: Ref<IVacancyResponse | undefined> = ref(undefined);
    const documentsTypes: Ref<IDocumentType[]> = computed(() => store.getters['documentTypes/items']);

    const showVacancyResponse = async (vacancyResponse: IVacancyResponse) => {
      vacancyResponse.viewed = true;
      showedVacancyResponse.value = vacancyResponse;
      showVacancy.value = true;
      await store.dispatch('vacancyResponses/update', vacancyResponse);
    };
    const pdfVacancyResponse = async (id: string) => {
      await store.dispatch('vacancyResponses/pdf', id);
    };

    // const downloadScan = async (documentId: IVacancyResponse) => {};

    return {
      // downloadScan,
      documentsTypes,
      showedVacancyResponse,
      pdfVacancyResponse,
      showVacancy,
      showVacancyResponse,
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
