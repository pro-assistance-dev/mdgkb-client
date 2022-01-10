<template>
  <div>Приём документов строго с 5 июля, 10.00 до 13 августа, 17.00</div>
  <el-row :gutter="40">
    <el-col :xl="6">
      <el-card> Через форму </el-card>
    </el-col>
    <el-col :xl="6">
      <el-card>
        <div>
          <div><b>Email:</b> pdo@morozgkb.ru</div>
          <div>Тема: Документы в ординатуру</div>

          Документы без темы не принимаются
        </div>
      </el-card>
    </el-col>
    <el-col :xl="6">
      <el-card>
        <div>
          <div><b>Почтой:</b>4й Добрынинский переулок, до 1/9, корпус 22А, кабинет Ординатура</div>
          <br />
          <div>Документы, отправленные почтой должны прийти <b>ДО</b> окончания сроков приёма документов</div>
        </div>
      </el-card>
    </el-col>
    <el-col :xl="6">
      <el-card>Нельзя через Госуслуги </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h5 style="text-align: center">ТОЛЬКО ЧЁТКИЕ ЦВЕТНЫЕ КОПИИ ИЛИ ФОТОГРАФИИ ДОКУМЕНТОВ В ЦВЕТЕ</h5>
      <h5 style="text-align: center">ДОКУМЕНТЫ, НЕ ОТВЕЧАЮЩИЕ ТРЕБОВАНИЯМ, НЕ ПРИНИМАЮТСЯ!</h5>
      <h4 style="text-align: center">Общие документы</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Заявление в ординатуру">
          Заполняется от руки четким подчерком синими чернилами или заполняется машинописным шрифтом, подписи в заявлении ставятся СИНЕЙ
          ручкой). ВНИМАНИЕ! На каждую выбранную специальность, подаются разные заявления! Ординатор имеет право подать на ДВЕ специальности
          одновременно. В заявлении ставится галочка основное или дополнительное заявление.
        </el-descriptions-item>
        <el-descriptions-item label="ДОКУМЕНТ, УДОСТОВЕРЯЮЩИЙ ЛИЧНОСТЬ, ГРАЖДАНСТВО"> Cо страницей регистрации </el-descriptions-item>
        <el-descriptions-item label="ДИПЛОМ С ПРИЛОЖЕНИЕМ К ДИПЛОМУ"> </el-descriptions-item>
        <el-descriptions-item label="СНИЛС"> </el-descriptions-item>
        <el-descriptions-item label="ИНН"> </el-descriptions-item>
        <el-descriptions-item label="ДОКУМЕНТЫ, ПОДТВЕРЖДАЮЩИЕ БАЛЛЫ ИНДИВИДУАЛЬНЫХ ДОСТИЖЕНИЙ"> при наличии</el-descriptions-item>
        <el-descriptions-item label="ДОКУМЕНТЫ О ПЕРВОМ ЭТАПЕ АККРЕДИТАЦИИ"> справка или протокол) при наличии</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="12">
      <h4 style="text-align: center">Для целевой ординатуры</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="ДОГОВОР С ДЕПАРТАМЕНТОМ ЗДРАВООХРАНЕНИЯ ГОРОДА МОСКВЫ "></el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :xl="12">
      <h4 style="text-align: center">Для иностранных граждан</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Заявление">Подается на русском языке</el-descriptions-item>
        <el-descriptions-item label="Копия паспорта иностранного гражданина">
          Должна быть с нотариально заверенным переводом на русский язык
        </el-descriptions-item>
        <el-descriptions-item label="Копия паспорта иностранного гражданина">
          <ul>
            <li>
              Перевод осуществляется на территории Российской Федерации (в том числе в посольствах и консульствах Российской Федерации на
              территории иностранных государств, если иное не предусмотрено международными соглашениями)
            </li>
            <li>Должна быть с нотариально заверенным переводом на русский язык</li>
            <li>
              Возможно предоставления иного документа, установленный федеральным законом или признаваемый в соответствии с международным
              договором Российской Федерации в качестве документа, удостоверяющего личность иностранного гражданина в соответствии со
              статьей 10 Федерального закона от 25 июля 2002 г. N 115-ФЗ «О правовом положении иностранных граждан в Российской Федерации»
            </li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="Диплом иностранного государства">
          <ul>
            <li>Должен пройти процедуру апостилирования (легализации) на территории Российской Федерации</li>
            <li>Если диплом и приложение к нему на иностранном языке должен быть нотариально заверенный перевод документа</li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="Внимание">
          Фамилия, имя и отчество (при наличии) поступающего, указанные в переводах поданных документов, должны совпадать и соответствовать
          фамилии, имени и отчеству (при наличии) поступающего, данным указанным во въездной визе или миграционной карте
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h4 style="text-align: center">Перечень медицинских обследований для поступивших в ординатуру «ГБУЗ «Морозовская ДГКБ ДЗМ»</h4>
      <div>
        ВСЕ НИЖЕПЕРЕЧИСЛЕННЫЕ ДОКУМЕНТЫ ПРЕДОСТАВИТЬ ПРИ ПОСТУПЛЕНИИ В ОРДИНАТУРУ ДО 06.09.2021 (ВКЛЮЧИТЕЛЬНО) 7 КОРПУС, НА 3 ЭТАЖ, КАБИНЕТ
        33 (диспансерный учет/медицинский кабинет)
      </div>
      <div>
        Не предоставившие документы – отстраняются от практики! (практика в ГБУЗ «Морозовская ДГКБ ДЗМ» рассосредоточненная, допуск в
        отделения идет с первых дней обучения). Дни, потраченные на оформление медицинских документов, в период обучения, считаются
        прогулом!
      </div>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Справка форма 086">
          <ul>
            <li>Общий анализ крови</li>
            <li>Клинический анализ мочи</li>
            <li>ЭКГ</li>
            <li>Уровень общего холестерина и глюкозы</li>
            <li>Осмотр окулиста с измерением внутриглазного давления</li>
            <li>Осмотр врача терапевта</li>
            <li>Осмотр врача невролога</li>
            <li>Осмотр врача хирурга</li>
            <li>Врача оториноларинголога</li>
            <li>Осмотр врача акушер гинеколога</li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="Личная медицинская книжка">
          <ul>
            <li>Осмотр врача терапевта</li>
            <li>Осмотр врача дерматовенеролога</li>
            <li>Осмотр врача оториноларинголога</li>
            <li>Осмотр врача стоматолога</li>
            <li>Исследование крови на RW, ВИЧ, гепатит В и С</li>
            <li>Исследование на гельминтов (кал на я/г и мазок энтеробиоз)</li>
            <li>Мазок из зева и носа на носительство</li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="Заключение фтизиатра">
          <ul>
            <li>Данные диаскин теста и низкодозной КТ ОГК</li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row> Особенности заключения договоров дистанционно </el-row>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'OrdinaturaDocumentsForAdmission',
  components: {},

  setup() {
    const pageTitle: Ref<string> = ref('Этапы поступления');

    const test = (activeName: string) => {
      pageTitle.value = activeName;
    };

    return {
      test,
      pageTitle,
    };
  },
});
</script>

<style>
h1 {
  text-align: center;
  font-size: 24px;
}
.ques-answ-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
