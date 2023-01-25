<template>
  <el-form v-if="mounted" ref="form" :model="employee" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical">
          <div class="margin-container">
            <CollapsContainer :tab-id="1011" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Личная информация</div>
              </template>
              <template #inside-content>
                <div class="background-container">
                  <HumanForm :with-styles="false" store-module="employees" @input-name-complete="completeInput" />
                </div>
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1012" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Образование</div>
              </template>
              <template #inside-content>
                <EducationForm :store-module="'employees'" :props="props" />
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1013" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Опыт работы</div>
              </template>
              <template #inside-content>
                <div class="tools-buttons"><button class="admin-add" @click.prevent="employee.addExperience()">+ Добавить</button></div>
                <div v-for="(experience, i) in employee.experiences" :key="experience.id" class="container">
                  <button class="admin-del" @click="employee.removeExperience(i)">Удалить</button>
                  <div class="list-number">{{ i + 1 }}</div>
                  <el-form-item label="Место работы" :prop="'experiences.' + i + '.place'" :rules="rules.experiencePlace">
                    <el-input v-model="experience.place" minlength="10" />
                  </el-form-item>
                  <el-form-item label="Должность" :prop="'experiences.' + i + '.position'" :rules="rules.position">
                    <el-input v-model="experience.position" />
                  </el-form-item>
                  <div class="column-block">
                    <div class="column-item3">
                      <el-form-item label="С:" :prop="'experiences.' + i + '.start'" :rules="rules.start">
                        <DatePicker v-model="experience.start" />
                      </el-form-item>
                    </div>
                    <div class="column-item3">
                      <el-form-item label="По:" :prop="'experiences.' + i + '.end'" :rules="rules.end">
                        <DatePicker v-model="experience.end" />
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1014" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Сертификаты</div>
              </template>
              <template #inside-content>
                <div class="tools-buttons"><button class="admin-add" @click.prevent="employee.addCertificate()">+ Добавить</button></div>
                <div v-for="(certificate, i) in employee.certificates" :key="certificate.id" class="container">
                  <button class="admin-del" @click.prevent="employee.removeCertificate(i)">Удалить</button>
                  <div class="list-number">{{ i + 1 }}</div>
                  <el-form-item label="Название сертификата" :prop="'certificates.' + i + '.description'" :rules="rules.description">
                    <el-input v-model="certificate.description" />
                  </el-form-item>
                  <el-form-item label="Загрузить сертификат">
                    <UploaderSingleScan :height="238" :width="238" :file-info="certificate.scan" />
                  </el-form-item>
                </div>
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1016" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Ученая степень, звание</div>
              </template>
              <template #inside-content>
                <div class="background-container">
                  <el-form-item label="Учёная степень">
                    <el-input v-model="employee.academicDegree" />
                  </el-form-item>
                  <el-form-item label="Звание">
                    <el-input v-model="employee.academicRank" />
                  </el-form-item>
                </div>
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1015" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Регалии</div>
              </template>
              <template #inside-content>
                <div class="tools-buttons"><button class="admin-add" @click.prevent="addRegalia">+ Добавить</button></div>
                <div v-for="(regalia, i) in employee.regalias" :key="regalia" class="container">
                  <button class="admin-del" @click.prevent="employee.removeRegalia(i)">Удалить</button>
                  <div class="list-number">{{ i + 1 }}</div>
                  <el-form-item label="Описание" :prop="'regalias.' + i + '.name'" :rules="rules.regaliaName">
                    <el-input v-model="regalia.name" />
                  </el-form-item>
                </div>
              </template>
            </CollapsContainer>
          </div>
          <div class="margin-container">
            <CollapsContainer :tab-id="1015" :collapsed="false">
              <template #inside-title>
                <div class="title-in">Педагогическая деятельность&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </template>
              <template #inside-content>
                <div class="tools-buttons">
                  <button class="admin-add" @click.prevent="employee.addTeachingActivity()">+ Добавить</button>
                </div>
                <div v-for="(teachingActivity, i) in employee.teachingActivities" :key="teachingActivity" class="container">
                  <button class="admin-del" @click.prevent="employee.removeTeachingActivity(i)">Удалить</button>
                  <div class="list-number">{{ i + 1 }}</div>
                  <el-form-item label="Описание" :prop="'teachingActivities.' + i + '.name'" :rules="rules.teachName">
                    <el-input v-model="teachingActivity.name" />
                  </el-form-item>
                </div>
              </template>
            </CollapsContainer>
          </div>
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
        </el-container>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import EducationForm from '@/components/admin/EducationForm.vue';
