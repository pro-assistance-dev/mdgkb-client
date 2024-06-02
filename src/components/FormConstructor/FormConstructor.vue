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
      <el-table-column label="Название поля формы" width="300px" sortable>
        <template #default="scope">
          <el-form-item :prop="'fields.' + scope.$index + '.name'" :rules="rules.name" style="margin: 0">
            <el-input v-model="scope.row.name" placeholder="Имя поля" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Код формы" width="150px" sortable>
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-input v-model="scope.row.code" placeholder="Код формы" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Комментарий" width="300px" sortable>
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-input v-model="scope.row.comment" placeholder="Комментарий" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column v-if="!filesOnly" label="Тип данных" sortable width="300px">
        <template #default="scope">
          <el-form-item :prop="'fields.' + scope.$index + '.valueType.id'" style="margin: 0" :rules="rules.valueType">
            <el-select v-model="scope.row.valueType" value-key="id" label="Тип данных"
              @change="changeHandler(scope.row)">
              <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Образец" width="300px" sortable>
        <template #default="scope">
          <el-form-item style="margin: 0">
            <FileUploader :file-info="scope.row.file" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Обязательное" width="150px" align="center">
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-checkbox v-model="scope.row.required"></el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Обязательное для отмены" width="150px" align="center">
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-checkbox v-model="scope.row.requiredForCancel"></el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Маска" width="150px" align="center">
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-input v-model="scope.row.mask" placeholder="Маска" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Токены для маски" width="600px" align="center">
        <template #default="scope">
          <el-form-item style="margin: 0">
            <el-button size="mini" @click="scope.row.addMaskToken()">Добавить</el-button>
            <div v-for="(item, i) in scope.row.maskTokens" :key="i" class="maska-row">
              <el-input v-model="item.name" size="mini" placeholder="Имя токена" />
              <el-input v-model="item.pattern" size="mini" placeholder="Паттерн" />
              <el-checkbox v-model="item.uppercase"></el-checkbox>
              <TableButtonGroup :show-remove-button="true" @remove="scope.row.removeMaskToken(i)" />
            </div>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="form.removeField(scope.$index)" />
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
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Field from '@/classes/Field';
import Form from '@/classes/Form';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import FileUploader from '@/components/FileUploader.vue';
import ValueType from '@/services/classes/ValueType';

export default defineComponent({
  name: 'FormConstructor',
  components: { FileUploader, TableMover, TableButtonGroup },
  props: {
    form: {
      type: Object as PropType<Form>,
      required: true,
    },
    filesOnly: {
      type: Boolean,
      dafault: false,
    },
  },
  setup(props) {
    const store = useStore();
    const valueTypes: Ref<ValueType[]> = computed(() => store.getters['valueTypes/items']);
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
    const rules = ref({
      name: [{ required: true, message: 'Необходимо указать название поля формы', trigger: 'blur' }],
      valueType: [{ required: true, message: 'Необходимо выбрать тип данных поля формы', trigger: 'change' }],
    });

    onBeforeMount(async () => {
      await store.dispatch('valueTypes/getAll');
    });

    const changeHandler = (field: Field) => {
      if (field.valueType.id) {
        field.valueTypeId = field.valueType.id;
      }
    };

    return { valueTypes, changeHandler, addField, rules };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

.maska-row {
  display: flex;
  margin: 5px;
  align-items: center;

  .el-input {
    margin: 0 5px;
  }
}

:deep(.el-form-item__content) {
  margin-bottom: 20px;
}
</style>
