<template>
  <component 
    :is="iconComponent[name]" 
    :color="color"
    :hoverColor="hoverColor"
    :size="size"
    :margin="margin"
    :class="iconClass"
  />
</template>

<script setup lang="ts">

import IconHome from '@/components/Icons/IconHome.vue';
import IconEducation from '@/components/Icons/IconEducation.vue';
import IconQuestion from '@/components/Icons/IconQuestion.vue';
import IconSettings from '@/components/Icons/IconSettings.vue';

const props = defineProps({
  color: { type: String as PropType<string>, default: '#343E5C' },
  hoverColor: { type: String as PropType<string>, default: '' },
  size: { type: String as PropType<string>, default: '24px' },
  margin: { type: String as PropType<string>, default: '0 10px 0 20px' },
  iconClass: { type: String as PropType<string>, required: false, default: '' },
  name: { type: String as PropType<string>, required: false, default: '' },
});

const iconComponent = {
  'Home': IconHome,
  'Education': IconEducation,
  'Question': IconQuestion,
  'Settings': IconSettings,
};
</script>

<style lang="scss" scoped>

</style>
