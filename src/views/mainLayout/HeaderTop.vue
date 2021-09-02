<template>
  <div class="header-top">
    <div class="container">
      <el-row>
        <el-col :offset="11" :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
          <div class="flex">
            <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')" />
          </div>
        </el-col>
        <el-col
          :xs="{ span: 1, offset: 6 }"
          :sm="{ span: 1, offset: 7 }"
          :md="{ span: 1, offset: 8 }"
          :xl="{ span: 1, offset: 9 }"
          :lg="{ span: 1, offset: 9 }"
        >
          <LoginDropdownMenu :show-button-name="true" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoginDropdownMenu from '@/views/mainLayout/elements/LoginDropdownMenu.vue';

export default defineComponent({
  name: 'HeaderTop',
  components: { LoginDropdownMenu },
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

.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
