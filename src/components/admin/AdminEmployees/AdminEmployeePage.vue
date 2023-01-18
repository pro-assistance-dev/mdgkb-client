<template>
  <el-form v-if="mounted" ref="form" :model="employee" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <div class="field">
            <CollapsContainer :tab-id="1011" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Личная информация</div>
              </template>
              <template #inside-content>
                <div class="container">
                  <HumanForm :with-styles="false" store-module="employees" @input-name-complete="completeInput" />
                </div>
              </template>
            </CollapsContainer>
          </div>
          <el-checkbox v-model="employee.hasAppointment" label="Включить расписание приёма" />
          <EducationForm :store-module="'employees'" />
          <el-card>
            <el-button @click="employee.addExperience()">Добавить опыт работы</el-button>
            <div v-for="(experience, i) in employee.experiences" :key="experience.id">
              <el-form-item label="Место работы">
                <el-input v-model="experience.place" />
              </el-form-item>
              <el-form-item label="Должность">
                <el-input v-model="experience.position" />
              </el-form-item>
              <el-form-item label="Начало">
                <el-input-number v-model="experience.start" />
              </el-form-item>
              <el-form-item label="Конец">
                <el-input-number v-model="experience.end" />
              </el-form-item>
              <el-form-item label="Должность">
                <el-button @click="employee.removeExperience(i)">Удалить опыт работы</el-button>
              </el-form-item>
            </div>
          </el-card>

          <el-card>
            <el-button @click="employee.addCertificate()">Добавить сертификат</el-button>
            <div v-for="(certificate, i) in employee.certificates" :key="certificate.id">
              <el-form-item label="Название сертификата">
                <el-input v-model="certificate.description" />
              </el-form-item>
              <UploaderSingleScan :file-info="certificate.scan" />
              <el-button @click="employee.removeCertificate(i)">Удалить сертификат</el-button>
            </div>
          </el-card>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <el-card header="Фото">
            <UploaderSingleScan :file-info="employee.human.photo" :height="300" :width="300" @remove-file="employee.human.removePhoto()" />
          </el-card>
          <el-card header="Фото-миниатюра">
            <UploaderSingleScan
              :file-info="employee.human.photoMini"
              :height="300"
              :width="300"
              @remove-file="employee.human.removePhotoMini()"
            />
          </el-card>
          <el-card>
            <template #header>
              <CardHeader :label="'Регалии, звания'" :add-button="false" />
            </template>
            <!-- <el-form-item label="Должность" prop="position">
              <RemoteSearch :key-value="'position'" :model-value="employee.position.name" @select="selectPosition" />
            </el-form-item> -->
            <el-form-item label="Учёная степень">
              <el-input v-model="employee.academicDegree" />
            </el-form-item>
            <el-form-item label="Звание">
              <el-input v-model="employee.academicRank" />
            </el-form-item>
            <el-form-item label="Ссылка на профиль в системе Московский врач">
              <el-input v-model="employee.mosDoctorLink" />
            </el-form-item>
            <el-button @click="addRegalia"> Добавить регалию</el-button>
            <el-form-item label="Регалии">
              <el-input v-for="regalia in employee.regalias" :key="regalia" v-model="regalia.name" />
            </el-form-item>
            <el-button @click="employee.addTeachingActivity()"> Добавить педагогическую деятельнсоть</el-button>
            <el-form-item label="Преподавательская деятельность">
              <el-input v-for="regalia in employee.teachingActivities" :key="regalia" v-model="regalia.name" />
            </el-form-item>
            <el-divider />
            <el-form-item label="Краткое описание сферы интересов">
              <el-input v-model="employee.description" />
            </el-form-item>
          </el-card>
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import CardHeader from '@/components/admin/CardHeader.vue';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IEmployee from '@/interfaces/IEmployee';
import IHuman from '@/interfaces/IHuman';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import removeFromClass from '@/services/removeFromClass';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminEmployeePage',
  components: {
    HumanForm,
    EducationForm,
    CardHeader,
    UploaderSingleScan,
    CollapsContainer,
  },
  setup() {
    const form = ref();
    const employee: Ref<IEmployee> = computed(() => Provider.store.getters['employees/item']);
    const employees: Ref<IEmployee[]> = computed(() => Provider.store.getters['employees/items']);

    let filterModel: IFilterModel | undefined = undefined;
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }

      // if (!employee.value.fileInfo.fileSystemPath) {
      //   ElMessage({ message: 'Пожалуйста, добавьте картинку', type: 'error' });
      //   saveButtonClick.value = false;
      //   return;
      // }

      try {
        if (Provider.route().params['id']) {
          await Provider.store.dispatch('employees/update', employee.value);
        } else {
          await Provider.store.dispatch('employees/create', employee.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : await Provider.router.push('/admin/employees');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    const load = async () => {
      await Provider.store.dispatch('search/searchGroups');
      await loadEmployee();
    };

    Hooks.onBeforeMount(load);

    const loadEmployee = async (): Promise<void> => {
      if (Provider.route().params['id']) {
        await Provider.store.dispatch('employees/get', Provider.route().params['id']);
        Provider.store.commit('admin/setHeaderParams', {
          title: employee.value.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        Provider.store.commit('employees/resetState');
        Provider.store.commit('admin/setHeaderParams', { title: 'Добавить врача', showBackButton: true, buttons: [{ action: submit }] });
      }
      window.addEventListener('beforeunload', beforeWindowUnload);
      // watch(employee, formUpdated, { deep: true });

      filterModel = FilterModel.CreateFilterModel(
        Provider.schema.value.employee.tableName,
        Provider.schema.value.employee.fullName,
        DataTypes.String
      );
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const addRegalia = () => Provider.store.commit('employees/addRegalia');

    const completeInput = async (human: IHuman) => {
      if (!filterModel) {
        return;
      }
      filterModel.value1 = human.getFullName();
      Provider.setFilterModels(filterModel);
      await Provider.store.dispatch('employees/getAll', Provider.filterQuery.value);
      if (employees.value.length === 0) {
        return;
      }
      await offerEditExistingDoctor();
    };

    const offerEditExistingDoctor = async () => {
      const existing = employees.value[0];
      if (!existing) {
        return;
      }
      ElMessageBox.confirm('Сотрудник с введённым именем уже существует в системе', 'Отредактировать существующего врача?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Перейти к редактированию',
        cancelButtonText: 'Остаться в создании нового',
      })
        .then(async () => {
          // Provider.router.push({ name: 'AdminEditDoctorPage', params: { id: existingDoctor.human.slug } });
          await Provider.router.push(`/admin/employees/${existing.human.slug}`);
          await loadEmployee();
        })
        .catch((action: string) => {
          if (action === 'cancel') {
            ElMessage({
              type: 'warning',
              message: 'Сотрудник с введённым именем уже существует в системе',
            });
          }
        });
    };

    return {
      employees,
      completeInput,
      addRegalia,
      submit,
      employee,
      form,
      mounted: Provider.mounted,
      schema: Provider.schema,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.column-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.column-item {
  width: 40%;
  margin-left: 0px;
}

.column-item2 {
  width: 60%;
  margin-left: 20px;
}

.column-item3 {
  width: 50%;
  margin-left: 20px;
}

.field {
  margin: 0 0 10px 0;
}

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form--label-top .el-form-item) {
  display: flex;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}
</style>
