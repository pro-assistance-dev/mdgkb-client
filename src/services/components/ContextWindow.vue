<template>
  <div
    v-click-outside="outsideClick"
    class="context-window"
    :style="{
      left: left,
      top: top,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  x: {
    type: Number as PropType<number>,
    default: -1,
  },
  y: {
    type: Number as PropType<number>,
    default: -1,
  },
});
const emits = defineEmits(['close']);
const xCoord = ref(props.x);
const yCoord = ref(props.y);

const left = computed(() => xCoord.value + 'px');
const top = computed(() => yCoord.value + 'px');

const outsideClick = () => {
  console.log('outsi');
  emits('close');
};
</script>
<stype lang="scss">
@import './src/assets/styles/elements/base-style.scss';

.context-window {
  position: fixed;
  border: 1px solid #343e5c;
  border-radius: 5px;
  background: #ffffff;
  z-index: 10;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</stype>
