<template>
  <!-- <div v-if="mounted && !doctor.id" class="employee-name">
    <div class="search-line">
      <div class="search-label">Выберите сотрудника для добавления:</div>
      <RemoteSearch :key-value="schema.employee.key" :max-width="2000" @select="selectEmployeeSearch" />
    </div>
    <div v-if="doctor.employee.id" class="container">
      <button class="admin-employee-del" @click.prevent="doctor.resetEmployee()">Удалить</button>
      <div class="division-name">
        {{ doctor.employee.human.getFullName() }}
      </div>
    </div>
  </div> -->
  <el-form v-if="mounted" ref="form" :model="head" label-position="top" :rules="rules">
    <div class="margin-container">
      <CollapsContainer :tab-id="1036">
        <template #inside-title>
          <div class="title-in">Должность</div>
        </template>
        <template #inside-content>
          <div class="background-container">
            <el-form-item label="Должность" prop="position">
              <el-input v-model="head.position"></el-input>
            </el-form-item>
            <el-form-item label="Является главным врачом:" prop="isMain">
              <el-checkbox v-model="head.isMain">Да</el-checkbox>
            </el-form-item>
          </div>
        </template>
      </CollapsContainer>
    </div>
    <div class="margin-container">
      <CollapsContainer :tab-id="1036" :collapsed="false">
        <template #inside-title>
          <div class="title-in">Отделения в подчинении</div>
        </template>
        <template #inside-content>
          <div class="background-container">
            <div class="search-line">
              <div class="search-label">Выберите отделение для добавления:</div>
              <!-- <RemoteSearch :key-value="schema.division.key" :max-width="2000" @select="addDepartment" /> -->
            </div>
            <div v-for="(department, i) in head.departments" :key="i" class="container">
              <button class="admin-del" @click.prevent="removeDepartment(i)">Удалить</button>
              <div class="list-number">{{ i + 1 }}</div>
              <div class="division-name">{{ department.name }}</div>
            </div>
          </div>
        </template>
      </CollapsContainer>
    </div>

    <div class="margin-container">
      <CollapsContainer title="Телефоны" :tab-id="2017" :collapsed="false">
        <template #inside-content>
          <div class="tools-buttons">
            <button class="admin-add" @click.prevent="contactInfo.addTelephoneNumber()">+ Добавить</button>
          </div>
          <div v-for="(telephoneNumber, i) in contactInfo.telephoneNumbers" :key="telephoneNumber" class="container2">
            <button
              class="admin-del2"
              @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.telephoneNumbers, contactInfo.telephoneNumbersForDelete)"
            >
              Удалить
            </button>
            <div class="list-number2">
              {{ i + 1 }}
            </div>
            <el-form-item label="Номер телефона:">
              <el-input v-model="telephoneNumber.number" />
            </el-form-item>
            <el-form-item label="Описание:">
              <el-input v-model="telephoneNumber.description" />
            </el-form-item>
          </div>
        </template>
      </CollapsContainer>
    </div>

    <div class="margin-container">
      <CollapsContainer title="Emails" :tab-id="2017" :collapsed="false">
        <template #inside-content>
          <div class="tools-buttons">
            <button class="admin-add" @click.prevent="contactInfo.addEmail()">+ Добавить</button>
          </div>
          <div v-for="(email, i) in contactInfo.emails" :key="email" class="container2">
            <button
              class="admin-del2"
              @click.prevent="$classHelper.RemoveFromClassByIndex(i, contactInfo.emails, contactInfo.emailsForDelete)"
            >
              Удалить
            </button>
            <div class="list-number2">
              {{ i + 1 }}
            </div>
            <el-form-item label="Email:">
              <el-input v-model="email.address" />
            </el-form-item>
            <el-form-item label="Описание:">
              <el-input v-model="email.description" />
            </el-form-item>
          </div>
        </template>
      </CollapsContainer>
    </div>

    <div class="margin-container">
      <CollapsContainer title="Расписание" :tab-id="2017" :collapsed="false">
        <template #inside-content>
          <div class="background-container">
            <TimetableConstructorV2New :store-module="'heads'" />
          </div>
        </template>
      </CollapsContainer>
    </div>

    <!-- <el-form-item label="Отделы в подчинении">
      <el-button @click="addDepartment"> Добавить отдел</el-button>
      <div v-for="(department, i) in head.departments" :key="i">
        <el-input v-model="department.name" />
        <el-button @click="removeDepartment(i)">Удалить отдел</el-button>
      </div>
    </el-form-item> -->
  </el-form>

  <ImageCropper />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch, WritableComputedRef } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Division from '@/classes/Division';
import TimetableConstructorV2New from '@/components/admin/TimetableConstructorV2New.vue';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IHead from '@/interfaces/IHead';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AdminHeadPage',
  components: { TimetableConstructorV2New, CollapsContainer },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref();
    const mounted = ref(false);

    const contactInfo: WritableComputedRef<IContactInfo> = computed(() => store.getters['heads/item'].contactInfo);

    const divisionOptions = ref([new Division()]);
    const head: Ref<IHead> = computed(() => store.getters['heads/item']);

    const submit = async (next?: NavigationGuardNext) => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (route.params['id']) {
          await store.dispatch('heads/update', head.value);
        } else {
          await store.dispatch('heads/create', head.value);
        }
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      next ? next() : router.push('/admin/heads');
    };

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await load();
      store.commit('admin/closeLoading');
    });

    const load = async (): Promise<void> => {
      if (route.params['id']) {
        await store.dispatch('heads/get', route.params['id']);
        store.commit('admin/setHeaderParams', {
          title: head.value.employee.human.getFullName(),
          showBackButton: true,
          buttons: [{ action: submit }],
        });
      } else {
        store.commit('heads/resetState');
        store.commit('admin/setHeaderParams', { title: 'Добавить руководителя', showBackButton: true, buttons: [{ action: submit }] });
      }
      mounted.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(head, formUpdated, { deep: true });
    };

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const addRegalia = () => head.value.employee.addRegalia();
    const removeRegalia = (i: number) => head.value.employee.removeRegalia(i);
    const addDepartment = () => head.value.addDepartment();
    const removeDepartment = (i: number) => head.value.removeDepartment(i);

    return {
      removeDepartment,
      addDepartment,
      removeRegalia,
      addRegalia,
      submit,
      head,
      divisionOptions,
      form,
      mounted,
      contactInfo,
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

.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}

:deep(.el-dialog) {
  overflow: hidden;
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

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.search-line {
  display: block;
  align-items: center;
  justify-content: left;
}

.search-label {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
}

.container2 {
  position: relative;
  width: calc(100% - 60px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #dff2f8;
}

// .container {
//   position: relative;
//   width: calc(100% - 20px);
//   margin: 10px 0px 10px 0px;
//   border: 1px solid #c3c3c3;
//   border-radius: 5px;
//   padding: 12px 10px;
//   background: #f9fafb;
// }

.container {
  position: relative;
  width: calc(100% - 20px);
  margin: 10px 0px 10px 0px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.admin-del {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  position: absolute;
  top: 23px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.list-number {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

.list-number2 {
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

.division-name {
  width: calc(100% - 100px);
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

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
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
  margin-top: 4px;
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

:deep(.el-checkbox__input) {
  margin-left: 24px;
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 22px);
    margin: 0px 0px 20px 0px;
  }

  .container2 {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }

  .line {
    display: block;
  }
}
</style>
