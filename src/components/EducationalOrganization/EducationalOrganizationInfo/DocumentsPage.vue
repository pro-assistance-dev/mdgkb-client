<template>
  <div class="card-item">
    <ul>
      <h2>Документы организации</h2>
      <li v-for="file in filesDocs" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <ul>
      <h2>Локальные акты разработанные ОПО (отделом постдипломного образования) – заверенные ЭЦП</h2>
      <li v-for="file in filesEcp" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <ul>
      <h2>Локальные акты разработанные ОПО (отделом постдипломного образования) – скан-копии</h2>
      <li v-for="file in filesScans" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <ul>
      <h2>Предписания органов осуществляющих государственный контроль</h2>
      <li v-for="file in filesGos" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
  <div class="card-item">
    <ul>
      <h2>Самообследование</h2>
      <li v-for="file in filesReflect" :key="file.url">
        <a target="_blank" :href="file.url" :download="file.download">{{ file.download }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'DocumentsPage',
  setup() {
    const docs = [
      'Устав',
      'Приказ об утверждении устава',
      'Свидетельство о государственной аккредитации',
      'Правила внутреннего трудового распорядка',
      'Коллективный договор',
    ];

    const ecp = [
      'Правила приема в ординатуру 2021',
      'Правила приема в аспирантуру 2021',
      'Положение «О формах, периодичности и порядке текущего контроля успеваемости и промежуточной аттестации обучающихся»',
      'Положение «О порядке перевода, отчисления и восстановления обучающихся в ГБУЗ «Морозовская ДГКБ ДЗМ»»',
      'Правила внутреннего распорядка обучающихся',
      'Режим занятий обучающихся',
    ];

    const scans = [
      'Правила приема в ординатуру 2021',
      'Правила приема в аспирантуру 2021',
      'Положение «О формах, периодичности и порядке текущего контроля успеваемости и промежуточной аттестации обучающихся»',
      'Положение «О порядке перевода, отчисления и восстановления обучающихся в ГБУЗ «Морозовская ДГКБ ДЗМ»»',
      // 'Правила внутреннего распорядка обучающихся',
      'Режим занятий обучающихся',
    ];

    const gos: any = [
      // 'Предписание ГБУЗ «Морозовская ДГКБ ДЗМ» № 07-55/07-З от 17.02.2017', 'Письмо о снятии предписания'
    ];
    const reflect = ['Положение о самообследовании (скан-копи)', 'Положение о самообследовании (ЭЦП)', 'Отчет о самообследовании'];

    const filesDocs: any = [];
    const filesEcp: any = [];
    const filesScans: any = [];
    const filesGos: any = [];
    const filesReflect: any = [];

    onBeforeMount(() => {
      let url = process.env.VUE_APP_STATIC_URL + '/educ/info/docs/org/';
      docs.forEach((f: string, i: number) => {
        filesDocs.push({ url: url + i + '.pdf', download: f });
      });

      url = process.env.VUE_APP_STATIC_URL + '/educ/info/docs/ecp/';
      ecp.forEach((f: string, i: number) => {
        filesEcp.push({ url: url + i + '.slg', download: f });
      });
      url = process.env.VUE_APP_STATIC_URL + '/educ/info/docs/scans/';
      scans.forEach((f: string, i: number) => {
        filesScans.push({ url: url + i + '.pdf', download: f });
      });

      url = process.env.VUE_APP_STATIC_URL + '/educ/info/docs/gos/';
      gos.forEach((f: string, i: number) => {
        filesGos.push({ url: url + i + '.pdf', download: f });
      });

      url = process.env.VUE_APP_STATIC_URL + '/educ/info/docs/reflect/';
      reflect.forEach((f: string, i: number) => {
        filesReflect.push({ url: url + i + '.pdf', download: f });
      });
    });

    return {
      filesDocs,
      filesEcp,
      filesScans,
      filesGos,
      filesReflect,
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
