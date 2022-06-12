<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <div>
          <span> Форма </span>
        </div>
        <el-button s size="small" type="success" icon="el-icon-plus" @click="addField">Добавить поле </el-button>
      </div>
    </template>
    <el-table :data="form.fields">
      <el-table-column width="50" fixed="left" align="center">
        <template #default="scope">
          <TableMover :ordered-items="form.fields" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="Название поля формы" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="Имя поля" />
        </template>
      </el-table-column>
      <el-table-column label="Комментарий" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.comment" placeholder="Комментарий" />
        </template>
      </el-table-column>
      <el-table-column v-if="!filesOnly" label="Тип данных" sortable width="300px">
        <template #default="scope">
          <el-select v-model="scope.row.valueType" value-key="id" label="Тип данных" @change="changeHandler(scope.row)">
            <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Образец" sortable>
        <template #default="scope">
          <FileUploader v-if="scope.row.valueType.isFile()" :file-info="scope.row.file" />
          <span v-else>Доступен только для файлов</span>
        </template>
      </el-table-column>
      <el-table-column label="Обязательное" width="150px" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.required"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row v-for="field in form.fields" :key="field">
      <div style="margin: 10px">
        <el-input v-model="field.name" label="Имя поля" />
        <el-select v-model="field.valueType" value-key="id" label="Тип данных" @change="changeHandler(field)">
          <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item"> </el-option>
        </el-select>
        <FileUploader v-if="field.valueType.isFile()" :file-info="field.file" />
      </div>
    </el-row> -->
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import Field from '@/classes/Field';
import ValueType from '@/classes/ValueType';
import TableMover from '@/components/admin/TableMover.vue';
import FileUploader from '@/components/FileUploader.vue';
import IField from '@/interfaces/IField';
import IForm from '@/interfaces/IForm';
import IValueType from '@/interfaces/IValueType';

export default defineComponent({
  name: 'FormConstructor',
  components: { FileUploader, TableMover },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
    filesOnly: {
      type: Boolean,
      dafault: false,
    },
  },
  setup(props) {
    const store = useStore();
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['valueTypes/items']);
    const addField = () => {
      if (props.filesOnly) {
        const fileValueType = valueTypes.value.find((el) => el.isFile());
        const field = new Field();
        field.valueType = new ValueType(fileValueType);
        field.valueTypeId = fileValueType?.id ?? '';
        props.form.addField(field);
      } else {
        props.form.addField();
      }
    };

    onBeforeMount(async () => {
      await store.dispatch('valueTypes/getAll');
    });

    const changeHandler = (field: IField) => {
      if (field.valueType.id) {
        field.valueTypeId = field.valueType.id;
      }
    };

    return { valueTypes, changeHandler, addField };
  },
});
</script>

<style scoped>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timetable-row {
  line-height: 40px;
  height: 40px;
  margin-bottom: 5px;
}
.weekend {
  color: red;
}
:deep(.el-button) {
  padding: 5px;
  margin: 0 !important;
  min-height: unset;
  border: none;
}
.time-select {
  width: 100px;
  margin: 0;
}

.add-break-checkbox {
  margin-left: 10px;
}
</style>
