<template>
  <Suspense>
    <component :is="$route.meta.layout || 'MainLayout'">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/runtime-core';
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

import TokenService from '@/services/Token';
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
      const token = TokenService.getAccessToken();
      if (userData && token) {
        const user = new User(JSON.parse(userData));
        store.commit('auth/setToken', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('meta/getSchema');
    });

    onMounted(() => {
      setLocalStorageToVuex();
    });
  },
});
</script>
