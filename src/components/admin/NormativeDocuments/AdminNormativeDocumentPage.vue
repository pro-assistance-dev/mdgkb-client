<template>
  <el-card>
    <el-form :model="form" ref="formRef" @submit.prevent="submitForm" :rules="rules">
      <el-form-item prop="name">
        <el-input placeholder="Наименование" v-model="form.name" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="selectedTypeId" placeholder="Тип" @change="setType">
          <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.id" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="submitForm">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import NormativeDocumentRules from '@/classes/normativeDocument/NormativeDocumentRules';
import NormativeDocument from '@/classes/normativeDocument/NormativeDocument';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

export default defineComponent({
  name: 'AdminNormativeDocumentPage',
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    const form = ref(new NormativeDocument());
    const types = computed(() => store.getters['normativeDocumentTypes/types']);
    const selectedTypeId = ref('');
    const formRef = ref();
    const rules = ref(NormativeDocumentRules);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const setType = (id: string): void => {
      form.value.type = types.value.find((type: INormativeDocumentType): boolean => type.id === id);
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
          await store.dispatch('normativeDocuments/create', form.value);
        } else {
          await store.dispatch('normativeDocuments/update', form.value);
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
        form.value = store.getters['normativeDocuments/document'];
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(form.value);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>');

        selectedTypeId.value = String(form.value.type.id);
      }
    });

    return {
      form,
      types,
      selectedTypeId,
      rules,
      formRef,
      setType,
      submitForm,
    };
  },
});
</script>

<style lang="scss"></style>
