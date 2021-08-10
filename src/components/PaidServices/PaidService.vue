<template>
  <el-collapse-item :name="title">
    <template #title>
      <h2 class="collapseHeader">{{ title }}</h2>
    </template>
    <el-table
      ref="table"
      :data="servicesFilter()"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
      row-key="code"
      @select="$emit('selectService', $event)"
      @selection-change="$emit('selectService', $event)"
    >
      <el-table-column :reserve-selection="true" type="selection" width="55" />
      <el-table-column label="Код" prop="code" width="200" resizable>
        <template #header>
          <el-input v-model="codeFilter" size="mini" placeholder="Введите код" />
        </template>
      </el-table-column>
      <el-table-column label="Наименование" prop="name" width="500" resizable>
        <template #header>
          <el-input v-model="nameFilter" size="mini" placeholder="Введите наименование" />
        </template>
      </el-table-column>
      <el-table-column label="Цена" prop="price" width="200" resizable />
      <el-table-column label="Продолжительность" sortable prop="duration" width="200" resizable>
        <template #default="scope">
          <div>{{ scope.row.duration }} рабочий день(дня)</div>
        </template>
      </el-table-column>
    </el-table>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import IPaidService from '@/interfaces/IPaidService';

export default defineComponent({
  name: 'PaidService',
  props: {
    services: {
      type: Array as PropType<Array<IPaidService>>,
      required: true,
    },
    title: {
      type: String,
    },
  },
  async setup(props) {
    let sum = ref(0);
    let codeFilter = ref('');
    let nameFilter = ref('');
    const table = ref();

    const servicesFilter = (): IPaidService[] => {
      let filteredServices = props.services.filter((service: IPaidService) => service.code.includes(codeFilter.value));
      filteredServices = filteredServices.filter((service: IPaidService) => service.name.includes(nameFilter.value));
      return filteredServices;
    };

    const clearSelection = () => {
      table.value.clearSelection();
    };

    return {
      clearSelection,
      table,
      servicesFilter,
      nameFilter,
      codeFilter,
      sum,
    };
  },
});
</script>

<style scoped>
.collapseHeader {
  padding-left: 10px;
}

.el-collapse-item {
  background-color: white;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
:deep(.el-collapse-item__header, .el-collapse-item__wrap) {
  border: none;
}
</style>
