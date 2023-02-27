<template>
  <el-card style="margin-bottom: 20px">
    <div class="flex-between">
      <label class="el-form-item__label">{{ attributeLabel }}</label>
      <div class="add-button">
        <el-button type="success" size="mini" @click.prevent="addRow">Добавить</el-button>
      </div>
    </div>

    <el-table :data="sideOrganization?.contactInfo[listName]" cell-class-name="cell-style">
      <el-table-column :label="columnValueLabel">
        <template #default="scope">
          <el-form-item :prop="'contactInfo.' + listName + '.' + scope.$index + '.' + propertyValueName" :rules="rules">
            <el-input v-model="sideOrganization.contactInfo[listName][scope.$index][propertyValueName]" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Описание">
        <template #default="scope">
          <el-form-item :prop="'contactInfo.' + listName + '.' + scope.$index + '.' + description">
            <el-input v-model="sideOrganization.contactInfo[listName][scope.$index].description" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeRow(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import Email from '@/services/classes/Email';
import EmailRules from '@/services/classes/EmailRules';
import PostAddress from '@/services/classes/PostAddress';
import PostAddressRules from '@/services/classes/PostAddressRules';
import TelephoneNumber from '@/services/classes/TelephoneNumber';
import TelephoneNumberRules from '@/services/classes/TelephoneNumberRules';
import Website from '@/services/classes/Website';
import WebsiteRules from '@/services/classes/WebsiteRules';

export default defineComponent({
  name: 'AdminContactAttribute',
  components: { TableButtonGroup },
  props: {
    attributeLabel: { type: String as PropType<string>, required: true },
    columnValueLabel: { type: String as PropType<string>, required: true },
    listName: {
      type: String as PropType<'emails' | 'postAddresses' | 'telephoneNumbers' | 'websites'>,
      required: true,
    },
    propertyValueName: { type: String as PropType<string>, required: true },
  },
  setup(props) {
    const store = useStore();

    const sideOrganization: WritableComputedRef<ISideOrganization> = computed({
      get(): ISideOrganization {
        return store.getters['sideOrganizations/sideOrganization'];
      },
      set(organization: ISideOrganization): void {
        store.commit('sideOrganizations/set', organization);
      },
    });

    const rules = computed(() => {
      if (props.listName === 'emails') {
        return EmailRules;
      }
      if (props.listName === 'postAddresses') {
        return PostAddressRules;
      }
      if (props.listName === 'telephoneNumbers') {
        return TelephoneNumberRules;
      }
      if (props.listName === 'websites') {
        return WebsiteRules;
      }

      return undefined;
    });

    const addRow = () => {
      if (!sideOrganization?.value?.contactInfo || !props.listName) {
        return;
      }
      if (props.listName === 'emails') {
        sideOrganization.value.contactInfo.emails?.push(new Email());
      }
      if (props.listName === 'postAddresses') {
        sideOrganization.value.contactInfo.postAddresses?.push(new PostAddress());
      }
      if (props.listName === 'telephoneNumbers') {
        sideOrganization.value.contactInfo.telephoneNumbers?.push(new TelephoneNumber());
      }
      if (props.listName === 'websites') {
        sideOrganization.value.contactInfo.websites?.push(new Website());
      }
    };

    const removeRow = (index: number) => {
      if (!sideOrganization?.value?.contactInfo || !props.listName) {
        return;
      }
      if (props.listName === 'emails') {
        sideOrganization.value.contactInfo?.emails?.splice(index, 1);
      }
      if (props.listName === 'postAddresses') {
        sideOrganization.value.contactInfo?.postAddresses?.splice(index, 1);
      }
      if (props.listName === 'telephoneNumbers') {
        sideOrganization.value.contactInfo?.telephoneNumbers?.splice(index, 1);
      }
      if (props.listName === 'websites') {
        sideOrganization.value.contactInfo?.websites?.splice(index, 1);
      }
    };

    return {
      rules,
      sideOrganization,
      addRow,
      removeRow,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
