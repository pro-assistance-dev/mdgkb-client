<template>
  <el-space alignment="center">
    <label class="el-form-item__label">{{ attributeLabel }}</label>
    <div class="add-button">
      <el-button size="mini" @click.prevent="addRow">+</el-button>
    </div>
  </el-space>

  <el-table :data="sideOrganization?.contactInfo[listName]">
    <el-table-column :label="columnValueLabel">
      <template #default="scope">
        <!-- <el-form-item :prop="sideOrganization?.contactInfo[listName][scope.$index][propertyValueName]" :rules="rules">
          <el-input v-model="sideOrganization.contactInfo[listName][scope.$index][propertyValueName]" />
        </el-form-item> -->
        <el-form-item :prop="sideOrganization?.contactInfo[listName][scope.$index][propertyValueName]">
          <el-input v-model="sideOrganization.contactInfo[listName][scope.$index][propertyValueName]" />
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="Описание">
      <template #default="scope">
        <el-form-item :prop="sideOrganization?.contactInfo[listName][scope.$index].description">
          <el-input v-model="sideOrganization.contactInfo[listName][scope.$index].description" />
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="removeRow(scope.$index)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

import Email from '@/classes/contacts/Email';
import PostAddress from '@/classes/contacts/PostAddress';
import TelephoneNumber from '@/classes/contacts/TelephoneNumber';
import Website from '@/classes/contacts/Website';

import EmailRules from '@/classes/contacts/EmailRules';
import PostAddressRules from '@/classes/contacts/PostAddressRules';
import TelephoneNumberRules from '@/classes/contacts/TelephoneNumberRules';
import WebsiteRules from '@/classes/contacts/WebsiteRules';

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

<style lang="scss">
.add-button {
  padding-bottom: 10px;
}
</style>
