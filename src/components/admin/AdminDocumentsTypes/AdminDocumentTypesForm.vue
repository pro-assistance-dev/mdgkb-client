<template>
  <el-form ref="form" :model="withDocumentTypes" label-position="top">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Типы документов</span>
          <el-button type="success" @click="addDocType">Добавить тип</el-button>
        </div>
      </template>
      <draggable class="groups" :list="withDocumentTypes" item-key="id" handle=".el-icon-s-grid" @end="sort(withDocumentTypes)">
        <template #item="{ element, index }">
          <el-card>
            <template #header>
              <i class="el-icon-s-grid drug-icon" />
              <div class="card-header">
                <el-form-item style="margin: 0 10px 0 0; width: 100%">
                  <el-input v-model="element.documentType.name" placeholder="Название типа документов"></el-input>
                </el-form-item>
                <el-button
                  type="danger"
                  icon="el-icon-close"
                  @click="removeFromClass(index, withDocumentTypes, docTypesForDelete)"
                ></el-button>
              </div>
              <div>
                <el-form-item prop="description">
                  <WysiwygEditor v-model="element.documentType.description" />
                </el-form-item>
              </div>
            </template>
            <AdminDocumentsForm :document-type="element.documentType" />
          </el-card>
        </template>
      </draggable>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import draggable from 'vuedraggable';

import WithDocumentType from '@/classes/WithDocumentType';
import AdminDocumentsForm from '@/components/admin/AdminDocumentsTypes/AdminDocumentsForm.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IWithDocumentType from '@/interfaces/IWithDocumentType';
import removeFromClass from '@/services/removeFromClass';
import sort from '@/services/sort';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdminDocumentTypesForm',
  components: {
    AdminDocumentsForm,
    WysiwygEditor,
    draggable,
  },
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    docTypesForDelete: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const withDocumentTypes: Ref<IWithDocumentType[]> = computed(() => Provider.store.getters[`${props.storeModule}/items`]);

    const addDocType = (): void => {
      withDocumentTypes.value.push(new WithDocumentType());
    };

    return {
      addDocType,
      withDocumentTypes,
      sort,
      mounted: Provider.mounted,
      form: Provider.form,
      removeFromClass,
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
