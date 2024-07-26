<template>
  <el-form v-if="mounted">
    <el-form-item label="Фамилия">
      <el-input v-model="child.human.surname"></el-input>
    </el-form-item>
    <el-form-item label="Имя">
      <el-input v-model="child.human.name"></el-input>
    </el-form-item>
    <el-form-item label="Отчество">
      <el-input v-model="child.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Пол">
      <el-select v-model="child.human.isMale" placeholder="Выберите пол">
        <el-option label="Мужчина" :value="true"></el-option>
        <el-option label="Женщина" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения">
      <DatePicker v-model="child.human.dateBirth" />
    </el-form-item>
    <el-button @click="addChild">Добавить</el-button>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Child from '@/classes/Child';

export default defineComponent({
  name: 'ChildForm',
  emits: ['createChild'],
  setup() {
    const mounted: Ref<boolean> = ref(false);
    const child = new Child();
    onBeforeMount(() => {
      mounted.value = true;
    });

    const addChild = async (): Promise<void> => {
      // child.value.userId = user.value.id;
      // emit('createChild', child.value);
    };

    return {
      mounted,
      child,
      addChild,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.middle-header {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
}

.center-button {
  margin-top: 10px;
  text-align: center;
}
.green-button {
  background: #31af5e;
  color: white;
  &:hover {
    background: darken(#31af5e, 5%);
    color: white;
  }
}

.card-item {
  margin-top: 10px;
}
.flex-row {
  justify-content: space-between;
}
.calendar-zone {
  width: 450px;
}

.form {
  width: 400px;
  height: 100%;
  margin-right: 20px;
}

.gray-border {
  border: 1px solid #f0f2f7;
}
.appointment-container {
  display: flex;
  justify-content: space-between;
}

.white-block {
}
</style>
