<template>
  <el-card>
    <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent="submitForm">
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="Наименование типа нормативного документа" />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="success" native-type="submit" @click.prevent="submitForm">Сохранить</el-button>
      </el-form-item> -->
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import NormativeDocumentType from '@/classes/normativeDocument/NormativeDocumentType';
import NormativeDocumentTypeRules from '@/classes/normativeDocument/NormativeDocumentTypeRules';
import validate from '@/mixinsAsModules/validate';

export default defineComponent({
  name: 'AdminNormativeDocumentTypePage',
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    const form = ref(new NormativeDocumentType());
    const formRef = ref();
    const rules = ref(NormativeDocumentTypeRules);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const submitForm = async (): Promise<void> => {
      if (!validate(formRef)) return;
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
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submitForm);
      if (route.params.id) {
        await store.dispatch('normativeDocumentTypes/get', route.params.id);
        form.value = store.getters['normativeDocumentTypes/type'];
      }
      store.commit('admin/setPageTitle', { title: 'Тип нормативного документа', saveButton: true });
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
