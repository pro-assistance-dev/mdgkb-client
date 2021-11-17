nts
<template>
  <!-- <div v-for="type of normativeDocumentTypes" :key="type.id"> -->
  <el-container direction="vertical">
    <div class="header-center">
      <h2>Документы</h2>
    </div>
    <el-collapse v-model="activeName" accordion @change="collapseChangeHandler">
      <template v-for="(type, item) in educationalOrganisation.educationalOrganizationDocumentTypes" :key="type.id">
        <el-collapse-item :name="item + 1">
          <template #title>
            <h3 class="collapseHeader">{{ type.name }}</h3>
          </template>
          <!-- <h3>{{ type.name }}</h3> -->
          <el-table
            ref="table"
            :data="type.educationalOrganizationDocumentTypeDocuments"
            class="table-shadow"
            header-row-class-name="header-style"
            row-class-name="no-hover"
          >
            <el-table-column width="50" align="center">
              <template #default>
                <div class="document-icon"><FilePdfOutlined /></div>
              </template>
            </el-table-column>
            <el-table-column prop="document.name" align="left" min-width="130" resizable>
              <template #header>
                <el-input v-model="filter" prefix-icon="el-icon-search" placeholder="Найти документ" size="large" />
              </template>
              <template #default="scope"> {{ scope.row.document.name }} </template>
            </el-table-column>
            <el-table-column fixed="right" width="300" align="right">
              <template #default="scope">
                <a
                  v-if="scope.row.document.fileInfo"
                  :href="getFileUrl(scope.row?.document.fileInfo?.fileSystemPath)"
                  :download="scope.row?.document.fileInfo?.originalName"
                  target="_blank"
                  style="margin-right: 10px"
                >
                  <el-button icon="el-icon-download">Скачать</el-button>
                </a>
                <el-button icon="el-icon-view" @click="openModal(getFileUrl(scope.row?.document.fileInfo?.fileSystemPath))"
                  >Просмотр</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-container>
  <!-- </div> -->
  <el-dialog v-model="modalOpen">
    <NormativeDocumentsModal :file-path="filePath" />
  </el-dialog>
  <a ref="fileAnchor" style="display: none" />
</template>

<script lang="ts">
import { FilePdfOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import NormativeDocumentsModal from '@/components/NormativeDocuments/NormativeDocumentsModal.vue';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

export default defineComponent({
  name: 'EducationalOrganizationDocuments',
  components: { NormativeDocumentsModal, FilePdfOutlined },
  setup() {
    const filter = ref('');
    const store = useStore();
    const filePath = ref('');
    const modalOpen = ref(false);

    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );

    const normativeDocuments = computed(() => store.getters['normativeDocuments/document-types']);
    const normativeDocumentsList = computed((): INormativeDocument => {
      if (filter.value) {
        return normativeDocuments.value.filter((o: INormativeDocument) => {
          if (o.name) return o.name.toLowerCase().includes(filter.value.toLowerCase());
        });
      } else {
        return normativeDocuments.value;
      }
    });
    const normativeDocumentTypes = ref();
    const activeName = ref(1);

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    const openModal = (path: string): void => {
      filePath.value = path;
      modalOpen.value = !modalOpen.value;
      return;
    };

    onBeforeMount(async () => {
      await store.dispatch('educationalOrganization/get');
      await store.dispatch('normativeDocuments/getAll');
      await store.dispatch('normativeDocumentTypes/getAll');
      normativeDocumentTypes.value = store.getters['normativeDocumentTypes/types'];
    });

    const collapseChangeHandler = () => {
      filter.value = '';
    };

    return {
      educationalOrganisation,
      filePath,
      modalOpen,
      normativeDocumentTypes,
      normativeDocuments,
      normativeDocumentsList,
      getFileUrl,
      activeName,
      openModal,
      filter,
      collapseChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/collapse.scss';
.document-icon {
  font-size: 20px;
}
</style>
