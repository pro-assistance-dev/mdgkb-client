<template>
  <div class="hidden-md-and-up drawer-container">
    <el-drawer v-model="isDrawerOpen" custom-class="admin-drawer" :size="'auto'" direction="ltr" :with-header="false" @closed="closeDrawer">
      <AdminSideMenu />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminMenuDrawer',
  components: { AdminSideMenu },

  setup() {
    const store = useStore();
    const isDrawerOpen = computed(() => store.getters['admin/isDrawerOpen']);
    const closeDrawer = () => store.commit('admin/closeDrawer');

    return { isDrawerOpen, closeDrawer };
  },
});
</script>

<style lang="scss" scoped>
$header-background-color: whitesmoke;

:deep(.admin-drawer) {
  background-color: $header-background-color;
}

.drawer-container {
  height: 100%;
}
</style>
