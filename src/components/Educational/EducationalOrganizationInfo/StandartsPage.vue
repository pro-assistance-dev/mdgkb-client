<template>
  <div class="card-item">
    <el-container direction="vertical">
      <ul>
        <li v-for="standart in standarts" :key="standart.name">
          <b>{{ standart.code }}</b> -
          <a target="_blank" :href="standart.file.url" :download="standart.file.download">{{ standart.name }}</a>
        </li>
      </ul>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'StandartsPage',

  setup() {
    const standarts: any = [
      { code: '31.08.16', name: 'Детская хирургия' },
      { code: '31.08.17', name: 'Детская эндокринология' },
      { code: '31.08.19', name: 'Педиатрия' },
      { code: '31.08.58', name: 'Оториноларингология' },
      { code: '31.08.02', name: 'Анестезиология-реаниматология' },
      { code: '31.08.05', name: 'Клиническая лабораторная диагностика' },
      { code: '31.08.07', name: 'Патологическая анатомия' },
      { code: '31.08.14', name: 'Детская онкология' },
      { code: '31.08.29', name: 'Гематология' },
      { code: '31.06.01', name: 'Клиническая медицина' },
      { code: '31.08.59', name: 'Офтальмология' },
      { code: '31.08.13', name: 'Детская кардиология' },
      { code: '31.08.15', name: 'Детская урология-андрология' },
      { code: '31.08.18', name: 'Неонатология' },
    ];

    onBeforeMount(async () => {
      const url = process.env.VUE_APP_STATIC_URL + '/educ/info/educ/progs/stand/';
      standarts.forEach((f: any, i: number) => {
        f.file = { url: url + i + '.pdf', download: f };
      });
    });

    return {
      standarts,
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
