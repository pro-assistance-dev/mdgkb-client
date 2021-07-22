<template>
  <div class="header-top">
    <div class="container">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="flex">
            <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'HeaderTop',
});
</script>

<style lang="scss" scoped>
.header-logo-img {
  transition: all 0.3s;
}

.header-logo-img:hover {
  cursor: pointer;
  opacity: 0.7;
}

.flex {
  display: flex;
  justify-content: center;
}
</style>
