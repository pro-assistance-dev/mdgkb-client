<template>
  <el-row :gutter="40">
    <el-col :xl="12" :offset="6">
      <ul>
        <li>Заявление</li>
        <li>Договор о платных образовательных услугах</li>
        <li>Положение о порядке подачи и рассмотрения апелляций в период проведения вступительных испытаний (форма в конце)</li>
      </ul>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AspiranturaForms',
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
