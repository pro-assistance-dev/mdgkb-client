<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/normative-document-types/new')">Добавить тип</el-button>
      <el-pagination background layout="prev, pager, next" :total="100" v-if="documents" />
    </div>
    <el-card v-if="documents">
      <el-table :data="documents" v-if="documents">
        <div>TODO: Fill with content</div>
      </el-table>
    </el-card>
    <div class="flex-row-end" v-if="documents">
      <el-pagination background layout="prev, pager, next" :total="100" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminNormativeDocumentsTypesList',
});
</script>

<style lang="scss" scoped></style>
