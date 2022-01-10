<template>
  <el-row :gutter="40">
    <el-col :xl="18" :offset="3">
      Порядок организации и осуществления образовательной деятельности по дополнительным профессиональным программам
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdditionalEducationNormativeDocuments',
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
