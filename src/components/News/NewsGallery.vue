<template>
  <div class="gallery-container">
    <el-carousel :interval="4000" indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item"> </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsGallery',
});
</script>

<style lang="scss" scoped>
.gallery-container {
  margin-top: 30px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
