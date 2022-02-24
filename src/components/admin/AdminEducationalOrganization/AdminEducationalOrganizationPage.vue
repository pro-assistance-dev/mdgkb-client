<template>
  <el-form v-if="mounted" ref="form" :model="educationalOrganisation" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14">
        <el-container direction="vertical">
          <el-card>
            <template #header>
              <CardHeader :label="'Основная информация'" @add="addProperty" />
            </template>
            <el-row :gutter="40" style="margin-bottom: 10px">
              <el-col :xl="7" :lg="7">Имя</el-col>
              <el-col :xl="7" :lg="7">Значение</el-col>
            </el-row>
            <draggable
              class="groups"
              :list="educationalOrganisation.educationalOrganizationProperties"
              item-key="id"
              @end="sort(educationalOrganisation.educationalOrganizationProperties)"
            >
              <template #item="{ element }">
                <el-row :gutter="40">
                  <el-col :xl="7" :lg="7">
                    <el-form-item>
                      <el-input v-model="element.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="15" :lg="15">
                    <el-form-item>
                      <el-input v-model="element.value"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="1" :lg="1">
                    <el-form-item>
                      <el-button icon="el-icon-delete" type="danger" @click="removeProperty(element.id)"></el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </draggable>
          </el-card>
          <AdminEducationalOrganizationManagers />
          <AdminEducationalOrganizationTeachers />
          <AdminEducationalOrganizationAcademics />
        </el-container>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10">
        <el-card>
          <template #header>
            <CardHeader :label="'Документы'" :button-text="'Добавить тип документа'" @add="educationalOrganisation.addDocumentType()" />
          </template>
          <div
            v-for="(documentType, documentTypeIndex) in educationalOrganisation.educationalOrganizationDocumentTypes"
            :key="documentType.id"
          >
            <div class="flex-row-between">
              <el-input v-model="documentType.name" minlength="100" placeholder="Название типа"> </el-input>
              <div style="display: flex">
                <el-button type="success" style="margin: 20px" @click="documentType.addDocument()">Добавить документ</el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  style="margin: 20px"
                  @click="educationalOrganisation.removeDocumentType(documentTypeIndex)"
                />
              </div>
            </div>

            <div
              v-for="(documentTypeToDocument, i) in documentType.educationalOrganizationDocumentTypeDocuments"
              :key="documentTypeToDocument.id"
              class="flex-row-between"
            >
              <el-space>
                <el-form-item style="width: 500px">
                  <el-input v-model="documentTypeToDocument.document.name" placeholder="Название документа"> </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button icon="el-icon-delete" type="danger" @click="documentType.removeDocument(i)"></el-button>
                </el-form-item>
                <el-form-item>
                  <el-upload
                    ref="uploader"
                    action="#"
                    :auto-upload="false"
                    :limit="1"
                    :multiple="false"
                    accept="application/pdf"
                    :show-file-list="false"
                    @change="(file) => documentTypeToDocument.document.addFile(file)"
                  >
                    <el-popover
                      placement="top-start"
                      :width="200"
                      trigger="hover"
                      :content="documentTypeToDocument.document.fileInfo.originalName"
                    >
                      <template #reference>
                        <el-button>{{
                          documentTypeToDocument.document.fileInfo.originalName ? 'Заменить файл' : 'Приложить файл'
                        }}</el-button>
                      </template>
                    </el-popover>
                  </el-upload>
                </el-form-item>
                <el-form-item v-if="documentTypeToDocument.document.fileInfo && documentTypeToDocument.document.fileInfo.fileSystemPath">
                  <a
                    :href="documentTypeToDocument.document.fileInfo.getFileUrl()"
                    :download="documentTypeToDocument.document.fileInfo.originalName"
                    target="_blank"
                    class="button is-small is-fullwidth is-info has-margin-bottom-3 is-light rounded-all-5"
                  >
                    <el-button icon="el-icon-download">Скачать</el-button>
                  </a>
                </el-form-item>
              </el-space>
            </div>
            <el-divider />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';
import draggable from 'vuedraggable';
import { useStore } from 'vuex';

import AdminEducationalOrganizationAcademics from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationAcademics.vue';
import AdminEducationalOrganizationManagers from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationManagers.vue';
import AdminEducationalOrganizationTeachers from '@/components/admin/AdminEducationalOrganization/AdminEducationalOrganizationTeachers.vue';
import CardHeader from '@/components/admin/CardHeader.vue';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import sort from '@/mixins/sort';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
export default defineComponent({
  name: 'AdminEducationalOrganizationPage',
  components: {
    AdminEducationalOrganizationAcademics,
    CardHeader,
    AdminEducationalOrganizationManagers,
    AdminEducationalOrganizationTeachers,
    draggable,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const storeModule = 'educationalOrganization';

    const educationalOrganisation: Ref<IEducationalOrganization> = computed(
      () => store.getters['educationalOrganization/educationalOrganization']
    );
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      // await store.dispatch('doctors/getAll');
      await store.dispatch('educationalOrganization/get');
      store.commit('admin/setHeaderParams', { title: 'Образовательная организация', showBackButton: true, buttons: [{ action: submit }] });
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(educationalOrganisation, formUpdated, { deep: true });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await store.dispatch('educationalOrganization/update', educationalOrganisation.value);
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const addProperty = (): void => {
      store.commit('educationalOrganization/addProperty');
    };

    const removeProperty = (id: string): void => {
      store.commit('educationalOrganization/removeProperty', id);
    };

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    return {
      sort,
      getFileUrl,
      storeModule,
      filteredDoctors,
      removeProperty,
      addProperty,
      mounted,
      form,
      // rules,
      educationalOrganisation,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
