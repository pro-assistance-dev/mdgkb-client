<template>
  <el-card>
    <el-form :model="normativeDocument" ref="formRef" @submit.prevent="submitForm" :rules="rules">
      <el-form-item prop="name">
        <el-input placeholder="Наименование" v-model="normativeDocument.name" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="selectedTypeId" placeholder="Тип" @change="setType">
          <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.id" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="uploader"
          action="#"
          :auto-upload="false"
          :limit="1"
          :multiple="false"
          :before-upload="validateFile"
          :on-change="addFile"
        >
          <el-button size="mini">{{ isEdit ? 'Заменить файл' : 'Приложить файл' }}</el-button>
          <template #tip>
            <div class="el-upload__tip">В формате PDF, размером не более 20 МиБ</div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="submitForm">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, PropType, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

import FileInfo from '@/classes/File/FileInfo';
import NormativeDocument from '@/classes/normativeDocument/NormativeDocument';
import NormativeDocumentRules from '@/classes/normativeDocument/NormativeDocumentRules';

export default defineComponent({
  name: 'AdminNormativeDocumentPage',
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

    const formRef = ref();
    const normativeDocument: Ref<INormativeDocument> = ref(new NormativeDocument());
    const rules = ref(NormativeDocumentRules);
    const selectedTypeId = ref('');
    const types = computed(() => store.getters['normativeDocumentTypes/types']);
    const uploader = ref();

    const validateFile = (file: File): boolean => {
      const isPdf = file.type === 'application/pdf';
      const isLess20mib = file.size / 1024 / 1024 < 20;

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

      normativeDocument.value.fileInfo = new FileInfo({
        originalName: file.name,
        file: file.raw,
      });
    };

    const setType = (id: string): void => {
      normativeDocument.value.type = types.value.find((type: INormativeDocumentType): boolean => type.id === id);
    };

    const submitForm = async (): Promise<void> => {
      let isValid = false;

      formRef.value.validate((valid: any): void => {
        if (valid) {
          isValid = true;
        }
      });

      if (!isValid) {
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

      router.push('/admin/normative-documents');
    };

    onBeforeMount(async (): Promise<void> => {
      store.commit('admin/setPageTitle', 'Нормативный документ');
      await store.dispatch('normativeDocumentTypes/getAll');

      if (props.isEdit && route.params.id) {
        await store.dispatch('normativeDocuments/get', route.params.id);
        normativeDocument.value = store.getters['normativeDocuments/document'];
        selectedTypeId.value = String(normativeDocument.value.type.id);
      }
    });

    return {
      formRef,
      normativeDocument,
      rules,
      selectedTypeId,
      types,
      uploader,
      addFile,
      setType,
      submitForm,
      validateFile,
    };
  },
});
</script>

<style lang="scss"></style>
