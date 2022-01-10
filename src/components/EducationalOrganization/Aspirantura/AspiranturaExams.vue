<template>
  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <h4 style="text-align: center">Приказ о зачислении Аспирантов 2021 г.</h4>
    </el-col>
  </el-row>

  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <h4 style="text-align: center">Расписание</h4>
      <h4 style="text-align: center">Начало учебного года — 1 сентября 2021 года</h4>
      <el-table :data="exams" border direction="horizontal">
        <el-table-column label="" prop="type" />
        <el-table-column label="Дата" prop="date" />
        <el-table-column label="Время" prop="time" />
      </el-table>
    </el-col>
  </el-row>

  <el-row :gutter="40">
    <el-col :xl="24">
      <h4 style="text-align: center">Минимальный вступительный балл – 60 баллов.</h4>
      <h4 style="text-align: center">
        Поступающие могут представить сведения о своих индивидуальных достижениях, которые включаются в сумму конкурсных баллов.
      </h4>
    </el-col>
  </el-row>

  <el-row :gutter="40">
    <el-col :xl="12">
      <h4 style="text-align: center">
        Шкала оценивания и минимальное количество баллов, подтверждающее успешное прохождение вступительного испытания
      </h4>

      <el-table :data="scores" border direction="horizontal">
        <el-table-column label="Баллы" prop="score" />
        <el-table-column label="Оценки" prop="result" />
      </el-table>
    </el-col>
    <el-col :xl="12">
      <h4 style="text-align: center">Индивидуальные достижения (суммарно не более 15 баллов)</h4>
      <el-table :data="personalScores" border direction="horizontal">
        <el-table-column label="Достижение" prop="score" />
        <el-table-column label="" prop="result" />
      </el-table>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <h4 style="text-align: center">Программы для подготовки к вступительным экзаменам</h4>
      <ul>
        <li>Программа вступительных испытаний «Детская хирургия»</li>
        <li>Программа вступительных испытаний «Педиатрия»</li>
        <li>Программа вступительных испытаний «Глазные болезни»</li>
        <li>Программа вступительных испытаний «Эндокринология»</li>
        <li>Требования к оформлению реферата по специальности поступающих в аспирантуру</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AspiranturaExams',
  components: {},

  setup() {
    const scores = [
      {
        score: '90-100',
        result: 'Отлично',
      },
      {
        score: '75-89',
        result: 'Хорошо',
      },
      {
        score: '60-74',
        result: 'Удовлетворительно',
      },
      {
        score: 'Менее 60',
        result: 'Неудовлетворительно',
      },
    ];

    const personalScores = [
      {
        score: 'Участие в конференции, подтвержденное сертификатом или публикацией',
        result: '3 балла за каждое участие',
      },
      {
        score: 'Научная публикация на русском языке',
        result: '5 баллов за каждую публикацию',
      },
      {
        score: 'Научная публикация на иностранном языке',
        result: '10 баллов за каждую публикацию',
      },
      {
        score: 'Документальное подтверждение участия в научном кружке по профилю аспирантуры',
        result: '2 балла',
      },
    ];

    const exams = [
      {
        type: 'Экзамен по специальностям',
        date: '24.08.2021',
        time: '10:00',
      },
      {
        type: 'Резервный день',
        date: '25.08.2021',
        time: '10:00-17.00',
      },
      {
        type: 'Подведение итогов',
        date: '26.08.2021',
      },
    ];

    return { scores, personalScores, exams };
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
