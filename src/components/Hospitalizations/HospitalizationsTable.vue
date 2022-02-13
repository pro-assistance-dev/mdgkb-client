<template>
  <div class="hospitalization-table-wrapper">
    <table class="hospitalization-table">
      <thead>
        <tr>
          <th>Полис</th>
          <th>Лечения</th>
          <th>Пребывание</th>
          <th>Направление</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hospitalization, i) in hospitalizations" :key="hospitalization">
          <td>
            {{ i === 0 || hospitalizations[i - 1].policyType !== hospitalization.policyType ? hospitalization.policyType : '' }}
          </td>
          <td>
            {{ i === 0 || hospitalizations[i - 1].treatmentType !== hospitalization.treatmentType ? hospitalization.treatmentType : '' }}
          </td>
          <td>
            {{
              i === 0 ||
              hospitalizations[i - 1].treatmentType !== hospitalization.treatmentType ||
              hospitalizations[i - 1].stayType !== hospitalization.stayType
                ? hospitalization.stayType
                : ''
            }}
          </td>
          <td>
            {{ i === 0 || hospitalizations[i - 1].referralType !== hospitalization.referralType ? hospitalization.referralType : '' }}
          </td>
          <td>
            <button class="hospitalization-button application" @click="sendApplication(hospitalization)">Записаться</button>
            <button class="hospitalization-button docs" @click="downloadDocs(hospitalization)">Список документов</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default defineComponent({
  name: 'HospitalizationsTable',
  emits: ['downloadDocs', 'sendApplication'],
  setup(props, { emit }) {
    const store = useStore();
    const hospitalizations: ComputedRef<IHospitalizationType[]> = computed(() => store.getters['hospitalizations/items']);

    onBeforeMount(() => {
      store.dispatch('hospitalizations/getAll');
    });

    const downloadDocs = (hospitalization: IHospitalizationType): void => {
      store.commit('hospitalizations/selectHospitalization', hospitalization);
      emit('downloadDocs', hospitalization);
    };

    const sendApplication = (hospitalization: IHospitalizationType): void => {
      store.commit('hospitalizations/selectHospitalization', hospitalization);
      emit('sendApplication', hospitalization);
    };

    return {
      sendApplication,
      downloadDocs,
      hospitalizations,
    };
  },
});
</script>

<style lang="scss" scoped>
.hospitalization-table-wrapper {
  background: white;
}

.hospitalization-table {
  width: 100%;
  text-align: center;
}

.hospitalization-button {
  margin: 10px 0;
  width: 230px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  padding: 15px 0px;
  height: auto;
  letter-spacing: 2px;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.application {
  background-color: #31af5e;
  &:hover {
    cursor: pointer;
    background-color: darken(#31af5e, 10%);
  }
}

.docs {
  background-color: #2754eb;
  &:hover {
    cursor: pointer;
    background-color: darken(#2754eb, 10%);
  }
}
</style>
