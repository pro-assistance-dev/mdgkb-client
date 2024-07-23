<template>
  <div class="string" :style="styleObject" :class="customClass" @click="$emit('click')">
    <span v-if="isHtml" v-html="string" />
    <span v-else>{{ string }}</span>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['click']);

const props = defineProps({
  string: { type: String as PropType<string>, required: false, default: '' },
  color: { type: String as PropType<string>, required: false, default: '' },
  fontSize: { type: String as PropType<string>, required: false, default: '' },
  fontWeight: { type: String as PropType<string>, required: false, default: '' },
  background: { type: String as PropType<string>, required: false, default: '' },
  padding: { type: String as PropType<string>, required: false, default: '' },
  width: { type: String as PropType<string>, required: false, default: '' },
  minWidth: { type: String as PropType<string>, required: false, default: '' },
  margin: { type: String as PropType<string>, required: false, default: '' },
  customClass: { type: String as PropType<string>, required: false, default: '' },
  justifyContent: { type: String as PropType<string>, required: false, default: 'center' },
  isHtml: { type: Boolean as PropType<boolean>, required: false, default: false },
});

const styleObject = {
  color: props.color,
  fontSize: props.fontSize,
  fontWeight: props.fontWeight,
  background: props.background,
  padding: props.padding,
  width: props.width,
  maxWidth: props.width,
  minWidth: props.minWidth,
  margin: props.margin,
  justifyContent: props.justifyContent,
};
</script>

<style scoped lang="scss">
@import '@/services/assets/style/index.scss';

.string {
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: inherit;
  font-family: $base-font;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  color: $base-font-color;
  font-size: $base-font-size;
}
</style>
