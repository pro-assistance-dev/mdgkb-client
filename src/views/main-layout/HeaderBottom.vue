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
        <el-submenu index="2" >
            <template #title><span class="header-bottom-menu-item">Пациентам</span></template>
            <div class="gridcontainer">
                <div class="grid" id="services_grid">
                    <template v-for="(item,key) in items" :key="key">
                        <div id="item" @click.stop="(!expand?$emit('done'):null),expand = !expand" :class="`${expand?'active':''} ff${pad(key + 1)}`">
                        <div id="inner">
                            <img id="bg" :src="require(`../../assets/img/services-menu/banner/${pad(key+1)}.png`)"/>
                            <div id="icon">
                                <Component :is="require(`../../assets/img/services-menu/icon/${pad(key + 1)}.svg`).default"></Component>
                            </div>
                            <div id="label">
                                {{item.label}}
                            </div>
                            <div id="description">
                                {{item.description}}
                            </div>

                            <div id="actions">
                                <nuxt-link :to="item.to" @click.native="$emit('kill')" class="button rounded-all-30 is-outlined" style="background: transparent">Подробнее</nuxt-link>
                            </div>
                        </div>
                        </div>
                    </template>
                </div>
            </div>
        </el-submenu>
    </el-menu>
</el-col>
</el-row>
</template>

<script lang="ts">
    import {ref } from 'vue';
    import IMenuItem from "@/interfaces/IMenuItem";
    export default {
        name: "HeaderBottom",
        components: {
        },
        setup() {
            let expand = ref(false)
            const items: IMenuItem[] = [
                {label: "Диагностика", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/divisions/konsultativno-diagnosticheskij-centr"},
                {label: "Платные медицинские услуги", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                {label: "Госпитализация", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/hospitalization"},
                {label: "Амбулаторно-поликлиническая помощь", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                {label: "Информация для Доноров крови", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
                {label: "Просветительский проект СтопКома", description:"", to:"/stop-coma"},
                {label: "Подготовка к исследованиям", description: 'Подготовка к исследованиям', to:"/preparation"},
                {label: "Диспансеризация населения", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/dispanserization"},
                {label: "Сведения об организациях в сфере охраны здоровья", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/health_organizations"},
                {label: "Нормативные документы", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/normative_documents"},
                {label: "Школа для родителей пациентов с муковисцидозом", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/events/shkola-dlya-roditelej-pacientov-s-mukoviscidozom"},
                {label: "Запрос копии документа", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/document_request"},
            ]

            const getImgUrl = (png: string): string => {
                return require(`../../assets/img/services-menu/banner/${png}.png`)
                // let images = require.context('@/assets/services-menu/banner/', false, /\.png$/)
                // return images('./' + png + ".png")
            }

            const pad = (num: number):string => {
                return String(num).padStart(2, '0');
            }
            return {
                getImgUrl,
                expand,
                items,
                pad,
            };
        },
  }
</script>
<style scoped>
    .el-submenu > .el-menu {
        width: 600px;
        height: 600px;
        left: initial !important;
        right: 0;
        background: #9fc438;
    }


    #mdgkb_megamenu {
        position: absolute;
        z-index: 50;
        width: 100%;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 32px;
    }

    .grid.aside{
        display: block;
    }

    .hide-card .card-content{
        padding: 0;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 32px;
    }

    .grid.aside{
        display: block;
    }

    .hide-card .card-content{
        padding: 0;
    }

    #item {
        background-size: cover;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        max-width: 144px;
        max-height: 144px;
        background-color: rgba(240, 242, 247, 1);
        cursor: pointer;
    }

    #item.aside{
        width: 100%;
        max-width: 100%;
        display: block;
        margin-bottom: 6px;
    }

    #item.active {
        grid-row: 3 / 1;
        grid-column: 4 / 1;
        max-width: 100%;
        max-height: 100%;
    }

    #bg {
        width: 500px;
        max-width: 500px;
        height: 320px!important;
        max-height: 320px;
        position: absolute;
        left:0;
        top:0;
        opacity: 0;
        transition: opacity 1s;
    }

    #item.active #bg{
        opacity: 1;
    }


    #inner {
        padding: 15px;
        height: 100%;

    }

    #icon {
        position: relative;
        z-index: 0;
    }

    #icon svg {
        width: 32px;
    }

    #label{
        height: 76px;
        width: 100px;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: -0.5px;
        display: flex;
        align-items: flex-end;
        transition: all 1s;
        transform: scale(1) translate(0, 0);
        transform-origin: 0 0;
    }

    #item.active #label{
        bottom: 75%;
        width: 312px;
        transform: scale(1.5) translate(0, -35px);
        color:#fff;
    }

    #description{
        overflow: hidden;
        width: 270px;
        font-size: 80%;
        font-style: italic;
        transform: scale(1) translate(0, 50px);
        transition: all 1.5s ease-out;
        transform-origin: 0 0;

    }

    #item.active #description{
        transform: scale(1) translate(0, 0px);
        color:#fff;
    }

    #actions{
        overflow: hidden;
        width: 420px;
        transform: scale(1) translate(0, 50px);
        transition: all 1s;
        transform-origin: 0 0;
    }

    #item.active #actions{
        transform: scale(1) translate(0, 30px);
        color:#fff;
    }

    #item #actions a{
        color:#fff;
    }

    #item.active #icon svg path,#item.active #icon svg circle{
        transition: fill 1s;
    }

    #item.active #icon svg path,#item.active #icon svg circle{
        fill: #ffffff;
    }

    .ff01 svg path, .ff01 svg circle{
        fill: #6201e9;
    }
    .ff02 svg path, .ff02 svg circle{
        fill: #ee7d9e;
    }
    .ff03 svg path, .ff03 svg circle{
        fill: #fac808;
    }
    .ff04 svg path, .ff04 svg circle{
        fill: #2753eb;
    }
    .ff05 svg path, .ff05 svg circle{
        fill: #eaadee;
    }
    .ff06 svg path, .ff06 svg circle{
        fill: #43ce37;
    }
    .ff07 svg path, .ff07 svg circle{
        fill: #9fc438;
    }
    .ff08 svg path, .ff08 svg circle{
        fill: #9375b1;
    }
    .ff09 svg path, .ff09 svg circle{
        fill: #01ceab;
    }
    .ff10 svg path, .ff10 svg circle{
        fill: #01bcee;
    }
    .ff11 svg path, .ff11 svg circle{
        fill: #e34b42;
    }
    .ff12 svg path, .ff12 svg circle{
        fill: #eaa674;
    }

</style>
