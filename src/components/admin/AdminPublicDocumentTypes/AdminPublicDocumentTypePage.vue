<template>
  <div v-if="mounted" class="page-container">
    <el-form ref="form" :rules="rules" :model="publicDocumentType" label-position="top">
      <el-card header="Раздел">
        <el-form-item label="Название раздела" prop="name">
          <el-input v-model="publicDocumentType.name" placeholder="Название раздела"></el-input>
        </el-form-item>
        <el-form-item label="Якорь (не изменять)" prop="routeAnchor">
          <el-input v-model="publicDocumentType.routeAnchor" placeholder="Якорь"></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <WysiwygEditor v-model="publicDocumentType.description" />
        </el-form-item>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>Типы документов</span>
            <el-button type="success" @click="addDocType">Добавить тип</el-button>
          </div>
        </template>
        <el-collapse>
          <draggable
            class="groups"
            :list="publicDocumentType.documentTypes"
            item-key="id"
            handle=".el-icon-s-grid"
            @end="sort(publicDocumentType.documentTypes)"
          >
            <template #item="{ element, index }">
              <el-collapse-item :title="element.name" :name="element.name">
                <template #title>
                  <i class="el-icon-s-grid drug-icon" />
                  {{ element.name }}
                </template>
                <el-card>
                  <template #header>
                    <div class="card-header">
                      <el-form-item
                        style="margin: 0 10px 0 0; width: 100%"
                        :prop="'documentTypes.' + index + '.name'"
                        :rules="rules.docTypeName"
                      >
                        <el-input v-model="element.name" placeholder="Название типа документов"></el-input>
                      </el-form-item>
                      <el-button type="danger" icon="el-icon-close" @click="removeDocType(index)"></el-button>
                    </div>
                    <div>
                      <el-form-item prop="description">
                        <WysiwygEditor v-model="element.description" />
                      </el-form-item>
                    </div>
                  </template>
                  <AdminDocumentsForm :document-type="element" />
                </el-card>
              </el-collapse-item>
            </template>
          </draggable>
        </el-collapse>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import AdminDocumentsForm from '@/components/admin/AdminDocumentsTypes/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IDocumentType from '@/interfaces/IDocumentType';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminPublicDocumentTypePage',
  components: { AdminDocumentsForm, WysiwygEditor, draggable },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted: Ref<boolean> = ref(false);
    const publicDocumentType: ComputedRef<IPublicDocumentType> = computed(() => store.getters['publicDocumentTypes/item']);
    const rules = {
      name: [{ required: true, message: 'Необходимо указать название раздела', trigger: 'blur' }],
      docName: [{ required: true, message: 'Необходимо указать название документа', trigger: 'blur' }],
      docTypeName: [{ required: true, message: 'Необходимо указать название типа документа', trigger: 'blur' }],
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const addDocType = () => {
      store.commit('publicDocumentTypes/addDocType');
    };

    const removeDocType = (index: number) => {
      store.commit('publicDocumentTypes/removeDocType', index);
    };

    const addDocument = (docType: IDocumentType) => {
      docType.addDocument();
    };

    const removeDocument = (docType: IDocumentType, index: number) => {
      docType.removeDocument(index);
    };

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('publicDocumentTypes/update', publicDocumentType.value);
        } else {
          await store.dispatch('publicDocumentTypes/create', publicDocumentType.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/public-document-types');
    };

    onBeforeMount(async () => {
      store.commit('publicDocumentTypes/resetState');
      store.commit('admin/showLoading');
      if (route.params['id']) {
        await store.dispatch('publicDocumentTypes/get', route.params['id']);
        store.commit('admin/setHeaderParams', { title: 'Обновить раздел', showBackButton: true, buttons: [{ action: submit }] });
      } else {
        store.commit('admin/setHeaderParams', { title: 'Добавить раздел', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(publicDocumentType, formUpdated, { deep: true });
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    onBeforeUnmount(() => {
      store.commit('publicDocumentTypes/resetState');
    });

    return {
      sort,
      mounted,
      form,
      rules,
      publicDocumentType,
      addDocument,
      addDocType,
      removeDocType,
      removeDocument,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
:deep(.avatar-uploader-cover) {
  text-align: start;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
