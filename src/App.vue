<template>
  <Suspense>
    <component :is="$route.meta.layout || 'MainLayout'">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

import AdminLayout from '@/views/admin/AdminLayout.vue';
import MainLayout from '@/views/main/MainLayout.vue';

import User from './classes/User';

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
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (userData && token) {
        const user = new User(JSON.parse(userData));
        store.commit('auth/setToken', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };
    onMounted(() => {
      setLocalStorageToVuex();
    });
  },
});
</script>
