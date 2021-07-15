<template>
        <el-row class="header-top container">
            <el-col :span="1" :offset="12">
                <img src="@/assets/img/mdgkb-logo.png" class="header-logo-img" @click="$router.push('/')">
            </el-col>
        </el-row>
</template>

<script>

  export default {
    name: "HeaderTop",
  }
</script>

<style lang="scss">
    .header-logo-img {
        transition: all 0.3s;
    }

    .header-logo-img:hover {
        cursor: pointer;
        opacity:0.7;
    }
</style>
