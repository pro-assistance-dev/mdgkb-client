<template>
  <h2>Платные образовательные услуги</h2>
  <div class="card-item">
    <ul>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/03/%D0%9F%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA-%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F-%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D1%8B%D1%85-%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D1%83%D1%81%D0%BB%D1%83%D0%B3_2020_-%D1%81-%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C%D1%8E.pdf"
        >
          Положение об оказании платных образовательных услуг в ГБУЗ «Морозовская ГДКБ ДЗМ»
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/04/%D0%9F%D1%80_296_10-%D0%9E-%D1%80%D0%B5%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8-%D0%BF%D1%80%D0%B5%D0%B8%CC%86%D1%81%D0%BA%D1%83%D1%80%D0%B0%D0%BD%D1%82%D0%B0-%D0%BD%D0%B0-%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8.pdf"
        >
          Прейскурант цен на образовательные услуги 2021
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/03/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80-%D1%81-%D0%AE%D1%80.%D0%BB%D0%B8%D1%86%D0%BE%D0%BC.pdf"
        >
          Образец договора об оказании платных образовательных услуг юридическому лицу
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/03/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80-%D0%94%D0%9F%D0%9E.pdf"
        >
          Образец договора о платных образовательных услугах на обучение по дополнительным профессиональным образовательным программам
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/03/%D0%B4%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80_-%D0%B0%D1%81%D0%BF%D0%B8%D1%80%D0%B0%D0%BD%D1%82%D1%83%D1%80%D0%B0.pdf"
        >
          Образец договора о платных образовательных услугах на обучение по программам аспирантуры
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="http://мороздгкб.рф/wp-content/uploads/2021/03/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80-%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82%D1%83%D1%80%D0%B0-2021.pdf"
        >
          Образец договора о платных образовательных услугах на обучение по программам ординатуры
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PaidServicesPage',

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
