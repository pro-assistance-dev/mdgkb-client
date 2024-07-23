<template>
  <div class="style-container">
    <el-config-provider :locale="ru">
      <el-date-picker v-model="date" type="date" format="DD.MM.YYYY" :placeholder="placeholder" @change="changeHandler" />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus';
import ru from 'element-plus/es/locale/lang/ru';
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
export default defineComponent({
  name: 'DatePicker',
  components: { ElConfigProvider },
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Выберите дату',
    },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const date: Ref<Date> = ref(new Date());
    const changeHandler = (value: Date) => {
      const date = new Date(value);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      emit('update:modelValue', new Date(date.getTime() - userTimezoneOffset));
      emit('change');
      console.log('value', value);
    };
    onBeforeMount(() => {
      date.value = props.modelValue;
    });

    return {
      ru,
      date,
      changeHandler,
    };
  },
});
</script>
