<template>
  <el-card>
    <template #header><h3 style="text-align: center; margin: 0">Информация</h3></template>
    <el-form label-width="100px" :model="user">
      <el-form-item prop="email" label="Email">
        {{ user.email }}
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileInfoPage',
  setup() {
    const store = useStore();

    const userId = localStorage.getItem('userId');
    const user = computed(() => store.getters['users/user']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId);
    };
    onMounted(loadUser);

    return {
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
