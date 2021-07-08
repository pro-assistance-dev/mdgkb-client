<template>
<el-row class="header-bottom container">
<el-col :span="6"></el-col>
<el-col :span="8">
    <el-menu
            class="header-bottom-menu"
            mode="horizontal"
            @select="handleSelect"
            >
        <el-menu-item  class="header-bottom-menu-item" index="1">Новости</el-menu-item>
        <el-submenu class="header-bottom-menu-item" index="2">
            <template #title>Пациентам</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-submenu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</el-col>
</el-row>
</template>

<script>
  export default {
    name: "HeaderBottom",
  }
</script>
