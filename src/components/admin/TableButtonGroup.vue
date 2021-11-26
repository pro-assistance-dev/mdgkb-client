<template>
  <el-space :direction="horizontal ? 'horizontal' : 'vertical'" alignment="center" :size="0">
    <el-button v-if="showAddButton" class="table-button" icon="el-icon-plus" @click="$emit('add')" />
    <el-button v-if="showMoveUpButton" class="table-button" icon="el-icon-arrow-up" @click="$emit('moveUp')" />
    <el-button v-if="showMoveDownButton" class="table-button" icon="el-icon-arrow-down" @click="$emit('moveDown')" />
    <el-button v-if="showDownloadButton" class="table-button" icon="el-icon-download" @click="$emit('download')" />
    <el-button
      v-if="showEditButton"
      class="table-button"
      icon="el-icon-edit"
      data-test="tableButtonGroupEditButton"
      @click="$emit('edit')"
    />
    <el-button v-if="showCheckButton" class="table-button" icon="el-icon-check" @click="$emit('check')" />
    <el-popconfirm
      v-if="showRemoveButton"
      confirm-button-text="Да"
      cancel-button-text="Отмена"
      icon="el-icon-info"
      icon-color="red"
      title="Вы уверен, что хотите удалить это?"
      @confirm="$emit('remove')"
      @cancel="() => {}"
    >
      <template #reference>
        <el-button class="table-button" icon="el-icon-delete" data-test="tableButtonGroupDeleteButton" />
      </template>
    </el-popconfirm>
    <el-button v-if="showInfoButton" class="table-button" icon="el-icon-info" @click="$emit('info')" />
    <el-button v-if="showArchiveButton" class="table-button" icon="el-icon-takeaway-box" @click="$emit('archive')" />
  </el-space>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TableButtonGroup',
  props: {
    showDownloadButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showEditButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showRemoveButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showMoveUpButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showMoveDownButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showAddButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    horizontal: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showInfoButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showArchiveButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showCheckButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['download', 'edit', 'remove', 'moveUp', 'moveDown', 'add', 'info', 'archive', 'check'],
});
</script>

<style lang="scss" scoped>
.table-button {
  padding: 5px;
  margin: 0;
  min-height: unset;
  border: none;
}
</style>
