<template>
  <div style="min-height: 100vh">
    <AdminHeaderTop @collapse="collapse" />
    <div class="admin-main-container">
      <AdminSideMenu :isCollapse="isCollapse" class="side-menu hidden-sm-and-down" ref="sideMenu" />
      <div class="admin-container">
        <div v-if="error">Ошибка</div>
        <Suspense v-else>
          <template #default>
            <slot />
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminSideMenu,
  },

  setup() {
    const isCollapse = ref(true);

    const collapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    return { isCollapse, collapse };
  },
});
</script>

<style lang="scss" scoped>
.admin-main-container {
  display: flex;
  min-height: calc(100vh - 61px);
}

.admin-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}

// .side-menu {
//   position: fixed;
//   height: 100%;
// }
</style>
