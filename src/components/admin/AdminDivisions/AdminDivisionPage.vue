<template>
  <el-form ref="form" :key="division" :model="division" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="17">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Наименование отделения" prop="name">
              <el-input v-model="division.name" placeholder="Наименование отделения"></el-input>
            </el-form-item>
            <el-form-item label="Общая информация">
              <QuillEditor v-model:content="division.info" style="height: 350px" content-type="html" theme="snow"></QuillEditor>
            </el-form-item>
            <el-form-item label="Адрес">
              <el-input v-model="division.address" placeholder="Адрес" disabled></el-input>
            </el-form-item>
          </el-card>

          <el-card>
            <el-space>
              <el-select v-model="newDoctorId" filterable placeholder="Выберите доктора">
                <el-option v-for="item in filteredDoctors" :key="item.id" :label="item.human.getFullName()" :value="item.id" />
              </el-select>
              <el-button type="success" style="margin: 20px" @click="addDoctor">Добавить доктора</el-button>
            </el-space>

            <el-table :data="divisionDoctors">
              <el-table-column label="ФИО" sortable>
                <template #default="scope">
                  {{ scope.row.human.getFullName() }}
                </template>
              </el-table-column>
              <el-table-column label="Пол" align="center" sortable>
                <template #default="scope">
                  {{ scope.row.human.getGender() }}
                </template>
              </el-table-column>
              <el-table-column label="Дата рождения" sortable>
                <template #default="scope">
                  {{ fillDateFormat(scope.row.human.dateBirth) }}
                </template>
              </el-table-column>
              <el-table-column width="40" fixed="right" align="center">
                <template #default="scope">
                  <TableButtonGroup :show-remove-button="true" @remove="removeDoctor(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="7">
        <el-container direction="vertical">
          <el-button type="success" style="margin-bottom: 20px" @click="submit">Сохранить</el-button>
          <el-card>
            <el-form-item label="Телефон">
              <el-input v-model="division.phone" placeholder="Телефон"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="division.email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item label="Здание" prop="buildingId">
              <el-select v-model="division.buildingId" filterable placeholder="Выберите здание" @change="changeBuildingHandler">
                <el-option v-for="item in buildingOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="Этаж" prop="floorId">
              <el-select
                v-model="division.floorId"
                placeholder="Выберите этаж"
                :disabled="division.buildingId ? false : true"
                @change="changeFloorHandler"
              >
                <template v-if="division.buildingId && floorOptions">
                  <el-option v-for="item in floorOptions.floors" :key="item.id" :label="item.number" :value="item.id" />
                </template>
              </el-select>
            </el-form-item>
          </el-card>
          <TimetableConstructor :store="'divisions'" />
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Building from '@/classes/buildings/Building';
import DivisioinRules from '@/classes/buildings/DivisioinRules';
import Division from '@/classes/buildings/Division';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TimetableConstructor from '@/components/admin/TimetableConstructor.vue';
import IFloor from '@/interfaces/buildings/IFloor';
import IDoctor from '@/interfaces/doctors/IDoctor';
import validate from '@/mixinsAsModules/validate';

export default defineComponent({
  name: 'AdminDivisionPage',
  components: { QuillEditor, TableButtonGroup, TimetableConstructor },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(DivisioinRules);

    const division = computed(() => store.getters['divisions/division']);
    const doctors = computed(() => store.getters['doctors/doctors']);
    const filteredDoctors = computed(() => store.getters['doctors/filteredDoctors']);
    const divisionDoctors = computed(() => store.getters['doctors/divisionDoctors']);
    const newDoctorId = ref();
    const floorOptions = ref();
    const buildingOptions = ref([new Building()]);

    const loadB1uildingOptions = async (): Promise<void> => {
      await store.dispatch('buildings/getAll');
      buildingOptions.value = store.getters['buildings/buildings'];
    };
    const loadDivision = async (): Promise<void> => {
      await store.dispatch('doctors/getAll');
      if (route.params['id']) {
        await store.dispatch('divisions/get', route.params['id']);
        store.dispatch('doctors/setDivisionDoctorsByDivisionId', route.params['id']);
        if (division.value.floorId) {
          await store.dispatch('buildings/getByFloorId', division.value.floorId);
          division.value.buildingId = store.getters['buildings/building'].id;
          floorOptions.value = buildingOptions.value.find((item) => item.id == division.value.buildingId);
        }
        store.commit('admin/setPageTitle', division.value.name);
      } else {
        store.commit('divisions/set', new Division());
        store.commit('admin/setPageTitle', 'Создать отделение');
      }
    };

    const load = async (): Promise<void> => {
      await loadB1uildingOptions();
      await loadDivision();
    };

    onBeforeMount(load);

    const submit = async () => {
      if (!validate(form)) return;
      division.value.doctors = divisionDoctors.value;
      try {
        if (route.params['id']) {
          await store.dispatch('divisions/update', division.value);
        } else {
          await store.dispatch('divisions/create', division.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      router.push('/admin/divisions');
    };

    const changeBuildingHandler = () => {
      floorOptions.value = buildingOptions.value.find((item) => item.id == division.value.buildingId);
      division.value.floorId = '';
    };

    const changeFloorHandler = () => {
      const building = buildingOptions.value.find((item) => item.id == division.value.buildingId);
      const floor = floorOptions.value.floors.find((item: IFloor) => item.id == division.value.floorId);
      if (building) division.value.address = `${building.address}, ${floor.number} этаж`;
    };

    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');

    const addDoctor = () => {
      const newDoctor = doctors.value?.find((i: IDoctor) => i.id === newDoctorId.value);
      newDoctor.divisionId = route.params['id'];
      store.dispatch('doctors/addDoctorToDivisionDoctors', newDoctor);
      newDoctorId.value = '';
    };
    const removeDoctor = (id: string) => {
      store.dispatch('doctors/removeDoctorFromDivisionDoctors', id);
    };

    return {
      division,
      buildingOptions,
      changeBuildingHandler,
      changeFloorHandler,
      floorOptions,
      submit,
      form,
      rules,
      doctors,
      fillDateFormat,
      divisionDoctors,
      newDoctorId,
      addDoctor,
      removeDoctor,
      filteredDoctors,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.vertical-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .el-checkbox {
    margin: 5px !important;
  }
}

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.delete-tag-icon {
  margin-left: 20%;
  transition: all 0.1s;

  &:hover {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.content-card {
  height: 450px;
}
</style>
