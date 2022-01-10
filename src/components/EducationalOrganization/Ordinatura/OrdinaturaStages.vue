<template>
  <el-row :gutter="40"> </el-row>
  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <h4 style="text-align: center">Подача документов и испытания</h4>
      <el-table :data="freeStages" border direction="horizontal">
        <el-table-column prop="stage" />
        <el-table-column label="Начало" prop="start" />
        <el-table-column label="Окончание" prop="end" />
      </el-table>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="12">
      <h4 style="text-align: center">Целевая ординатура</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Крайний срок подачи заявления о согласии на зачисление">19 июля, 16:00</el-descriptions-item>
        <el-descriptions-item label="Сроки зачисления (издание приказа)">20 августа</el-descriptions-item>
        <el-descriptions-item label="Основние для зачисления">
          <ul>
            <li>Заявление</li>
            <li>Договор с Департаментом здравоохранения г.Москвы</li>
            <li>Балл тестирования (вступительное испытание): от 70</li>
            <li>Полный пакет документов</li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
      <div>
        <h4 style="text-align: center">Информация для иностранных граждан</h4>
        <ul>
          <li>Обучение проводится только на русском языке</li>
          <li>
            Места в ординатуре иностранным гражданам и лицам без гражданства, с видом на жительство в РФ, выделяются из квоты для
            обучающихся по договорам об оказании платных услуг
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :xl="12">
      <h4 style="text-align: center">Места по договорам об оказании платных образовательных услуг</h4>
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Проведение конкурса">18 августа</el-descriptions-item>

        <el-descriptions-item label="Крайний срок подачи заявления о согласии на зачисление">
          <ul>
            <li><b>1 этап - </b>До 20 августа, 16.00</li>
            <li><b>2 этап - </b>До 25 августа, 16.00</li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="Сроки заключения договоров"> 19 августа - 27 августа </el-descriptions-item>
        <el-descriptions-item label="Сроки зачисления (издание приказа)">30 августа</el-descriptions-item>
        <el-descriptions-item label="Основние для зачисления">
          <ul>
            <li>Заявление</li>
            <li>Балл тестирования (вступительное испытание): от 70</li>
            <li>Рекомендация к зачислению приёмной комиссией МДГКБ на основе конкурса индивидуальных баллов</li>
            <li>Договор об оказании платных образовательных услуг</li>
            <li>Оплата обучения</li>
            <li>Полный пакет документов</li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
      <h4 style="text-align: center">Стоимость обучения о договорам об оказании платных образовательных услуг</h4>
      <el-table :data="paid" border direction="horizontal">
        <el-table-column prop="code" label="Код специальности" />
        <el-table-column label="Наименование программы ординатуры" prop="name" />
        <el-table-column label="Стоимость за год" prop="cost" />
      </el-table>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'OrdinaturaStages',

  setup() {
    const mounted = ref(false);
    const store = useStore();
    const freeStages = [
      {
        stage: 'Приём документов',
        start: '5 июля, 10:00',
        end: '13 августа, 18:00',
      },
      {
        stage: 'Вступительные испытания',
        start: '19 июля',
        end: '16 августа',
      },
    ];

    const paid = [
      {
        code: '31.08.02',
        name: 'Анестезиология и реаниматология',
        cost: '230 000',
      },
      {
        code: '31.08.05',
        name: 'Клиническая лабораторная диагностика',
        cost: '210 000',
      },
      {
        code: '31.08.07',
        name: 'Патологическая анатомия',
        cost: '200 000',
      },
      {
        code: '31.08.13',
        name: 'Детская кардиология',
        cost: '285 000',
      },
      {
        code: '31.08.14',
        name: 'Детская онкология',
        cost: '230 000',
      },
      {
        code: '31.08.15',
        name: 'Детская урология-андрология',
        cost: '285 000',
      },
      {
        code: '31.08.16',
        name: 'Детская хирургия',
        cost: '250 000',
      },
      {
        code: '31.08.17',
        name: 'Детская эндокринология',
        cost: '250 000',
      },
      {
        code: '31.08.18',
        name: 'Неонатология',
        cost: '285 000',
      },
      {
        code: '31.08.19',
        name: 'Педиатрия',
        cost: '270 000',
      },
      {
        code: '31.08.29',
        name: 'Гематология',
        cost: '230 000',
      },
      {
        code: '31.08.58',
        name: 'Оториноларингология',
        cost: '270 000',
      },
      {
        code: '31.08.59',
        name: 'Офтальмология',
        cost: '230 000',
      },
    ];

    return {
      mounted,
      freeStages,
      paid,
    };
  },
});
</script>

<style>
.el-descriptions__label {
  font-size: 15px;
}
</style>
