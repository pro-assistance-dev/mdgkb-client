<template>
  <h3 style="text-align: center; margin: 0">Профиль</h3>
  <el-button @click="save">Сохранить</el-button>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IUser from '@/interfaces/IUser';

export default defineComponent({
  name: 'ProfileHeader',
  components: {},
  setup() {
    const store = useStore();

    const user: Ref<IUser> = computed(() => store.getters['users/item']);

    const save = async () => {
      await store.dispatch('users/update', user);
    };

    return {
      save,
    };
  },
});
</script>

<style scoped lang="scss"></style>
