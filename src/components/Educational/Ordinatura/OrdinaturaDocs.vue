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
  name: 'OrdinaturaDocs',
  setup() {
    const fileInfos = [
      'Заявление в ординатуру',
      'Пример заполнения заявления в ординатуру',
      'Заявление об учете баллов первого этапа первичной аккредитации, пройденной в 2020 или 2021 году',
      'Пример заполнения заявления об учете баллов первичной аккредитации',
      'Заявление об учете баллов вступительного испытания (тестирования в ординатуру)',
      'Пример заполнения заявления об учете баллов вступительного испытания',
      'Заявление о согласии на зачисление в ординатуру ГБУЗ «Морозовская ДГКБ ДЗМ»',
      'Заявление об отзыве заявления о поступлении в ординатуру ГБУЗ «Морозовская ДГКБ ДЗМ»',
      'Образец договора об оказании платных образовательных услуг (двухсторонний)',
      'Образец договора об оказании платных образовательных услуг (трёхсторонний)',
    ];
    const files: any = [];
    onBeforeMount(() => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/ord/docs/';
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
