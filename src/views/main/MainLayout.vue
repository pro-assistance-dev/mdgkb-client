<template>
  <div>
    <div>- Главный лейаут -</div>
    <ParentComponent msg="Текст из layout" />
  </div>
</template>

<script lang="ts">
import ParentComponent from '../../components/ParentComponent.vue';

export default {
  name: 'MainLayout',
  components: {
    ParentComponent,
  },
};
</script>
