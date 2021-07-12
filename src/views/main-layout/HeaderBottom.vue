<template>
<el-row class="header-bottom container">
<el-col :span="6"></el-col>
<el-col :span="8">
    <el-menu
            class="header-bottom-menu"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
            >
        <el-menu-item  class="header-bottom-menu-item" index="1" :route="{ name: 'News' }">Новости</el-menu-item>
        <el-submenu index="2" popper-class="popper-class-custom">
            <template #title><span class="header-bottom-menu-item">Пациентам</span></template>
            <div class="gridcontainer">
                <div class="grid" id="services_grid">
                    <template v-for="item in items" :key="item.id">
                        <MenuTileX :item="item"  />
                    </template>
                </div>
            </div>
        </el-submenu>
        <el-menu-item  class="header-bottom-menu-item" :route="{ name: 'AboutPage' }" index="3">О нас</el-menu-item>
    </el-menu>
</el-col>
</el-row>
</template>

<script lang="ts">
    import {ref } from 'vue';
    import IMenuItem from "@/interfaces/IMenuItem";
    import MenuTileX from "@/views/main-layout/elements/MenuTileX.vue";
    export default {
        name: "HeaderBottom",
        components: {
            MenuTileX
        },
        setup() {
            let expand = ref(false)
            const items: IMenuItem[] = [
                // {id: "01", label: "Диагностика", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/divisions/konsultativno-diagnosticheskij-centr"},
                // {id: "02",label: "Платные медицинские услуги", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                // {id: "03",label: "Госпитализация", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/hospitalization"},
                {id: "04",label: "Амбулаторно-поликлиническая помощь", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                // {id: "05",label: "Информация для Доноров крови", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                {id: "06",label: "Просветительский проект СтопКома", description:"", to:"/stop-coma"},
                // {id: "07",label: "Подготовка к исследованиям", description: 'Подготовка к исследованиям', to:"/preparation"},
                {id: "08",label: "Диспансеризация населения", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/dispanserization"},
                {id: "09",label: "Сведения об организациях в сфере охраны здоровья", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/health_organizations"},
                {id: "10",label: "Нормативные документы", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/normative_documents"},
                // {id: "11",label: "Школа для родителей пациентов с муковисцидозом", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/events/shkola-dlya-roditelej-pacientov-s-mukoviscidozom"},
                // {id: "12",label: "Запрос копии документа", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/document_request"},
            ]
            return {
                expand,
                items,
            };
        },
  }
</script>
<style scoped lang="scss">


</style>
