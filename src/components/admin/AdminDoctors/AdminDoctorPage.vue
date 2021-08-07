<template>
  <el-form ref="form" :model="doctor" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-container direction="vertical">
          <el-card>
            <el-form-item label="Фамилия" prop="human.surname">
              <el-input v-model="doctor.human.surname"></el-input>
            </el-form-item>
            <el-form-item label="Имя" prop="human.name">
              <el-input v-model="doctor.human.name"></el-input>
            </el-form-item>
            <el-form-item label="Отчество" prop="human.patronymic">
              <el-input v-model="doctor.human.patronymic"></el-input>
            </el-form-item>
            <el-form-item label="Пол" prop="human.isMale">
              <el-select v-model="doctor.human.isMale" placeholder="Выберите пол">
                <el-option label="Мужчина" :value="true"></el-option>
                <el-option label="Женщина" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Дата рождения" prop="human.dateBirth">
              <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="doctor.human.dateBirth"></el-date-picker>
            </el-form-item>
            <el-form-item label="Отделение">
              <el-select v-model="doctor.divisionId" placeholder="Выберите отделение" filterable default-first-option style="width: 100%">
                <el-option v-for="item in divisionOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
        <el-container direction="vertical">
          <el-button type="success" @click="submit" style="margin-bottom: 20px">Сохранить</el-button>
          <el-card>
            <el-form-item label="Образование" prop="education">
              <el-input v-model="doctor.education"></el-input>
            </el-form-item>
            <el-form-item label="График работы" prop="schedule">
              <el-input v-model="doctor.schedule"></el-input>
            </el-form-item>
            <el-form-item label="Тэги" prop="tags">
              <el-input v-model="doctor.tags"></el-input>
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Doctor from '@/classes/doctors/Doctor';
import Division from '@/classes/buildings/Division';
import DoctorRules from '@/classes/doctors/DoctorRules';

export default defineComponent({
  name: 'AdminDoctorPage',

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const rules = ref(DoctorRules);

    const divisionOptions = ref([new Division()]);
    const doctor = computed(() => store.getters['doctors/doctor']);
    const loadDivisionOptions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
      divisionOptions.value = store.getters['divisions/divisions'];
    };
    const loadDoctor = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('doctors/get', route.params['id']);
        store.commit('admin/setPageTitle', doctor.value.human.getFullName());
      } else {
        store.commit('doctors/set', new Doctor());
        store.commit('admin/setPageTitle', 'Добавить врача');
      }
      console.log(doctor.value)
    };

    const load = async (): Promise<void> => {
      await loadDivisionOptions();
      await loadDoctor();
    };
    onMounted(load);

    const submit = async () => {
      let validationResult;
      form.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
      });
      if (!validationResult) return;
      try {
        if (route.params['id']) {
          await store.dispatch('doctors/update', doctor.value);
        } else {
          await store.dispatch('doctors/create', doctor.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      router.push('/admin/doctors');
    };

    return {
      rules,
      submit,
      doctor,
      divisionOptions,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}
</style>
