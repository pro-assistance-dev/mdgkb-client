<template>
  <el-card>
    <el-form :model="form" ref="formRef" @submit.prevent="submitForm" :rules="rules">
      <el-form-item prop="name">
        <el-input placeholder="Наименование типа нормативного документа" v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="submitForm">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import NormativeDocumentTypeRules from '@/classes/normativeDocument/NormativeDocumentTypeRules';
import NormativeDocumentType from '@/classes/normativeDocument/NormativeDocumentType';

export default defineComponent({
  name: 'AdminNormativeDocumentTypePage',
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  async setup(props) {
    const form = ref(new NormativeDocumentType());
    const formRef = ref();
    const rules = ref(NormativeDocumentTypeRules);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

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
          await store.dispatch('normativeDocumentTypes/create', form.value);
        } else {
          await store.dispatch('normativeDocumentTypes/update', form.value);
        }
      } catch (error) {
        ElMessage({ message: 'Не удалось сохранить', type: 'error' });
      }

      router.push('/admin/normative-document-types');
    };

    onBeforeMount(async (): Promise<void> => {
      if (route.params.id) {
        await store.dispatch('normativeDocumentTypes/get', route.params.id);
        form.value = store.getters['normativeDocumentTypes/type'];
      }
    });

    return {
      form,
      rules,
      formRef,
      submitForm,
    };
  },
});
</script>

<style lang="scss"></style>
