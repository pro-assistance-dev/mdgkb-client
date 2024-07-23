<template>
  <el-form ref="form" :model="employee" label-position="top" :rules="rules">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
        <el-container direction="vertical" class="vertical-block">
          <div class="status-panel" :style="collapsed ? 'margin-top: -166px' : 'margin-top: 0'">
            <div v-if="collapsed" class="panel-title" @click.prevent="handClick">Открыть панель управления статусами</div>
            <div v-else class="panel-title" @click.prevent="handClick">Скрыть панель управления статусами</div>
            <div class="panel-body">
              <div class="line">
                <div class="line-item">Статус руководителя:</div>
                <div class="line-item">
                  <div v-if="employee.head" class="yes">ДА</div>
                  <div v-else class="no">НЕТ</div>
                  <button v-if="employee.head" class="revoke" @click.prevent="employee.resetHead()">Отозвать</button>
                  <button v-else class="appoint" @click.prevent="employee.setHead()">Назначить</button>
                </div>
              </div>
              <div class="line">
                <div class="line-item">Статус врача:</div>
                <div class="line-item">
                  <div v-if="employee.doctor" class="yes">ДА</div>
                  <div v-else class="no">НЕТ</div>
                  <button v-if="employee.doctor" class="revoke" @click.prevent="employee.resetDoctor()">Отозвать</button>
                  <button v-else class="appoint" @click.prevent="employee.setDoctor()">Назначить</button>
                </div>
              </div>
            </div>
          </div>
          <div class="background-container2">
            <EmployeeConstructor />
          </div>
          <div v-if="employee.head" class="background-container2">
            <div v-if="employee.head" class="field">Данные статуса руководителя:</div>
            <HeadConstructor v-if="employee.head" />
          </div>
          <div v-if="employee.doctor" class="background-container2">
            <div v-if="employee.doctor" class="field">Данные статуса врача:</div>
            <DoctorConstructor v-if="employee.doctor" />
          </div>
        </el-container>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <el-container direction="vertical">
          <el-card header="Фото">
            <UploderImage :file-info="employee.human.photo" :height="300" @remove-file="employee.human.removePhoto()" />
          </el-card>
          <el-card header="Фото-миниатюра">
            <UploaderImage
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
import Employee from '@/classes/Employee';
import DoctorConstructor from '@/components/admin/AdminEmployees/DoctorConstructor.vue';
import EmployeeConstructor from '@/components/admin/AdminEmployees/EmployeeConstructor.vue';
import HeadConstructor from '@/components/admin/AdminEmployees/HeadConstructor.vue';
import Hooks from '@/services/Hooks/Hooks';

export default defineComponent({
  name: 'AdminEmployeePage',
  components: {
    DoctorConstructor,
    EmployeeConstructor,
    HeadConstructor,
  },
  setup() {
    const form = ref();
    const employee: Employee = EmployeesStore.Item();
    const collapsed: Ref<boolean> = ref(true);

    const handClick = () => {
      collapsed.value = !collapsed.value;
    };

    // Hooks.onBeforeMount(Provider.loadItem, {
    //   adminHeader: {
    //     title: computed(() => (Router.Route().params['id'] ? employee.human?.getFullName() : 'Добавить сотрудника')),
    //     showBackButton: true,
    //     buttons: [{ action: Hooks.submit() }],
    //   },
    // });
    Hooks.onBeforeRouteLeave();

    return {
      employee,
      form,
      handClick,
      collapsed,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$margin: 20px 0;

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: $border-radius;
  border: $normal-darker-border;
}

.background-container2 {
  width: auto;
  padding: 10px 10px 0 10px;
  background: #f1f2f7;
  border-radius: $border-radius;
  border: $normal-darker-border;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 20px;
}

.container {
  position: relative;
  width: calc(100% - 60px);
  margin: 0px 20px 20px 20px;
  border: $normal-darker-border;
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
  color: $base-light-font-color;
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
  color: $base-light-font-color;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.admin-del2 {
  border: none;
  background: inherit;
  color: $base-light-font-color;
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

.vertical-block {
  position: relative;
}

.status-panel {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  background: #dff2f8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0px 10px 0px rgba(0 0 0 / 20%);
  border: $normal-darker-border;
  border-top: none;
  cursor: pointer;
  transition: 0.3s;
}

.appoint {
  height: 24px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: $normal-darker-border;
  border-radius: 20px;
  background: #dff2f8;
  color: #1979cf;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.appoint:hover {
  background: darken($color: #dff2f8, $amount: 10%);
}

.revoke {
  height: 24px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: $normal-darker-border;
  border-radius: 20px;
  background: #f8e8df;
  color: #1979cf;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.revoke:hover {
  background: darken($color: #f8e8df, $amount: 10%);
}

.panel-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 24px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.panel-title:hover {
  color: #1979cf;
}

.panel-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 0px 10px 34px 10px;
}

.line {
  width: calc(100% - 30px);
  height: 60px;
  border: $normal-darker-border;
  border-radius: $border-radius;
  margin: 10px 0 0 0;
  padding: 0px 15px 5px 15px;
  background: #f1f2f7;
}

.line-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.yes {
  font-size: 14px;
  color: $site_green;
}

.no {
  font-size: 14px;
  color: $main_red;
}

.field {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 18px;
  color: #09a248;
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
    color: $base-light-font-color;
    transition: 0.3s;
    cursor: pointer;
    padding: 1px 0px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }
}
</style>