import HumanForm from '@/components/admin/HumanForm.vue';
import DatePicker from '@/components/DatePicker.vue';
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
    UploaderSingleScan,
    CollapsContainer,
    DatePicker,
  },
  setup() {
    const form = ref();
    const employee: Ref<IEmployee> = computed(() => Provider.store.getters['employees/item']);
    const employees: Ref<IEmployee[]> = computed(() => Provider.store.getters['employees/items']);
    const rules = ref({
      experiencePlace: [{ required: true, message: 'Поле "МЕСТО РАБОТЫ" не может быть пустым', trigger: 'change' }],
      position: [{ required: true, message: 'Поле "ДОЛЖНОСТЬ" не может быть пустым', trigger: 'change' }],
      start: [{ required: true, message: 'Поле "С:" не может быть пустым', trigger: 'change' }],
      end: [{ required: true, message: 'Поле "ПО:" не может быть пустым', trigger: 'change' }],
      description: [{ required: true, message: 'Поле "НАЗВАНИЕ СЕРТИФИКАТА" не может быть пустым', trigger: 'change' }],
      regaliaName: [{ required: true, message: 'Поле "ОПИСАНИЕ" не может быть пустым', trigger: 'change' }],
      teachName: [{ required: true, message: 'Поле "ОПИСАНИЕ" не может быть пустым', trigger: 'change' }],

      educationCertificationPlace: [
        { required: true, message: 'Поле "ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ" не может быть пустым', trigger: 'change' },
      ],
      institution: [{ required: true, message: 'Поле "УЧЕБНОЕ ЗАВЕДЕНИЕ" не может быть пустым', trigger: 'change' }],
      type: [{ required: true, message: 'Поле "ТИП ОБРАЗОВАНИЯ" не может быть пустым', trigger: 'change' }],
      document: [{ required: true, message: 'Поле "ДИПЛОМ" не может быть пустым', trigger: 'change' }],
      specialization: [{ required: true, message: 'Поле "СПЕЦИАЛЬНОСТЬ" не может быть пустым', trigger: 'change' }],
      certificationDate: [{ required: true, message: 'Поле "ДАТА ПРОВЕДЕНИЯ" не может быть пустым', trigger: 'change' }],
      startDate: [{ required: true, message: 'Поле "ДАТА ПРОВЕДЕНИЯ" не может быть пустым', trigger: 'change' }],
      endDate: [{ required: true, message: 'Поле "ДАТА ОКОНЧАНИЯ ДЕЙСТВИЯ" не может быть пустым', trigger: 'change' }],
    });

    let filterModel: IFilterModel | undefined = undefined;
    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }

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
      watch(employee, formUpdated, { deep: true });

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
      rules,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.container {
  position: relative;
  width: calc(100% - 60px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #dff2f8;
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

.margin-container {
  margin: 0 0 10px 0;
}

.margin-container:first-child {
  margin: -10px 0 10px 0;
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

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

.list-number {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.admin-del {
  position: absolute;
  top: 23px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-del2 {
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.column-item3 {
  width: 50%;
  margin-left: 20px;
}

.column-item3:first-child {
  width: 50%;
  margin-left: 0px;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
}

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

@media screen and (max-width: 910px) {
  .column-block {
    display: block;
  }
  .column-item {
    width: 100%;
    margin-left: 0px;
  }
  .column-item2 {
    width: 100%;
    margin-left: 0px;
  }
  .column-item3 {
    width: 100%;
    margin-left: 0px;
  }

  .column-item3:first-child {
    width: 100%;
    margin-left: 0px;
  }
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
  .admin-del {
    position: absolute;
    top: 23px;
    right: 36px;
    border: none;
    background: inherit;
    color: #a3a9be;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }
  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
