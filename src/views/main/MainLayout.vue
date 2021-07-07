<template>
  <div id="app">

  <el-container>
    <el-header>
      <HeaderTop></HeaderTop>
      <HeaderBottom></HeaderBottom>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main><ParentComponent msg="Текст из layout" /></el-main>
      </el-container>
    </el-container>
        <el-footer>Footer</el-footer>
  </el-container>
  </div>
</template>

<script lang="ts">
import ParentComponent from '../../components/ParentComponent.vue';
import HeaderTop from "@/views/main-layout/HeaderTop.vue";
import HeaderBottom from "@/views/main-layout/HeaderBottom.vue";

export default {
  name: 'MainLayout',
  components: {
    HeaderBottom,
    HeaderTop,
    ParentComponent,
  },
};
</script>
