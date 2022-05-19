<template>
  <div class="admin-list-wrapper">
    <div class="card-item filters">
      <slot name="header" />
    </div>
    <div class="admin-list-wrapper-main">
      <slot />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminListWrapper',
});
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: block;
    width: 8px;
    height: 8px;
    background-color: rgba(245, 245, 245, 0.47);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    height: 20px;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(85, 85, 85, 0.25);
  }
}
:deep(.el-table__header-wrapper) {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
}
:deep(.el-table__body-wrapper) {
  height: 100% !important;
  overflow: auto;
}

.admin-list-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  &-main {
    flex-shrink: 1;
    margin: 0 5px;
    // padding: 5px 0 0 5px;
    padding: 0 5px;
    overflow: hidden;
    height: 100%;
  }
  .filters {
    margin: 10px;
    display: flex;
    align-items: center;
    :deep(.el-form-item),
    :deep(.el-form-item__content) {
      margin: 0;
    }
  }
}

:deep(.filters-block) {
  margin-right: 10px;
  // span {
  //   margin: 0 10px;
  // }
}
</style>
