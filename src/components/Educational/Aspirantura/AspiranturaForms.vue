<template>
  <el-row :gutter="40">
    <div class="card-item">
      <ul>
        <li v-for="file in files" :key="file.url">
          <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
        </li>
      </ul>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'AspiranturaForms',
  components: {},

  setup() {
    const fileInfos = [
      'Заявление',
      'Договор о платных образовательных услугах',
      'Положение о порядке подачи и рассмотрения апелляций в период проведения вступительных испытаний (форма в конце)',
    ];
    const files: any = [];
    onBeforeMount(() => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/asp/forms/';
      fileInfos.forEach((f: string, i: number) => {
        files.push({ url: url + i + '.pdf', download: f });
      });
    });

    return {
      files,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/ordinatura.scss';
.el-descriptions__label {
  font-size: 15px;
}
</style>
