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
    <p v-if="!showContacts">
      <a @click="showContactsHandler">Контакты отделений по госпитализации</a>
    </p>
    <el-dialog v-model="showDialog" top="10vh" width="80%" title="Список документов" destroy-on-close>
      <template v-if="selectedHospitalizationsType">
        <div v-html="selectedHospitalizationsType.description"></div>
        <HospitalizationsHowSendApplication />
        <HospitalizationStages :hospitalization-type-stages="selectedHospitalizationsType.hospitalizationTypeStages" />
        <HospitalizationAnalyzes :hospitalization-type-analyzes="selectedHospitalizationsType.hospitalizationTypeAnalyzes" />
        <HospitalizationDocuments :hospitalization-type-documents="selectedHospitalizationsType.hospitalizationTypeDocuments" />
      </template>
    </el-dialog>
  </div>
  <transition name="slide-fade-bottom">
    <div v-if="showContacts" id="contacts" class="card-item contacts" style="margin-top: 20px">
      <h2 style="text-align: center">Контакты отделений по госпитализации</h2>
      <el-collapse accordion>
        <el-collapse-item v-for="item in contacts" :key="item.title" :title="item.title">
          <p v-if="item.division"><b>Отделение:</b> {{ item.division }}</p>
          <p v-if="item.name"><b>Ответственный сотрудник:</b> {{ item.name }}</p>
          <p v-if="item.phone"><b>Телефон:</b> {{ item.phone }}</p>
          <p v-if="item.email"><b>Электронная почта:</b> {{ item.email }}</p>
          <p v-if="item.schedule"><b>График работы:</b> {{ item.schedule }}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </transition>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Hospitalization from '@/classes/Hospitalization';
import HospitalizationType from '@/classes/HospitalizationType';
import HospitalizationAnalyzes from '@/components/Hospitalizations/HospitalizationAnalyzes.vue';
import HospitalizationDocuments from '@/components/Hospitalizations/HospitalizationDocuments.vue';
import HospitalizationsHowSendApplication from '@/components/Hospitalizations/HospitalizationsHowSendApplication.vue';
import HospitalizationStages from '@/components/Hospitalizations/HospitalizationStages.vue';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'HospitalizationsTable',
  components: { HospitalizationsHowSendApplication, HospitalizationStages, HospitalizationAnalyzes, HospitalizationDocuments },
  emits: ['downloadDocs', 'selectHospitalization'],
  setup(props, { emit }) {
    const showInfo: Ref<boolean> = ref(false);
    const hospitalizationsTypes: HospitalizationType[] = HospitalizationsTypesStore.Items();
    const selectedHospitalizationsType: Ref<HospitalizationType | undefined> = ref(undefined);
    const hospitalization: Hospitalization = HospitalizationsStore.Item();
    const showDialog: Ref<boolean> = ref(false);
    const showContacts: Ref<boolean> = ref(false);
    const contacts = [
      {
        title: 'Педиатрия',
        division: 'Педиатрическое соматическое отделение',
        name: 'Зимин Сергей Борисович — заведующий отделением',
        phone: '+7 (495) 959-88-01 доб.1041',
        email: '23otd@morozdgkb.ru',
        schedule: 'пн.-пт. — 13:00-15:30',
      },
      {
        title: 'Нефрология',
        division: 'Нефрологическое отделение',
        name: 'Лабутина Наталья Викторовна — заведующая отделением',
        phone: '+7 (495) 959-88-01 доб. 1296',
        email: 'Nefro37@morozdgkb.ru',
        schedule: 'пн.-пт. — 10:00-16:00',
      },
      {
        title: 'Паллиативная помощь',
        division: 'Отделение паллиативной медицинской помощи',
        phone: '+7 (495) 959-87-36',
        schedule: 'пн.-пт. — 13:00-15:00',
      },
    ];

    onBeforeMount(() => {
      HospitalizationsTypesStore.GetAll();
    });

    const downloadDocs = (hospitalization: HospitalizationType): void => {
      HospitalizationsStore.SelectHospitalization(hospitalization);
      selectedHospitalizationsType.value = hospitalization;
      emit('downloadDocs');
      showDialog.value = true;
    };

    const selectHospitalization = (hospitalizationType: HospitalizationType): void => {
      HospitalizationsStore.SelectHospitalization(hospitalizationType);
      if (hospitalization.isMoscowReferral()) {
        ElMessageBox.alert(
          'Запись на плановую госпитализацию в ГБУЗ «Морозовская ДГКБ ДЗМ» пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
          '',
          {
            confirmButtonText: 'ОК',
          }
        );
      }
      emit('selectHospitalization');
    };

    const showContactsHandler = () => {
      showContacts.value = true;
    };
    setTimeout(() => scroll('#contacts'), 100);

    return {
      selectedHospitalizationsType,
      showInfo,
      selectHospitalization,
      downloadDocs,
      hospitalizationsTypes,
      showDialog,
      showContacts,
      contacts,
      showContactsHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

:deep(.el-collapse-item__header) {
  font-size: 16px;
}
:deep(.el-collapse-item__content) {
  font-size: 16px;
}
.slide-fade-bottom {
  &-enter-active {
    transition: all 0.5s ease-out;
  }
  &-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-enter-from,
  &-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }
}
</style>
