<template>
  <button 
    :style="{margin:margin,padding:padding,maxWidth:width,minWidth:width,minHeight:height,maxHeight:height,fontSize:fontSize}" 
    :class="buttonClass" @click.prevent="changeState"><slot /><div :style="{marginTop:'4px'}">{{ text }}</div> 
  </button>
</template>

<script setup lang="ts">

defineOptions({ inheritAttrs: false });

const props = defineProps({
  text: { type: String as PropType<string>, default: '', required: false },
  margin: { type: String as PropType<string>, default: '', required: false },
  padding: { type: String as PropType<string>, default: '', required: false },
  width: { type: String as PropType<string>, default: '', required: false },
  height: { type: String as PropType<string>, default: '', required: false },
  skin: { type: String as PropType<string>, default: 'base', required: false },
  type: { type: String as PropType<string>, default: 'neutral', required: false },
  fontSize: { type: String as PropType<string>, default: '', required: false },
});

const emit = defineEmits(['click']);
const changeState = () => {
  emit('click');
};

const buttonClass = computed(() => 'button-' + props.skin + ' ' + props.skin + '_' + props.type);

</script>

<style lang="scss" scoped>
  @import '@/services/assets/style/buttons/p-button.scss';
</style>
