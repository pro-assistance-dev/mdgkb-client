<template>
  <el-form v-if="mounted" ref="form" :key="documentType" :model="documentType" label-position="top" :rules="rules">
    <el-container direction="vertical">
      <CardHeader :label="'Документ'" :add-button="false" />
      <el-card>
        <el-form ref="form" :status-icon="true" :inline-message="true" :model="documentType" label-width="10vw" label-position="right">
          <el-form-item label="Название документа" prop="name">
            <el-input v-model="documentType.name"></el-input>
          </el-form-item>
          <el-form-item label="С одним сканом" prop="name">
            <el-checkbox v-model="documentType.singleScan"></el-checkbox>
          </el-form-item>
          <el-button style="margin-bottom: 10px" @click="documentType.addField()">Добавить поле</el-button>

          <el-table :data="documentType.documentFields" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
            <el-table-column type="index" width="60" align="center" />

            <el-table-column label="Название поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label-width="0" style="margin-bottom: 0" :prop="'documentFields.' + scope.$index + '.name'">
                  <el-input v-model="scope.row.name"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Тип поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label="Тип данных" prop="valueTypeId">
                  <el-select v-model="scope.row.valueTypeId">
                    <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Порядковый номер поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label-width="0" style="margin-bottom: 0" :prop="'documentFields.' + scope.$index + '.order'">
                  <el-input-number v-model="scope.row.order" size="medium" :min="0" style="width: 120px"></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="40" fixed="right" align="center">
              <template #default="scope">
                <TableButtonGroup :show-remove-button="true" @remove="documentType.removeField(scope.$index)" />
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-card>
    </el-container>
  </el-form>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CardHeader from '@/components/admin/CardHeader.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IValueType from '@/interfaces/IValueType';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'AdminDocumentTypePage',
  components: { TableButtonGroup, CardHeader },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted = ref(false);

    const documentType: Ref<IDocumentType> = computed(() => store.getters['documentTypes/item']);
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['valueTypes/items']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      store.commit('admin/setSubmit', submit);
      await loadDocument();
      await store.dispatch('valueTypes/getAll');
      mounted.value = true;
    });

    const loadDocument = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('documentTypes/get', route.params['id']);
        store.commit('admin/setPageTitle', { title: documentType.value.name, saveButton: true });
      } else {
        store.commit('documentTypes/resetState');
        store.commit('admin/setPageTitle', { title: 'Создать документ', saveButton: true });
      }

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(documentType, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('documentTypes/update', documentType.value);
        } else {
          await store.dispatch('documentTypes/create', documentType.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/documents-types');
    };

    return {
      valueTypes,
      documentType,
      submit,
      form,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}
</style>
