<template>
  <div class="ques-answ-container">
    <h1>Дополнительное образование</h1>
    <el-tabs type="border-card" :active-name="pageTitle" :before-leave="test">
      <el-tab-pane label="Текущая информация для поступающих" name="Этапы поступления"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdditionalEducation',
  components: {},

  setup() {
    return {};
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
