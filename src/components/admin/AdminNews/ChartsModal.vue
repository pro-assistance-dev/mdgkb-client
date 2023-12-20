<template>
  <el-dialog v-model="statisticsModalOpen" title="Статистика">
    <el-select v-model="selectedChartjsType" size="small" placeholder="Выберите тип графика" style="margin-right: 10px">
      <el-option v-for="item in chartjsTypesList" :key="item.type" :label="item.label" :value="item.type" />
    </el-select>
    <el-select v-model="selectedChartType" size="small" placeholder="Выберите тип графика" @change="changeChartTypeHandler">
      <el-option v-for="item in chartTypesList" :key="item" :label="item" :value="item" />
    </el-select>
    <div>
      <component :is="selectedChartjsType" v-if="data" :data="data" :options="options" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PieController,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar, Doughnut, Line, Pie, Radar } from 'vue-chartjs';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  BarElement,
  PieController,
  RadialLinearScale
);

import { defineComponent, PropType, Ref, ref } from 'vue';

import ExportOptions from '@/classes/ExportOptions';
import NewsExportOptionLib from '@/classes/NewsExportOptionLib';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'ChartsModal',
  components: {
    Line,
    Bar,
    Doughnut,
    Pie,
    Radar,
  },
  props: {
    ids: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props, { expose }) {
    const data: Ref<ChartData | undefined | void> = ref();
    const statisticsModalOpen: Ref<boolean> = ref(false);
    const openStatisticsModal = async () => {
      data.value = await exportData(ExportOptions.chart(NewsExportOptionLib.dates(props.ids)));
      statisticsModalOpen.value = true;
    };

    const exportData = (exportOptions: ExportOptions): Promise<void | ChartData> => {
      return Provider.store.dispatch('dataExport/data', exportOptions);
    };

    const chartjsTypesList = [
      {
        label: 'Столбчатая диаграмма',
        type: 'Bar',
      },
      {
        label: 'Линейная диаграмма',
        type: 'Line',
      },
      {
        label: 'Круговая диаграмма',
        type: 'Pie',
      },
      {
        label: 'Пончик',
        type: 'Doughnut',
      },
      {
        label: 'Радар',
        type: 'Radar',
      },
    ];
    const selectedChartjsType = ref('Bar');
    const selectedChartType = ref('Даты');
    const chartTypesList = ['Даты', 'Города', 'Часы'];
    const changeChartTypeHandler = (value: string) => {
      switch (value) {
        case 'Даты':
          Promise.resolve(
            exportData(ExportOptions.chart(NewsExportOptionLib.dates(props.ids))).then((value) => {
              data.value = value;
            })
          );
          break;
        case 'Города':
          Promise.resolve(
            exportData(ExportOptions.chart(NewsExportOptionLib.cities(props.ids))).then((value) => {
              data.value = value;
            })
          );
          break;
        case 'Часы':
          Promise.resolve(
            exportData(ExportOptions.chart(NewsExportOptionLib.hours(props.ids))).then((value) => {
              data.value = value;
            })
          );
          break;
        default:
          return;
      }
    };

    expose({ open: openStatisticsModal });
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 5,
        },
      },
    };

    return {
      data,
      statisticsModalOpen,
      options,
      selectedChartjsType,
      chartjsTypesList,
      selectedChartType,
      chartTypesList,
      changeChartTypeHandler,
    };
  },
});
</script>
