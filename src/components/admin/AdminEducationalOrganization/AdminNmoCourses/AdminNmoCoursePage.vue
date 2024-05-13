<template>
  <div v-if="mounted" class="wrapper">
    <el-form ref="form" :key="nmoCourse" :model="nmoCourse" label-position="top">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="19">
          <el-container direction="vertical">
            <el-card>
              <SetEntity :search-key="Employee.GetClassName()" label="Выбрать руководителя"
                :entity-name="nmoCourse.mainTeacher.human.getFullName()" @select-search="selectMainTeacherSearch"
                @reset="nmoCourse.resetMainTeacher()" />
            </el-card>
            <el-card>
              <el-form-item prop="title" label="Название:">
                <el-input v-model="nmoCourse.name" placeholder="Заголовок" />
              </el-form-item>
            </el-card>
            <el-card class="content-card">
              <template #header> Контент </template>
              <el-form-item prop="description">
                <WysiwygEditor v-model="nmoCourse.description" />
              </el-form-item>
            </el-card>
          </el-container>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="5">
          <el-container direction="vertical">
            <el-card>
              <el-container direction="vertical">
                <!-- <el-checkbox v-model="nmoCourse.isNmo">Программа НМО</el-checkbox> -->
                <el-form-item v-if="nmoCourse.isNmo" prop="listeners" label="Ссылка НМО">
                  <el-input v-model="nmoCourse.linkNmo" placeholder="Ссылка НМО" />
                </el-form-item>
                <el-select v-model="nmoCourse.formPattern" value-key="id" placeholder="Шаблон формы"
                  @change="changeFormPatternHandler()">
                  <el-option v-for="item in formPatterns" :key="item.id" :label="item.title" :value="item" />
                </el-select>
              </el-container>
            </el-card>
            <el-card>
              <template #header> Количество слушателей </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="nmoCourse.listeners" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Стоимость </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="nmoCourse.cost" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Количество часов </template>
              <el-form-item prop="listeners">
                <el-input-number v-model="nmoCourse.hours" />
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Специальность, по которой читается программа </template>
              <el-form-item prop="listeners">
                <el-select v-model="nmoCourse.specializationId" placeholder="Выбрать специальность">
                  <el-option v-for="spec in specializations" :key="spec.id" :label="spec.name" :value="spec.id" />
                </el-select>
              </el-form-item>
            </el-card>
            <el-card>
              <template #header> Выбрать специальности, для которых читается программа </template>
              <el-checkbox v-for="specialization in specializations" :key="specialization.id"
                :model-value="nmoCourse.findSpecialization(specialization.id)"
                @change="nmoCourse.addSpecialization(specialization)">
                {{ specialization.name }}
              </el-checkbox>
            </el-card>
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref } from 'vue';

import Employee from '@/classes/Employee';
import Form from '@/classes/Form';
import NmoCourse from '@/classes/NmoCourse';
import Specialization from '@/classes/Specialization';
import SetEntity from '@/components/admin/SetEntity.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import ClassHelper from '@/services/ClassHelper';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminNmoCoursePage',
  components: {
    WysiwygEditor,
    SetEntity,
  },
  setup() {
    const nmoCourse: ComputedRef<NmoCourse> = computed<NmoCourse>(() => Provider.store.getters['nmoCourses/item']);
    const specializations: ComputedRef<Specialization[]> = computed<Specialization[]>(
      () => Provider.store.getters['specializations/items']
    );
    const formPatterns: ComputedRef<Form[]> = computed<Form[]>(() => Provider.store.getters['formPatterns/items']);

    const load = async () => {
      await Provider.store.dispatch('educationYears/getAll');
      await Provider.store.dispatch('specializations/getAll');
      await Provider.store.dispatch('formPatterns/getAll');
      await Provider.loadItem(ClassHelper.GetPropertyName(NmoCourse).id);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? nmoCourse.value.name : 'Добавить программу')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave(Hooks.submit);

    const changeFormPatternHandler = () => {
      nmoCourse.value.formPatternId = nmoCourse.value.formPattern.id;
    };

    const employee: Ref<Employee> = computed(() => Provider.store.getters['employees/item']);
    const selectMainTeacherSearch = async (searchObject: ISearchObject) => {
      await Provider.store.dispatch('employees/get', searchObject.value);
      nmoCourse.value.setMainTeacher(employee.value);
    };

    // const addTeacher = async (searchObject: ISearchObject) => {
    //   if (nmoCourse.value.teacherExists(searchObject.id)) {
    //     ElMessage({ message: 'Выбранный преподаватель уже добавлен', type: 'error' });
    //     return;
    //   }
    //   await Provider.store.dispatch('employees/get', searchObject.id);
    //   nmoCourse.value.addTeacher(employee.value);
    //   Provider.store.commit('employees/resetItem');
    // };

    return {
      Employee,
      specializations,
      selectMainTeacherSearch,
      mounted: Provider.mounted,
      nmoCourse,
      form: Provider.form,
      formPatterns,
      changeFormPatternHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

.content-card {
  min-height: 450px;
  max-height: 900px;
}

:deep(.el-dialog) {
  overflow: hidden;
}
</style>
