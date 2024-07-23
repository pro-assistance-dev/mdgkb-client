<template>
  <div>
    <slot :active-idx="activeIdx" :change-active-id="changeActiveId" />
  </div>
</template>

<script lang="ts">
import { watch } from 'vue';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'CollapseContainer',
  props: {
    initActiveIdx: { type: Number as PropType<number>, default: 0 },
  },
  setup(props) {
    const activeIdx = ref(props.initActiveIdx);

    const changeActiveId = (idx: number) => {
      activeIdx.value = idx;
    };

    watch(
      () => props.initActiveIdx,
      () => {
        changeActiveId(props.initActiveIdx);
      }
    );

    return {
      changeActiveId,
      activeIdx,
    };
  },
});
</script>
