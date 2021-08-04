<template>
  <Suspense>
    <component :is="$route.meta.layout || 'MainLayout'">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import MainLayout from '@/views/main/MainLayout.vue';
import AdminLayout from '@/views/admin/AdminLayout.vue';
import { defineComponent, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    AdminLayout,
  },
  setup() {
    const store = useStore();
    // TODO безопасно ли это?
    const setLocalStorageToVuex = () => {
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');
      if (userId && userEmail && token) {
        const user = {
          id: userId,
          email: userEmail,
        };
        store.commit('auth/setToken', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };
    onMounted(setLocalStorageToVuex);
  },
});
</script>
