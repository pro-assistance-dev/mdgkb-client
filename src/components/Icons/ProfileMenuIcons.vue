<template>
  <component :is="iconComponent[name]" :color="color" :hover-color="hoverColor" :size="size" :margin="margin" />
</template>

<script setup lang="ts">
import IconEducation from '@/components/Icons/IconEducation.vue';
import IconHome from '@/components/Icons/IconHome.vue';
import IconQuestion from '@/components/Icons/IconQuestion.vue';
import IconSettings from '@/components/Icons/IconSettings.vue';

defineProps({
  color: { type: String as PropType<string>, default: '#343E5C' },
  hoverColor: { type: String as PropType<string>, default: '' },
  size: { type: String as PropType<string>, default: '24px' },
  margin: { type: String as PropType<string>, default: '0 10px 0 20px' },
  iconClass: { type: String as PropType<string>, required: false, default: '' },
  name: { type: String as PropType<string>, required: false, default: '' },
});

const iconComponent: Record<string, Component> = {
  Home: IconHome,
  Education: IconEducation,
  Question: IconQuestion,
  Settings: IconSettings,
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
</style>
