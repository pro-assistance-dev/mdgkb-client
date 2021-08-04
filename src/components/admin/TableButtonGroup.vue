<template>
  <div class="wrapper">
    <el-button icon="el-icon-download" v-if="showDownloadButton" @click="$emit('download')" />
    <el-button icon="el-icon-edit" v-if="showEditButton" @click="$emit('edit')" />
    <el-popconfirm
      v-if="showRemoveButton"
      confirmButtonText="Да"
      cancelButtonText="Отмена"
      icon="el-icon-info"
      iconColor="red"
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
