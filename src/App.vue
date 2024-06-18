<template>
  <PNotification />
  <PDialog />
  <PLoader v-if="PHelp.Loading().IsVisible()" />
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

import AdminLayout from '@/views/adminLayout/AdminLayout.vue';
import MainLayout from '@/views/mainLayout/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    AdminLayout,
  },
  setup() {
    const auth: ComputedRef<Auth<User>> = computed(() => Provider.store.getters['auth/auth']);
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

    onBeforeMount(async (): Promise<void> => {
      auth.value.actualize();
      changeDocumentTitle();
      mounted.value = true;
    });

    return {
      mounted,
    };
  },
});
</script>
