<template>
  <el-form-item>
    <el-upload
      ref="uploader"
      action="#"
      :auto-upload="false"
      :limit="1"
      :multiple="false"
      accept="application/pdf"
      :before-upload="validateFile"
      :on-change="addFile"
    >
      <el-button size="mini">{{ isEdit ? 'Заменить файл' : 'Приложить файл' }}</el-button>
      <template #tip>
        <div v-if="normativeDocument.fileInfo" class="el-upload__tip">
          {{ isEdit ? 'Загружен файл: ' + normativeDocument.fileInfo.originalName : 'В формате PDF, размером не более 20 МиБ' }}
        </div>
      </template>
    </el-upload>
  </el-form-item>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FileInfo from '@/classes/File/FileInfo';
import NormativeDocument from '@/classes/normativeDocument/NormativeDocument';
import NormativeDocumentRules from '@/classes/normativeDocument/NormativeDocumentRules';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'Uploader',
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const filePath = ref('');
    const formRef = ref();
    const isNewFileAdded = ref(false);
    const modalOpen = ref(false);
    const normativeDocument: Ref<INormativeDocument> = ref(new NormativeDocument());
    const rules = ref(NormativeDocumentRules);
    const selectedTypeId = ref('');
    const types = computed(() => store.getters['normativeDocumentTypes/types']);
    const uploader = ref();

    const validateFile = (file: File): boolean => {
      const isPdf = file.type === 'application/pdf';
      const isLess20mib = file.size / 1024 / 1024 < 100;

      if (!isPdf) {
        ElMessage({ message: 'Документ должен быть в формате PDF.', type: 'warning' });
      }

      if (!isLess20mib) {
        ElMessage({ message: 'Документ превышает 20 МиБ.', type: 'warning' });
      }

      return isPdf && isLess20mib;
    };

    const addFile = (file: IElementPlusFile) => {
      if (!validateFile(file.raw)) {
        uploader.value.clearFiles();
        return;
      }

      isNewFileAdded.value = true;

      normativeDocument.value.fileInfo = new FileInfo();
      normativeDocument.value.fileInfo.originalName = file.name;
      normativeDocument.value.fileInfo.file = file.raw;
    };

    const setType = (id: string): void => {
      normativeDocument.value.type = types.value.find((type: INormativeDocumentType): boolean => type.id === id);
    };

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(formRef)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (!props.isEdit) {
          await store.dispatch('normativeDocuments/create', normativeDocument.value);
        } else {
          await store.dispatch('normativeDocuments/update', normativeDocument.value);
        }
      } catch (error) {
        ElMessage({ message: 'Не удалось сохранить', type: 'error' });
      }

      next ? next() : router.push('/admin/normative-document-types');
    };

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    const openModal = (path: string): void => {
      filePath.value = path;
      modalOpen.value = !modalOpen.value;
      return;
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submitForm);
      await load();
    });

    const load = async (): Promise<void> => {
      store.commit('admin/setPageTitle', { title: 'Нормативный документ', saveButton: true });
      await store.dispatch('normativeDocumentTypes/getAll');

      if (props.isEdit && route.params.id) {
        await store.dispatch('normativeDocuments/get', route.params.id);
        normativeDocument.value = store.getters['normativeDocuments/document'];
        selectedTypeId.value = String(normativeDocument.value.type.id);
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(normativeDocument, formUpdated, { deep: true });
    };
    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    return {
      filePath,
      formRef,
      isNewFileAdded,
      modalOpen,
      normativeDocument,
      rules,
      selectedTypeId,
      types,
      uploader,
      addFile,
      getFileUrl,
      openModal,
      setType,
      submitForm,
      validateFile,
    };
  },
});
</script>

<style lang="scss"></style>
