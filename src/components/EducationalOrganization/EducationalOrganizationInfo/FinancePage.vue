<template>
  <h2>Финансово-хозяйственная деятельность</h2>
  <div class="card-item">
    <div>
      Информация об объеме финансовой деятельности, финансовое обеспечение которой осуществляется за счет бюджетных ассигнований
      федерального бюджета, бюджетов субъектов Российской Федерации, местных бюджетов, по договорам об образовании за счет средств
      физических и (или) юридических средств
    </div>
    <ul>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/07/%D0%9F%D0%BB%D0%B0%D0%BD-%D0%BF%D0%BE-%D0%A4%D0%A5%D0%94-2021.pdf"
        >
          План финансово-хозяйственной деятельности на 2021 год
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2017/07/%D0%A1%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE-%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%E2%80%93%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-%D0%B8-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86.-%D0%B1%D0%B0%D0%B7%D0%B5-%D1%84%D0%B8%D0%BD%D0%B0%D0%BD%D1%81%D0%BE%D0%B2%D0%BE-%D1%8D%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%87.-%D0%B4%D0%B5%D1%8F%D1%82.-%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8-%D0%B2-%D1%81%D1%84%D0%B5%D1%80%D0%B5-%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2.-%D0%B7%D0%B0-2016-%D0%B3%D0%BE%D0%B4.pdf"
        >
          Сведения о материально–технической и информационной базе, финансово-экономической деятельности организации в сфере образования
        </a>
      </li>
      <li>
        <a target="_blank" href="http://мороздгкб.рф/wp-content/uploads/2020/05/%D0%A4%D0%A5%D0%94_%D0%BE%D1%82%D1%87%D0%B5%D1%82_2019.pdf">
          Отчёт из финансово-хозяйственного отчета по научно-образовательной деятельности за 2019 год
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InternationalPage',

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
