<template>
  <div class="wrapper">
    <el-button icon="el-icon-download" v-if="showDownloadButton" @click="$emit('download')" />
    <el-button icon="el-icon-edit" v-if="showEditButton" @click="$emit('edit')" />
    <el-button icon="el-icon-delete" v-if="showRemoveButton" @click="$emit('remove')" />
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
.el-button {
  padding: 5px;
  margin: 0;
  min-height: unset;
  border: none;
}
</style>
