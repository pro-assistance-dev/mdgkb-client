<template>
  <div class="serv-qual-ass-container card-item">
    <h2>Независимая оценка качества оказания услуг</h2>
    <p>Ваше мнение важно для совершенствования работы нашей организации.</p>
    <p>
      Чтобы оценить качество оказания услуг, можете воспользоваться анкетами, размещенными на сайтах
      <a href="https://minzdrav.gov.ru/" target="_blank">Минздрава РФ</a>,
      <a href="http://anketa.rosminzdrav.ru/staticogvjustank/86/1" target="_blank">Росминздрав г.Москва</a> и
      <a href="https://mosgorzdrav.ru/" target="_blank">Департамента здравоохранения г. Москвы</a> или оставить свой отзыв в разделе
      <router-link to="/comments">«Отзывы»</router-link>.
    </p>
    <p>
      Рейтинг ГБУЗ «Морозовская ДГКБ ДЗМ» можно посмотреть на
      <a href="https://bus.gov.ru/pub/info-card/141724?activeTab=3&organizationGroup=518" target="_blank">bus.gov.ru</a>.
    </p>
    <p>
      В целях оценки качества работы ГБУЗ «Морозовская ДГКБ ДЗМ», просим Вас заполнить анкету, выбрав один из вариантов ответа на каждый
      вопрос. Ваше мнение очень важно для нас и будет учтено в дальнейшей работе.
    </p>
    <div>
      <a
        href="http://мороздгкб.рф/wp-content/uploads/2017/10/%D0%90%D0%9D%D0%9A%D0%95%D0%A2%D0%90-%D0%A1%D0%A2%D0%90%D0%A6%D0%98%D0%9E%D0%9D%D0%90%D0%A0.pdf"
        >Анкета для стационарных пациентов</a
      >
    </div>
    <div>
      <a
        href="http://мороздгкб.рф/wp-content/uploads/2017/10/%D0%90%D0%9D%D0%9A%D0%95%D0%A2%D0%90-%D0%90%D0%9C%D0%91%D0%A3%D0%9B%D0%90%D0%A2%D0%9E%D0%A0%D0%9D.%D0%A3%D0%A1%D0%9B.pdf"
        >Анкета для амбулаторных пациентов</a
      >
    </div>
    <p>
      Также вы можете заполнить анкету для оценки качества оказания услуг медицинскими организациями выслать её нам на почту
      <b>anketa@mdgkb.pro</b>.
    </p>
    <div>
      <a
        href="http://мороздгкб.рф/wp-content/uploads/2017/10/%D0%90%D0%9D%D0%9A%D0%95%D0%A2%D0%90-%D0%A1%D0%A2%D0%90%D0%A6%D0%98%D0%9E%D0%9D%D0%90%D0%A0.docx"
        >Анкета для стационарных пациентов</a
      >
    </div>
    <div>
      <a
        href="http://мороздгкб.рф/wp-content/uploads/2017/10/%D0%90%D0%9D%D0%9A%D0%95%D0%A2%D0%90-%D0%90%D0%9C%D0%91%D0%A3%D0%9B%D0%90%D0%A2%D0%9E%D0%A0%D0%9D.%D0%A3%D0%A1%D0%9B.docx"
        >Анкета для амбулаторных пациентов</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ServiceQualityAssessmentPage',
});
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
.serv-qual-ass-container {
  padding: 0 50px 100px 50px;
}
</style>
