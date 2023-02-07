<template>
  <el-card style="margin-bottom: 20px">
    <div class="flex-between">
      <label class="el-form-item__label">Телефоны</label>
      <div class="add-button">
        <el-button type="success" size="mini" @click.prevent="contactInfo.addTelephoneNumber()"> Добавить </el-button>
      </div>
    </div>

    <el-table :data="contactInfo.telephoneNumbers" cell-class-name="cell-style">
      <el-table-column label="Телефоны">
        <template #default="scope">
          <el-form-item>
            <el-input v-model="contactInfo.telephoneNumbers[scope.$index].number" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Описание">
        <template #default="scope">
          <el-form-item>
            <el-input v-model="contactInfo.telephoneNumbers[scope.$index].description" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            @remove="$classHelper.RemoveFromClassByIndex(scope.$index, contactInfo.telephoneNumbers, contactInfo.telephoneNumbersForDelete)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card style="margin-bottom: 20px">
    <div class="flex-between">
      <label class="el-form-item__label">Email</label>
      <div class="add-button">
        <el-button type="success" size="mini" @click.prevent="contactInfo.addEmail()"> Добавить </el-button>
      </div>
    </div>

    <el-table :data="contactInfo.emails" cell-class-name="cell-style">
      <el-table-column label="Email">
        <template #default="scope">
          <el-form-item>
            <el-input v-model="contactInfo.emails[scope.$index].address" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Описание">
        <template #default="scope">
          <el-form-item>
            <el-input v-model="contactInfo.emails[scope.$index].description" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            @remove="$classHelper.RemoveFromClassByIndex(scope.$index, contactInfo.emails, contactInfo.emailsForDelete)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IContactInfo from '@/interfaces/contacts/IContactInfo';

export default defineComponent({
  name: 'AdminContactInfo',
  components: { TableButtonGroup },
  props: {
    storeModule: { type: String as PropType<string>, required: true },
    storeGetter: { type: String as PropType<string>, required: true, default: 'item' },
  },
  setup(props) {
    const store = useStore();
    const contactInfo: WritableComputedRef<IContactInfo> = computed(
      () => store.getters[`${props.storeModule}/${props.storeGetter}`].contactInfo
    );
    return {
      contactInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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

.title-in {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}

.container {
  position: relative;
  width: calc(100% - 62px);
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

.column-item3:first-child {
  width: 50%;
  margin-left: 0px;
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

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
}

.title2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #303133;
}

.certification {
  padding: 0 10px;
  margin-bottom: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
}

.accreditation {
  padding: 0 10px;
  margin-top: 10px 0;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
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
  .bottom-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
  }

  .background-container {
    margin: 0 10px 20px 10px;
  }
}

.el-form-item {
  margin: 0;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
