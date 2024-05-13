<template>
  <div class="load-more">
    <el-row class="mb-4">
      <el-form>
        <el-button native-type="reset" type="primary" round @click="reset">Сбросить фильтры</el-button>
      </el-form>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FilterResetButton',
  emits: ['load'],
  setup(props, { emit }) {
    const store = useStore();

    const reset = (trigger: string) => {
      store.commit(`filter/resetQueryFilter`);
      emit('load');
    };

    return {
      reset,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
// @import '@/assets/elements/filterForm.scss';
@import '@/assets/styles/elements/blue-button.scss';
.load-more {
  display: flex;
  justify-content: center;
}
</style>
