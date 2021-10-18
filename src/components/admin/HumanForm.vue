<template>
  <el-form-item label="Фамилия" prop="human.surname">
    <el-input v-model="human.surname"></el-input>
  </el-form-item>
  <el-form-item label="Имя" prop="human.name">
    <el-input v-model="human.name"></el-input>
  </el-form-item>
  <el-form-item label="Отчество" prop="human.patronymic">
    <el-input v-model="human.patronymic"></el-input>
  </el-form-item>
  <el-form-item label="Пол" prop="human.isMale">
    <el-select v-model="human.isMale" placeholder="Выберите пол">
      <el-option label="Мужчина" :value="true"></el-option>
      <el-option label="Женщина" :value="false"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Дата рождения" prop="human.dateBirth">
    <el-date-picker v-model="human.dateBirth" type="date" format="DD.MM.YYYY" placeholder="Выберите дату"></el-date-picker>
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HumanForm',
  components: {},
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const form = ref();

    const human = computed(() => store.getters[`${props.storeModule}/human`]);

    return {
      human,
      form,
    };
  },
});
</script>
