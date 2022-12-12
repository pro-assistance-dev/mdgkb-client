<template>
  <div class="filters-container">
    <div class="filters-container-header">
      <div class="container">
        <div class="filters-container-header-left">
          <div class="filters-container-header-left-top">
            <slot name="header-left-top" />
          </div>
          <div class="filters-container-header-left-bottom">
            <slot name="header-left-bottom" />
          </div>
        </div>
        <div
          class="filters-container-header-right"
          :style="{
            maxWidth: `${headerRightMaxWidth}${typeof headerRightMaxWidth === 'number' ? 'px' : ''}`,
            width: `${headerRightMaxWidth ? '100%' : 'auto'}`,
          }"
        >
          <slot name="header-right" />
          <!--          TODO: сброс фильтров работает только при согласовании FilterQuery и компонентов фильтров. До этого - не трогать-->
          <!--          <el-button v-if="showClearButton" @click="clearFilterModel">Сбросить все фильтры</el-button>-->
        </div>
      </div>
    </div>
    <div class="filters-container-footer">
      <div class="container">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import Provider from '@/services/Provider';
export default defineComponent({
  name: 'FiltersWrapper',
  props: {
    headerRightMaxWidth: {
      type: [Number, String],
      default: '',
    },
  },
  emit: ['load'],
  setup() {
    const showClearButton: ComputedRef<boolean> = computed(
      () => Provider.filterQuery.value.filterModels.length > 0 && Provider.filterQuery.value.sortModels.length > 0
    );

    const clearFilterModel = () => {
      Provider.resetFilterQuery();
    };

    return { clearFilterModel, showClearButton };
  },
});
</script>

<style lang="scss" scoped>
.filters-container {
  width: 100vw;
  &-header {
    padding: 20px;
    margin: 10px 0;
    background-color: white;
    border-top: 2px solid #e4e6f2;
    border-bottom: 2px solid #e4e6f2;

    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-left {
      width: 100%;
      display: flex;
      flex-direction: column;

      &-top {
        width: 100%;
        display: flex;
        align-items: center;
      }
      &-bottom {
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 10px;
    }
  }
  &-footer {
    padding: 0 20px;
    .container {
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 480px) {
  .filters-container {
    &-header {
      .container {
        flex-direction: column;
      }
    }
  }
}
</style>
