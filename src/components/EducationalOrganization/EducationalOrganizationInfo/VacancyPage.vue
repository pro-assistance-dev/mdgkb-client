<template>
  <div class="card-item">
    <h1 style="text-align: center">Вакантные места для приёма (перевода)</h1>
    <img src="@/assets/educ/v1.jpg" />
    <img src="@/assets/educ/v2.jpg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VacancyPage',

  setup() {
    const mounted = ref(false);

    return {
      mounted,
      // rules,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
