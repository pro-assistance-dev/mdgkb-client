<template>
  <div class="card-item">
    <ul>
      <li v-for="file in files" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'OrdinaturaExams',
  setup() {
    const fileInfos = [
      'Информация о вступительном испытании',
      'Информация о правилах проведения вступительных испытаний (тестирование)',
      'Инструкция по вступительным испытаниям',
      'Перечень вступительных испытаний',
      'Расписание вступительных испытаний',
      'Баллы за индивидуальные достижения',
    ];
    const files: any = [];
    onBeforeMount(() => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/ord/exams/';
      fileInfos.forEach((f: string, i: number) => {
        files.push({ url: url + i + '.pdf', download: f });
      });
    });

    return {
      files,
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
