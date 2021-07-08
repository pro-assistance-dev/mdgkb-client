<template>
  <div id="app" >
      <HeaderTop></HeaderTop>
      <HeaderBottom></HeaderBottom>
      <el-row class="container">
<el-col :span="6">

      <el-aside width="200px">Aside</el-aside>
</el-col>
          <el-col :span="18">

        <el-main><ParentComponent msg="Текст из layout" /></el-main>
          </el-col>
      </el-row>
      <FooterTop/>
    <FooterBottom/>

  </div>
</template>

<script lang="ts">
import ParentComponent from '../../components/ParentComponent.vue';
import HeaderTop from "@/views/main-layout/HeaderTop.vue";
import HeaderBottom from "@/views/main-layout/HeaderBottom.vue";
import FooterTop from "@/views/main-layout/FooterTop.vue";
import FooterBottom from "@/views/main-layout/FooterBottom.vue";

export default {
  name: 'MainLayout',
  components: {
    FooterBottom,
    FooterTop,
    HeaderBottom,
    HeaderTop,
    ParentComponent,
  },
};
</script>
