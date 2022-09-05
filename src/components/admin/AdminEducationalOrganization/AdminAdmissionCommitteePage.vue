<template>
  <el-form v-if="mounted" ref="form" :model="doc" label-position="top">
    <el-card>
      <template #header>
        <el-form-item style="margin: 0" label="Название">
          <el-input v-model="doc.documentType.name" placeholder="Название типа документов"></el-input>
        </el-form-item>
      </template>
      <el-form-item prop="description">
        <WysiwygEditor v-model="doc.documentType.description" />
      </el-form-item>
      <AdminDocumentsForm :document-type="doc.documentType" />
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus/lib/components';
import { computed, ComputedRef, defineComponent, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

import AdminDocumentsForm from '@/components/admin/AdminDocumentsTypes/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminAdmissionCommitteePage',
  components: {
    WysiwygEditor,
    AdminDocumentsForm,
  },

  setup() {
    const form = ref();
    const route = useRoute();
    const doc: ComputedRef<IAdmissionCommitteeDocumentType> = computed(
      () => Provider.store.getters['admissionCommitteeDocumentTypes/item']
    );
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      if (route.params['id']) {
        await Provider.store.dispatch('admissionCommitteeDocumentTypes/get', route.params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: doc.value.documentType.name,
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        Provider.store.commit('admissionCommitteeDocumentTypes/resetItem');
        Provider.store.commit('admissionCommitteeDocumentTypes/setDefaultOder');
        Provider.store.commit('admin/setHeaderParams', {
          title: 'Добавить в приемную коммиссию',
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      }

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(doc, formUpdated, { deep: true });
    };

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await Provider.store.dispatch('admissionCommitteeDocumentTypes/update', doc.value);
        } else {
          await Provider.store.dispatch('admissionCommitteeDocumentTypes/create', doc.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push({ name: 'AdminAdmissionCommitteeList' });
    };

    Hooks.onBeforeMount(load);

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    return {
      doc,
      form,
      mounted: Provider.mounted,
    };
  },
});
</script>
