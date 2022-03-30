<template>
  <div class="title">
    <h2><b>Мое образование</b></h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EducationPage',
});
</script>

<style lang="scss" scoped>
h2,
h3 {
  color: #343e5c;
  font-weight: normal;
  margin: 0;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  height: 40px;
  width: 880px;
}
</style>
