<template>
  <el-card>
    <template #header>
      <div class="flex-row-between">
        <div>
          <span> Форма </span>
        </div>
        <el-button s size="small" type="success" icon="el-icon-plus" @click="form.addField()">Добавить поле </el-button>
      </div>
    </template>
    <el-row v-for="field in form.fields" :key="field">
      <div style="margin: 10px">
        <el-input v-model="field.name" label="Имя поля" />
        <el-select v-model="field.valueTypeId" label="Тип данных">
          <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </div>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import IForm from '@/interfaces/IForm';
import IValueType from '@/interfaces/IValueType';
export default defineComponent({
  name: 'FormConstructor',
  components: {},
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['valueTypes/items']);

    onBeforeMount(async () => {
      await store.dispatch('valueTypes/getAll');
    });

    return { valueTypes };
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
