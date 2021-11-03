<template>
  <el-card v-if="mounted">
    <template #header><h3 style="text-align: center; margin: 0">Информация</h3></template>
    <el-form label-width="100px" :model="user">
      <el-form-item prop="email" label="Email">
        {{ user.email }}
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileInfoPage',
  setup() {
    const store = useStore();
    const mounted = ref(false);
    const userId = localStorage.getItem('userId');
    const user = computed(() => store.getters['users/item']);

    const loadUser = async () => {
      await store.dispatch('users/get', userId);
      mounted.value = true;
    };
    onMounted(loadUser);

    return {
      mounted,
      user,
    };
  },
});
</script>

<style scoped lang="scss"></style>
