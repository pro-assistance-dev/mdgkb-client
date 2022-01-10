<template>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <el-descriptions :column="1" border direction="horizontal">
        <el-descriptions-item label="Документ (документы), удостоверяющий личность, гражданство"></el-descriptions-item>
        <el-descriptions-item label="Документ об образовании и приложение к нему">
          При предъявлении копии поступающий указывает в заявлении о приеме обязательство представить указанный документ не позднее дня
          завершения приема документа установленного образца
        </el-descriptions-item>
        <el-descriptions-item label="Документ, подтверждающий инвалидность при необходимости создания специальных условий при проведении">
          Вступительных испытаний (указанный документ принимается организацией, если срок его действия истекает не ранее дня подачи
          заявления о приеме; если в документе не указан срок его действия, то документ действителен в течение года, начиная с даты его
          выдачи);
        </el-descriptions-item>
        <el-descriptions-item label="2 фотографии поступающего"> </el-descriptions-item>
        <el-descriptions-item label="По усмотрению поступающего - документы, подтверждающие индивидуальные достижения">
        </el-descriptions-item>
      </el-descriptions>
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
