<template>
  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <ul>
        <li>Правила приема в аспирантуру</li>
        <li>Положение о научных исследованиях аспирантов</li>
        <li>Порядок прикрепления лиц для сдачи кандидатских экзаменов и их перечень</li>
        <li>Приказ №296/10 «О реорганизации прейскуранта на образовательные услуги»</li>
        <li>Положение о порядке подачи и рассмотрения апелляций в период проведения вступительных испытаний (положение)</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AspiranturaNormativeDocuments',
  components: {},

  setup() {
    return;
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
