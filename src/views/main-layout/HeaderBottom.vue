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
                    <template v-for="(item, i) in items" :key="item.id">
                        <MenuTileX  :ref="el => { if (el) menus[i] = el }" @done="collapseCard" :item="item"  />
                    </template>
                </div>
            </div>
        </el-submenu>
        <el-menu-item  class="header-bottom-menu-item" :route="{ name: 'AboutPage' }" index="3">О нас</el-menu-item>
    </el-menu>
</el-col>
    <el-col :offset="5" :span="4" class="info">
        <el-popover
                show-arrow="false"
                placement="bottom-start"
                :width="600"
                trigger="hover"
                content="this is content, this is content, this is content"
        >
            <template #reference>
                <div class="phones" @click="$router.push('/map')">
                <div>
                    +7 (495) 959-88-00
                </div>
                <div>
                    +7 (495) 959-88-03
                </div>
                </div>
            </template>
            <div id="helppop">
                <div class="phone">
                    +7 (495) 959-88-00<br/>
                    +7 (495) 959-88-03
                </div>
                <div class="call-center">
                    <small>
                        Call-центр принимает звонки круглосуточно и без выходных.
                        По России звонок бесплатный.
                    </small>
                </div>
                <div class="address">
                    119049 г. Москва, 4-й Добрынинский переулок, дом 1/9
                </div>
                <div class="address2">
                    <small>Вход на территорию больницы с 1-ого Добрынинского переулка.</small>
                </div>
                <div class="icons">
                    <a href="#" class="social-icon">
                        <img src="../../assets/img/social/facebook.png"/>
                    </a>
                    <a href="#" class="social-icon">
                        <img src="../../assets/img/social/instagram.png"/>
                    </a>
                    <a href="#" class="social-icon">
                        <img src="../../assets/img/social/youtube.png"/>
                    </a>
                </div>
            </div>
        </el-popover>

    </el-col>
</el-row>
</template>

<script lang="ts" >
    import {ref,defineComponent } from 'vue';
    import IMenuItem from "@/interfaces/IMenuItem";
    import MenuTileX from "@/views/main-layout/elements/MenuTileX.vue";
    export default defineComponent( {
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
            const menus = ref([])


            const collapseCard = () => {
                menus.value.forEach((v: any) => {
                    v.collapseCard()
                })
            }

            return {
                menus,
                collapseCard,
                expand,
                items,
            };
        },
  })
</script>
<style scoped lang="scss">

    /* layout */

    .gridcontainer {
        width: 50vw;

        .grid {
            padding: 2%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
            grid-auto-rows: 9rem;
            grid-gap: 16px;
            grid-auto-flow: dense;
        }

        .grid--big-columns {
            grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        }

        .grid--big-gap {
            grid-gap: 2.5rem;
        }

        /* styling */

        .card--expanded {
            grid-column: span 3;
            grid-row: span 3;
            .card__img {
                transform: scale(1.03);
            }
        }
    }




    .phones {
        padding-top: 5px;
        height: 51px;
        cursor: pointer;
        text-align: center;
    }

    .phones:hover{
        background-color: #e4e5e7
    }

    #helppop {
        padding: 22px;
        background: #fcfcfc;
        border-radius: 10px;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);

        .phone {
            margin-top: 6px;
        }

        .call-center {
            margin-top: 12px;
        }

        .address  {
            margin-top: 12px;
            margin-bottom: 12px;
        }

        .address  {
            margin-top: 12px;
            margin-bottom: 12px;
        }

        .icons  {
            margin-top: 12px;
            margin-bottom: 12px;
        }

        .social-icon {
            margin-top: 12px;
            margin-right: 12px;
        }

        #helppop .social-icon img{
            width: 24px;
            height: 24px;
            max-height: 24px;
        }

    }



</style>
