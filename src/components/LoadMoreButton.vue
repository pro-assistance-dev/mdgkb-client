<template>
  <div v-if="!allLoaded" class="load-more">
    <el-row class="mb-4">
      <el-button round @click="$emit('loadMore')">Загрузить еще</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoadMoreButton',
  emits: ['loadMore'],
  setup(props) {
    const store = useStore();

    const allLoaded = computed(() => store.getters[`filter/allLoaded`]);

    return {
      allLoaded,
    };
  },
});
</script>

<style scoped lang="scss">
.load-more {
  margin: 50px 0 50px 0;
  text-align: center;
}

:deep(.el-button) {
  background-color: #2754eb;
  color: #ffffff;
}

:deep(.el-button:hover) {
  background-color: #133dcc;
  color: #ffffff;
}
</style>
