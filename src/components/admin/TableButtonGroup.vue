<template>
  <div class="wrapper">
    <el-button v-if="showDownloadButton" icon="el-icon-download" @click="$emit('download')" />
    <el-button v-if="showEditButton" icon="el-icon-edit" @click="$emit('edit')" />
    <el-popconfirm
      v-if="showRemoveButton"
      confirm-button-text="Да"
      cancel-button-text="Отмена"
      icon="el-icon-info"
      icon-color="red"
      title="Вы уверены, что хотите удалить это?"
      @confirm="$emit('remove')"
      @cancel="() => {}"
    >
      <template #reference>
        <el-button icon="el-icon-delete" />
      </template>
    </el-popconfirm>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TableButtonGroup',
  props: {
    showDownloadButton: {
      type: Boolean,
    },
    showEditButton: {
      type: Boolean,
    },
    showRemoveButton: {
      type: Boolean,
    },
  },
  emits: ['download', 'edit', 'remove'],
});
</script>

<style scoped>
:deep(.el-button) {
  padding: 5px;
  margin: 0 !important;
  min-height: unset;
  border: none;
}
</style>
