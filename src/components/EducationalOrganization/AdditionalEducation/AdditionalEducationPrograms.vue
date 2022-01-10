<template>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      <h4 style="text-align: center">Базовые программы</h4>
      <el-table :data="basePrograms" border direction="horizontal">
        <el-table-column label="Программа" prop="program" />
        <el-table-column label="Кол-во часов" prop="hours" />
        <el-table-column label="Стоимость" prop="cost" />
      </el-table>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :xl="24">
      <h4 style="text-align: center">Дополнительные профессиональные программы до 36 часов по госзаданию на 2019 год</h4>
      <el-table :data="additionalPrograms" border direction="horizontal">
        <el-table-column label="Программа" width="600" prop="name" />
        <el-table-column label="Дата" prop="teacher" />
        <el-table-column label="Часов" prop="hours" width="70" />
        <el-table-column label="Время" prop="start" width="100" />
        <el-table-column label="Слушателей" width="120" prop="listeners" />
      </el-table>
    </el-col>
  </el-row>
  <ul>
    <li>Инструкция по записи на цикл НМО</li>
    <li>Презентация по циклу НМО Педиатрия</li>
    <li>Информация по циклу Педиатрия</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdditionalEducationPrograms',
  components: {},

  setup() {
    const basePrograms = [
      {
        program: 'Повышение квалификации',
        hours: '36',
        cost: '10 000',
      },
      {
        program: 'Повышение квалификации',
        hours: '72',
        cost: '15 000',
      },
      {
        program: 'Повышение квалификации',
        hours: '144',
        cost: '25 000',
      },
      {
        program: 'Профессиональная подготовка',
        hours: '252',
        cost: '50 000',
      },
    ];

    const additionalPrograms = [
      {
        name: 'Ультразвуковые исследования в андрологии детского и подросткового возраста',
        teacher: 'Тарусин Дмитрий Игоревич',
        start: '16.09.19',
        listeners: '25',
      },
      {
        name: 'Ультразвуковые исследования в андрологии детского и подросткового возраста',
        teacher: 'Тарусин Дмитрий Игоревич',
        start: '18.11.19',
        listeners: '25',
      },
      {
        name: 'Актуальные аспекты ведения пациентов детского возраста с воспалительными заболеваниями кишечника',
        teacher: 'Скворцова Тамара Андреевна',
        start: '22.07.19',
        listeners: '25',
      },
      {
        name: 'Актуальные аспекты ведения пациентов детского возраста с воспалительными заболеваниями кишечника',
        teacher: 'Скворцова Тамара Андреевна',
        start: '14.10.19',
        listeners: '25',
      },
      {
        name: 'Воспалительные заболевания суставов у детей',
        teacher: 'Валиева Сания Ирикова',
        start: '05.11.19',
        listeners: '25',
      },
      {
        name: 'Роль ЭФИ исследований у детей с патологией органа зрения',
        teacher: 'Тумасян Александр Рафаэлович',
        start: '24.09.19',
        listeners: '25',
      },
      {
        name: 'Ультрозвуковая диагностика в детской гинекологии',
        teacher: 'Галкина Янина Анатольевна',
        start: '21.10.19',
        listeners: '25',
      },
      {
        name: 'Современные методы хирургических вмешательств в детской колопроктологии',
        teacher: 'Поддубный Игорь Витальевич',
        start: '09.12.19',
        listeners: '25',
      },
      {
        name: 'Эхокардиография в педиатрии',
        hours: '36',
        teacher: 'Абрамян Михаил Арамович',
        start: '26.08.19',
        listeners: '25',
      },
      {
        name: 'Организации оказания медицинской помощи детям, имеющим ограничения жизнедеятельности, в образовательных организациях',
        hours: '18',
        teacher: 'Витковская Ирина Петровна',
        start: '23.09.19',
        listeners: '25',
      },
      {
        name: 'Остеосинтез эластичными интрамедуллярными штифтами при переломах длинных трубчатых костей у детей',
        hours: '36',
        teacher: 'Петров Михаил Анатольевич',
        start: '22.07.19',
        listeners: '25',
      },
      {
        name: 'Организационно-методическое обеспечение оказания медицинской помощи детям в условиях многопрофильного стационара',
        hours: '36',
        teacher: 'Витковская Ирина Петровна',
        start: '02.12.19',
        listeners: '25',
      },
      {
        name: 'Острый живот у детей. Клиника, диагностика, лечение',
        teacher: 'Поддубный Игорь Витальевич',
        start: '14.10.19',
        listeners: '25',
      },
      {
        name: 'Мультидисциплинарный подход при лечении детей со спастическими синдромами',
        teacher: 'Филижанко Тарас Владимирович',
        start: '94.10.19',
        listeners: '25',
      },
      {
        name: 'Острые нарушения мозгового кровообращения у детей и подростков',
        teacher: 'Щедеркина Инна Олеговна',
        start: '01.12.19',
        listeners: '25',
      },
    ];

    return { basePrograms, additionalPrograms };
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
