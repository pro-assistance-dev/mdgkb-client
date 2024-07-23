<template>
  <div class="admin-list-wrapper">
    <div class="filters">
      <div v-if="showHeader" class="card-item">
        <div class="filters-header-top">
          <div class="filters-row">
            <slot name="header" />
          </div>
        </div>
        <div class="filters-header-bottom filters-row">
          <slot name="header-bottom" />
        </div>
      </div>
      <div class="filters-sort">
        <slot name="sort" />
      </div>
    </div>
    <div class="admin-list-wrapper-main">
      <slot />
    </div>
    <div>
      <slot name="footer" />
    </div>
    <div v-if="store">
      <PPaginationV2 :store="store" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IStorePaginator from '@/services/interfaces/IStorePaginator';
defineProps({
  showHeader: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  store: {
    type: Object as PropType<IStorePaginator>,
    default: undefined,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
:deep(.el-table) {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

:deep(.el-table__row) {
  position: relative;
}

:deep(.el-table__header-wrapper) {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  border-bottom: 1px solid #ebeef5;
}

// :deep(.el-table__body-wrapper) {
//   height: 100% !important;
//   overflow: scroll;
//   overflow-y: overlay;
// }

.admin-list-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100% - 30px);
  padding: 10px;
  box-sizing: border-box;

  &-main {
    flex-shrink: 1;
    overflow: hidden;
  }

  .filters {
    margin-bottom: 10px;

    &-header-top {
      display: flex;
      justify-content: space-between;
    }

    &-header-bottom {
      margin-top: 5px;
    }

    &-sort {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &-row {
      display: flex;
      align-items: center;

      :deep(.el-form-item),
      :deep(.el-form-item__content) {
        margin: 0;
      }
    }
  }

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

:deep(.filters-block) {
  margin-right: 10px;
}

:deep(.sticky-right),
:deep(.sticky-left) {
  position: sticky !important;
  background: white;
}

:deep(.sticky-right) {
  right: 0;
}

:deep(.sticky-left) {
  left: 0;
  z-index: 99;
}

:deep(.el-input-number) {
  z-index: 0;
}
</style>
