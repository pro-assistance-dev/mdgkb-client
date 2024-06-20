<template>
  <div>
    <KeepAlive :include="[]" :max="0">
      <div>
        <AdminHeaderTop2 />
        <div class="admin-main-container">
          <AdminSideMenu2 />
          <div class="admin-container">
            <AdminHeaderBottom2 style="position: sticky; z-index: 2" />
            <div style="height: inherit">
              <slot />
            </div>
          </div>
        </div>
        <AdminMenuDrawer2 />
      </div>
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.admin-main-container {
  height: calc(100vh - 61px);
}
.admin-container {
  height: calc(100vh - 121px);
  width: 100%;
}

</style>
