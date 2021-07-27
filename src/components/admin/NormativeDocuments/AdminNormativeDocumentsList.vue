<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/normative-documents/new')">Добавить документ</el-button>
      <el-pagination background layout="prev, pager, next" :total="100" />
    </div>
    <el-card>
      <el-table :data="documents" v-if="documents">
        <div>TODO: Fill with content</div>
      </el-table>
    </el-card>
    <div class="flex-row-end">
      <el-pagination background layout="prev, pager, next" :total="100" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminNormativeDocumentsList',
});
</script>

<style lang="scss" scoped></style>
