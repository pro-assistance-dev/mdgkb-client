<template>
  <button
    class="button"
    :style="{
      color: hovering ? '#ffffff' : color,
      background: hovering ? color : '#ffffff',
      marginTop: marginTop,
      marginRight: marginRight,
      width: width,
      borderColor: color,
      height: height,
      borderRadius: borderRadius,
      fontSize: fontSize,
    }"
    @click.prevent="saveDishSample"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String as PropType<string>,
      default: 'Ok',
      required: false,
    },
    color: {
      type: String as PropType<string>,
      default: '#449d7c',
      required: false,
    },
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    marginRight: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },
    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },

    height: {
      type: String as PropType<string>,
      required: false,
      default: '20px',
    },
    borderRadius: {
      type: String as PropType<string>,
      required: false,
      default: '20px',
    },
    fontSize: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
  },
  setup() {
    const hovering = ref(false);

    return {
      hovering,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border: 1px solid #449d7c;
  background: #d6ecf4;
  color: #449d7c;
  padding: 0 8px;
  transition: 0.3s;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
</style>
