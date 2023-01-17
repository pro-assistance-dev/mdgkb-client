<template>
  <el-dialog v-if="mounted" v-model="isPageSectionDialogActive" top="0" width="90%" destroy-on-close @close="handleClose">
    <el-input v-model="pageSection.name" placeholder="Название типа"></el-input>
    <WysiwygEditor v-model="pageSection.description" />
    <AdminDocumentsForm :document-type="pageSection" />
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from 'vue';

import AdminDocumentsForm from '@/components/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IPageSection from '@/interfaces/IPageSection';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminPageSectionDialog',
  components: { WysiwygEditor, AdminDocumentsForm },

  setup() {
    const pageSection: ComputedRef<IPageSection> = computed(() => Provider.store.getters['pages/pageSection']);
    const isPageSectionDialogActive: ComputedRef<boolean> = computed(() => Provider.store.getters['pages/isPageSectionDialogActive']);
    const mounted: Ref<boolean> = ref(false);

    const handleClose = () => {
      Provider.store.commit('pages/setPageSectionDialogActive', false);
    };

    onMounted(() => {
      mounted.value = true;
    });

    return {
      isPageSectionDialogActive,
      pageSection,
      handleClose,
      mounted,
    };
  },
});
</script>
