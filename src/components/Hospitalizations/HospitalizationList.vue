<template>
  <div>
    <h1>Информация о госпитализации</h1>
    <div class="flex">
      <el-card>
        <h4>Плановая Госпитализация по полису ОМС</h4>
        <el-collapse>
          <el-collapse-item v-for="(insuranceHospitalization, i) in insuranceHospitalizations" :key="i">
            <template #title>
              <div class="collapse-title">{{ insuranceHospitalization.name }}</div>
            </template>
            <el-button
              v-if="insuranceHospitalization.hospitalizationsToDocumentTypes"
              size="mini"
              @click="getPDF(insuranceHospitalization.id)"
            >
              Скачать список документов
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card>
        <h4>Плановая госпитализация на платной основе</h4>
        <el-collapse>
          <el-collapse-item v-for="(paidHospitalization, i) in paidHospitalizations" :key="i">
            <template #title>
              <div class="collapse-title">{{ paidHospitalization.name }}</div>
            </template>
            <el-button v-if="paidHospitalization.hospitalizationsToDocumentTypes" size="mini" @click="getPDF(insuranceHospitalization.id)">
              Скачать список документов
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';

export default defineComponent({
  name: 'HospitalizationList',
  setup() {
    const store = useStore();
    const paidHospitalizations: ComputedRef<IHospitalization> = computed(() => store.getters['hospitalizations/paidHospitalizations']);
    const insuranceHospitalizations: ComputedRef<IHospitalization> = computed(
      () => store.getters['hospitalizations/insuranceHospitalizations']
    );
    const getPDF = (id: string) => {
      store.dispatch('hospitalizations/pdf', id);
    };

    onBeforeMount(() => {
      store.dispatch('hospitalizations/getAll');
    });
    return {
      paidHospitalizations,
      insuranceHospitalizations,
      getPDF,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  text-align: center;
}
h4 {
  margin-top: 0;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.flex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
:deep(.el-card__body) {
  width: 570px;
}
.el-card {
  margin-bottom: 20px;
}
.collapse-title {
  line-height: 1.2;
  text-transform: uppercase;
}
</style>
