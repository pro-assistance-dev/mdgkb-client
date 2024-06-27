<template>
  <div style="min-height: 100vh">
    <KeepAlive :include="[]" :max="0">
      <div class="bg">
        <div class="admin-main-container">
          <AdminSideMenu2 :border="false" />
          <div class="admin-container">
            <AdminHeaderBottom2 style="position: sticky; z-index: 2" />
            <slot />
          </div>
        </div>
      </div>
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.admin-main-container {
  display: flex;
  justify-content: left;
  height: 100vh;
  box-sizing: border-box;
}

.admin-container {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}

.bg {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
}
</style>
