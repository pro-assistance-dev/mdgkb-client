<template>
  <div class="hospitalization-table-wrapper">
    <table class="hospitalization-table">
      <thead>
        <tr align="left">
          <th>Полис</th>
          <th>Лечение</th>
          <th>Пребывание</th>
          <th>Направление</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="section">
        <tr v-for="(hospitalization, i) in hospitalizationsTypes" :key="hospitalization" align="left">
          <td class="red">
            {{ i === 0 || hospitalizationsTypes[i - 1].policyType !== hospitalization.policyType ? hospitalization.policyType : '' }}
          </td>
          <td class="grey">
            {{
              i === 0 || hospitalizationsTypes[i - 1].treatmentType !== hospitalization.treatmentType ? hospitalization.treatmentType : ''
            }}
          </td>
          <td>
            {{
              i === 0 ||
              hospitalizationsTypes[i - 1].treatmentType !== hospitalization.treatmentType ||
              hospitalizationsTypes[i - 1].stayType !== hospitalization.stayType
                ? hospitalization.stayType
                : ''
            }}
          </td>
          <td>
            {{ i === 0 || hospitalizationsTypes[i - 1].referralType !== hospitalization.referralType ? hospitalization.referralType : '' }}
          </td>
          <td>
            <button class="hospitalization-button application" @click="selectHospitalization(hospitalization)">Записаться</button>
            <button class="hospitalization-button docs" @click="downloadDocs(hospitalization)">Список документов</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default defineComponent({
  name: 'HospitalizationsTable',
  emits: ['downloadDocs', 'selectHospitalization'],
  setup(props, { emit }) {
    const store = useStore();
    const hospitalizationsTypes: ComputedRef<IHospitalizationType[]> = computed(() => store.getters['hospitalizationsTypes/items']);
    const hospitalization: ComputedRef<IHospitalization> = computed(() => store.getters['hospitalizations/item']);

    onBeforeMount(() => {
      store.dispatch('hospitalizationsTypes/getAll');
    });

    const downloadDocs = (hospitalization: IHospitalizationType): void => {
      store.commit('hospitalizations/selectHospitalization', hospitalization);
      emit('downloadDocs');
    };

    const selectHospitalization = (hospitalizationType: IHospitalizationType): void => {
      store.commit('hospitalizations/selectHospitalization', hospitalizationType);
      if (hospitalization.value.isMoscowReferral()) {
        ElMessageBox.alert(
          'Запись на плановую госпитализацию в ГБУЗ «Морозовская ДГКБ ДЗМ» пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
          '',
          {
            confirmButtonText: 'ОК',
          }
        );
        return;
      }
      emit('selectHospitalization');
    };

    return {
      selectHospitalization,
      downloadDocs,
      hospitalizationsTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
.hospitalization-table-wrapper {
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;
}

.hospitalization-table {
  width: 100%;
  text-align: center;
}

.hospitalization-button {
  margin: 10px 0;
  font-weight: normal;
  font-size: 14px;
  border-radius: 40px;
  padding: 12px 23px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: none;
}

.hospitalization-button-docs {
  margin: 10px 0;
  font-weight: bold;
  font-size: 14px;
  padding: 12px 23px;
  height: auto;
  color: white;
  border: none;
}

.application {
  background-color: #31af5e;
  &:hover {
    cursor: pointer;
    background-color: darken(#31af5e, 10%);
  }
}

.docs {
  color: #2754eb;
  background: none;
  &:hover {
    cursor: pointer;
    color: darken(#2754eb, 30%);
  }
}

table {
  width: 70%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #dcdfe6;
  padding: 3px 7px 2px 7px;
}

th {
  text-align: left;
  padding: 5px;
  background-color: #dcdfe6;
  color: #ffffff;
  border-right: 1px solid #f2f2f2;
}

th:last-child {
  border-right: 1px solid #dcdfe6;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
