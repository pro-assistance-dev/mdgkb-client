<template>
  <div class="card-item">
    <ul>
      <li>
        <a target="_blank" :href="ord.url" :download="ord.download">Приказ о зачислении Аспирантов 2021 г.</a>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <h2>Расписание</h2>
    <h4>Начало учебного года — 1 сентября 2021 года</h4>
    <div v-for="(freeStage, index) in exams" :key="freeStage.type">
      <el-divider v-if="index !== 0"></el-divider>
      <h3>{{ freeStage.type }}</h3>
      <span>C {{ freeStage.date }}</span>
      <span v-if="freeStage.time"> , {{ freeStage.time }}</span>
    </div>
  </div>
  <div class="card-item">
    <h4>Минимальный вступительный балл – 60 баллов.</h4>
    <h4>Поступающие могут представить сведения о своих индивидуальных достижениях, которые включаются в сумму конкурсных баллов.</h4>
  </div>
  <div class="card-item">
    <h4>Шкала оценивания и минимальное количество баллов, подтверждающее успешное прохождение вступительного испытания</h4>
    <el-table :data="scores" border direction="horizontal">
      <el-table-column label="Баллы" prop="score" />
      <el-table-column label="Оценки" prop="result" />
    </el-table>
  </div>
  <div class="card-item">
    <h4>Индивидуальные достижения (суммарно не более 15 баллов)</h4>
    <el-table :data="personalScores" border direction="horizontal">
      <el-table-column label="Достижение" prop="score" />
      <el-table-column label="" prop="result" />
    </el-table>
  </div>
  <div class="card-item">
    <h4>Программы для подготовки к вступительным экзаменам</h4>
    <ul>
      <li v-for="file in progs" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

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

    const fileInfos = [
      'Программа вступительных испытаний «Детская хирургия»',
      'Программа вступительных испытаний «Педиатрия»',
      'Программа вступительных испытаний «Глазные болезни»',
      'Программа вступительных испытаний «Эндокринология»',
      'Требования к оформлению реферата по специальности поступающих в аспирантуру',
    ];
    const progs: any = [];
    let ord: any = {
      url: process.env.VUE_APP_STATIC_URL + '/educ/asp/progs/' + '5' + '.pdf',
      download: 'Приказ о зачислении Аспирантов 2021 г.',
    };
    onBeforeMount(() => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/asp/progs/';
      fileInfos.forEach((f: string, i: number) => {
        progs.push({ url: url + i + '.pdf', download: f });
      });
      ord = { url: url + '5' + '.pdf', download: 'Приказ о зачислении Аспирантов 2021 г.' };
    });

    return { scores, personalScores, exams, progs, ord };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
