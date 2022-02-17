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
// @import '@/assets/elements/filterForm.scss';

.load-more {
  display: flex;
  justify-content: center;
}
:deep(.el-button) {
  background: #2754eb;
  border: 1px solid#2754EB;
  color: #ffffff;
  margin-bottom: 20px;
  min-height: 38px;
  font-size: 14px;
}

:deep(.el-button:hover) {
  background: darken(#2754eb, 10%);
  border: 1px solid#2754EB;
  color: #ffffff;
}

:deep(.el-button:active) {
  background: #2754eb;
  border: 1px solid#2754EB;
  color: #ffffff;
}
</style>
