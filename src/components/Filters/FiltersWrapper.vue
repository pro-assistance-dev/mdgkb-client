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
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FiltersWrapper',
  props: {
    headerRightMaxWidth: {
      type: [Number, String],
      default: '',
    },
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
