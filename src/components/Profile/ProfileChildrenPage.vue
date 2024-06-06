<template>
  <el-card v-if="user">
    <template #header>
      <h3 style="text-align: center; margin: 0">Профиль</h3>
      <el-button @click="save">Сохранить</el-button>
    </template>
    <el-form label-width="100px" :model="user">
      <el-button @click="user.addChild()">Добавить ребёнка</el-button>
      <el-card v-for="(child, i) in user.children" :key="i">
        <el-button @click="user.removeChild(i)">Удалить ребёнка</el-button>
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
      </el-card>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref } from 'vue';
import { useStore } from 'vuex';

import User from '@/classes/User';

export default defineComponent({
  name: 'ProfileChildrenPage',
  setup() {
    const store = useStore();

    const userId: ComputedRef<string> = computed(() => store.getters['auth/user']?.id);
    const user: Ref<User> = computed(() => store.getters['users/item']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId.value);
    };
    onMounted(loadUser);

    const save = async () => {
      await store.dispatch('users/update', user.value);
    };

    return {
      user,
      save,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
</style>
