<template>
  <el-dialog v-if="mounted" v-model="isPageSectionDialogActive" top="0" width="90%" destroy-on-close @close="handleClose">
    <el-input v-model="pageSection.name" placeholder="Название раздела страницы"></el-input>
    <WysiwygEditor v-model="pageSection.description" />
    <AdminDocumentsForm :document-type="pageSection" />
  </el-dialog>
</template>

<script lang="ts">
import AdminDocumentsForm from '@/components/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';

export default defineComponent({
  name: 'AdminPageSectionDialog',
  components: { WysiwygEditor, AdminDocumentsForm },

  setup() {
    const pageSection = PagesStore.PageSection();
    const isPageSectionDialogActive = PagesStore.IsPageSectionDialogActive();
    const mounted: Ref<boolean> = ref(false);

    const handleClose = () => {
      PagesStore.SetPageSectionDialogActive(false);
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
