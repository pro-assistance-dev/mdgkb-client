<template>
  <div>
    <el-table ref="table" :data="normativeDocuments" class="table-shadow" header-row-class-name="header-style" row-class-name="no-hover">
      <el-table-column label="НАИМЕНОВАНИЕ" sortable prop="name" align="left" min-width="130" width="800" resizable />
      <el-table-column align="center">
        <template #default="scope">
          <a
            v-if="scope.row.file_object"
            :href="getFileUrl(scope.row.file_object.filename_disk)"
            :download="scope.row.file_object.filename_download"
            target="_blank"
            class="button is-small is-fullwidth is-info has-margin-bottom-3 is-light rounded-all-5"
          >
            <el-button icon="el-icon-download"> Скачать </el-button>
          </a>
          <el-button icon="el-icon-download" @click="openModal(scope.row.file_object.filename_disk)"> Просмотр </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="modalOpen">
      <NormativeDocumentsModal :fileName="fileName" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import NormativeDocumentsModal from '@/components/NormativeDocuments/NormativeDocumentsModal.vue';

export default {
  name: 'NormativeDocuments',
  components: { NormativeDocumentsModal },
  async setup() {
    let fileName = ref('');
    let modalOpen = ref(false);
    const store = useStore();

    await store.dispatch('normativeDocuments/getAll');
    const normativeDocuments = store.getters['normativeDocuments/items'];

    const getFileUrl = (name: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${name}`;
    };

    function openModal(name: string): void {
      fileName.value = name;
      modalOpen.value = !modalOpen.value;
      return;
    }

    return {
      fileName,
      modalOpen,
      openModal,
      getFileUrl,
      normativeDocuments,
    };
  },
};
</script>

<style scoped></style>
