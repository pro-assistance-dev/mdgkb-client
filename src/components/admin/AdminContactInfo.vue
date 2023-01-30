<template>
  <el-card style="margin-bottom: 20px">
    <div class="flex-between">
      <label class="el-form-item__label">Телефоны</label>
      <div class="add-button">
        <el-button
          type="success"
          size="mini"
          @click.prevent="contactInfo.addTelephoneNumber()"
        >
          Добавить
        </el-button>
      </div>
    </div>

    <el-table
      :data="contactInfo.telephoneNumbers"
      cell-class-name="cell-style"
    >
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

      <el-table-column
        width="50"
        fixed="right"
        align="center"
      >
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
        <el-button
          type="success"
          size="mini"
          @click.prevent="contactInfo.addEmail()"
        >
          Добавить
        </el-button>
      </div>
    </div>

    <el-table
      :data="contactInfo.emails"
      cell-class-name="cell-style"
    >
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

      <el-table-column
        width="50"
        fixed="right"
        align="center"
      >
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
import { computed, defineComponent, PropType, Ref, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IHuman from '@/interfaces/IHuman';

export default defineComponent({
  name: 'AdminContactInfo',
  components: { TableButtonGroup },
  props: {
    storeModule: { type: String as PropType<string>, required: true },
    storeGetter: { type: String as PropType<string>, required: true, default: 'item' },
  },
  setup(props) {
    const store = useStore();
    const human: Ref<IHuman> = computed(() => store.getters[`${props.storeModule}/item`].human);
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
.el-form-item {
  margin: 0;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
