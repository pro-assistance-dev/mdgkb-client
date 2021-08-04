<template>
  <div>
    <el-table ref="table" :data="normativeDocuments" class="table-shadow" header-row-class-name="header-style" row-class-name="no-hover">
      <el-table-column label="Наименование" sortable prop="name" align="left" min-width="130" width="800" resizable />
      <el-table-column align="center">
        <!-- <template #default="scope">
          <a
            v-if="scope.row.fileInfo"
            :href="getFileUrl(scope.row.file_object.filename_disk)"
            :download="scope.row.file_object.filename_download"
            target="_blank"
            class="button is-small is-fullwidth is-info has-margin-bottom-3 is-light rounded-all-5"
          >
            <el-button icon="el-icon-download">Скачать</el-button>
          </a>
          <el-button icon="el-icon-download" @click="openModal(getFileUrl(scope.row.file_object.filename_disk))">Просмотр</el-button>
        </template> -->
        <template #default="scope">
          <a
            v-if="scope.row.fileInfo"
            :href="getFileUrl(scope.row?.fileInfo?.fileSystemPath)"
            :download="scope.row?.fileInfo?.originalName"
            target="_blank"
            class="button is-small is-fullwidth is-info has-margin-bottom-3 is-light rounded-all-5"
          >
            <el-button icon="el-icon-download">Скачать</el-button>
          </a>
          <el-button icon="el-icon-download" @click="openModal(getFileUrl(scope.row?.fileInfo?.fileSystemPath))">Просмотр</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="modalOpen">
      <NormativeDocumentsModal :filePath="filePath" />
    </el-dialog>
  </div>
  <a ref="fileAnchor" style="display: none" />
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import NormativeDocumentsModal from '@/components/NormativeDocuments/NormativeDocumentsModal.vue';

export default {
  name: 'NormativeDocuments',
  components: { NormativeDocumentsModal },
  setup() {
    const store = useStore();
    const filePath = ref('');
    const modalOpen = ref(false);
    const normativeDocuments = ref();

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}${path}`;
    };

    function openModal(path: string): void {
      filePath.value = path;
      modalOpen.value = !modalOpen.value;
      return;
    }

    onBeforeMount(async () => {
      await store.dispatch('normativeDocuments/getAll');
      normativeDocuments.value = store.getters['normativeDocuments/documents'];
    });

    return {
      filePath,
      modalOpen,
      normativeDocuments,
      getFileUrl,
      openModal,
    };
  },
};
</script>

<style scoped></style>
