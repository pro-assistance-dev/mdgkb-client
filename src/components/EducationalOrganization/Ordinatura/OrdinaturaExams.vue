<template>
  <div class="card-item">
    <ul>
      <li>Информация о вступительном испытании</li>
      <li>Информация о правилах проведения вступительных испытаний (тестирование)</li>
      <li>Инструкция по вступительным испытаниям</li>
      <li>Перечень вступительных испытаний</li>
      <li>Расписание вступительных испытаний</li>
      <li>Баллы за индивидуальные достижения</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'OrdinaturaExams',

  setup() {
    const mounted = ref(false);

    return {
      mounted,
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
