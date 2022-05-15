<template>
  <div class="move-buttons">
    <el-button v-if="index !== 0" icon="el-icon-caret-top" @click="move(true)" />
    <el-button v-if="index !== items.length - 1" icon="el-icon-caret-bottom" @click="move(false)" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import IOrdered from '@/interfaces/IOrdered';
import { moveDown, moveUp } from '@/mixins/moves';
export default defineComponent({
  name: 'TableMover',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    storeMode: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    orderedItems: {
      type: Array as PropType<IOrdered[]>,
      required: false,
      default: () => [],
    },
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    storeGetter: {
      type: String as PropType<string>,
      default: 'items',
    },
  },
  setup(props) {
    const store = useStore();
    const items: Ref<IOrdered[]> = computed(() =>
      props.storeMode ? store.getters[`${props.storeModule}/${props.storeGetter}`] : props.orderedItems
    );

    const move = (up: boolean) => {
      up ? moveUp(items.value, props.index) : moveDown(items.value, props.index);
    };

    return {
      items,
      move,
    };
  },
});
</script>

<style lang="scss" scoped>
.move-buttons {
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}
</style>
