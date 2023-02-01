<template>
  <Suspense>
    <component :is="$route.meta.layout || 'MainLayout'" v-if="mounted">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/runtime-core';
import { onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import TokenService from '@/services/Token';
import AdminLayout from '@/views/admin/AdminLayout.vue';
import MainLayout from '@/views/main/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    AdminLayout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    watch(route, () => {
      changeDocumentTitle();
    });

    const changeDocumentTitle = () => {
      const defaultTitle = 'Морозовская детская городская клиническая больница';
      document.title = route.meta.title ? `${route.meta.title} | МДГКБ` : defaultTitle;
    };

    // TODO безопасно ли это?
    const setLocalStorageToVuex = () => {
      const user = TokenService.getUser();
      const token = TokenService.getAccessToken();
      if (user && token) {
        store.commit('auth/setTokens', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };

    onBeforeMount(async (): Promise<void> => {
      changeDocumentTitle();
      await store.dispatch('meta/getSchema');
      await store.dispatch('search/searchGroups');
      setLocalStorageToVuex();
      mounted.value = true;
    });

    // onMounted(() => {
    //
    // });

    return {
      mounted,
    };
  },
});
</script>
