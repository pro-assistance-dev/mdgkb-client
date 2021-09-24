<template>
  <el-menu class="header-bottom-menu" :mode="vertical ? 'vertical' : 'horizontal'" :router="true" default-active="1x">
    <el-menu-item class="header-bottom-menu-item" index="1" :route="{ name: 'News' }">Новости</el-menu-item>
    <el-submenu index="2" popper-class="popper-class-custom">
      <template #title><span class="header-bottom-menu-item">Пациентам</span></template>
      <!-- For drawer -->
      <!-- <div v-if="vertical"> -->
      <template v-for="item in items" :key="item.id">
        <el-menu-item class="header-bottom-submenu-item" @click="$router.push(item.to)">
          <div class="icon">
            <Component :is="require(`@/assets/img/services-menu/icon/${item.id}.svg`).default"></Component>
            {{ item.label }}
          </div>
        </el-menu-item>
      </template>
    </el-submenu>

    <el-submenu index="3" popper-class="popper-class-custom">
      <template #title><span class="header-bottom-menu-item">Образование</span></template>
      <el-submenu class="header-bottom-submenu-item">
        <template #title><span class="header-bottom-menu-item">Сведения об образовательной организации</span></template>
        <el-menu-item class="header-bottom-submenu-item" @click="$router.push('/educational-organization/info')">
          <div class="icon">Основные сведения</div>
        </el-menu-item>
        <el-menu-item class="header-bottom-submenu-item" @click="$router.push('/educational-organization/structure')">
          <div class="icon">Структура и орган управления организации</div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="header-bottom-submenu-item" @click="$router.push('/educational-organization')">
        <div class="icon">Ординатура/аспирантура</div>
      </el-menu-item>
      <el-menu-item class="header-bottom-submenu-item" @click="$router.push('/educational-organization')">
        <div class="icon">Дополнительное профессиональное образование</div>
      </el-menu-item>
    </el-submenu>

    <el-menu-item class="header-bottom-menu-item" :route="{ name: 'AboutPage' }" index="3">О нас</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import IMenu from '@/interfaces/elements/IMenu';
import IMenuItem from '@/interfaces/IMenuItem';
import MenuTileX from '@/views/mainLayout/elements/MenuTileX.vue';

export default defineComponent({
  name: 'NavMenu',
  components: {
    MenuTileX,
  },
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let expand = ref(false);
    const items: IMenuItem[] = [
      // {id: "01", label: "Диагностика", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/divisions/konsultativno-diagnosticheskij-centr"},
      {
        id: '02',
        label: 'Платные медицинские услуги',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/paid-services',
      },
      // {id: "03",label: "Госпитализация", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/hospitalization"},
      // {
      //   id: '04',
      //   label: 'Амбулаторно-поликлиническая помощь',
      //   description:
      //     'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
      //   to: '#',
      // },
      // {id: "05",label: "Информация для Доноров крови", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
      { id: '06', label: 'Просветительский проект СтопКома', description: '', to: '/stop-coma' },
      // {id: "07",label: "Подготовка к исследованиям", description: 'Подготовка к исследованиям', to:"/preparation"},
      {
        id: '08',
        label: 'Диспансеризация населения',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/dispanserization',
      },
      {
        id: '09',
        label: 'Сведения об организациях в сфере охраны здоровья',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/side-organizations',
      },
      {
        id: '10',
        label: 'Нормативные документы',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/normative-documents',
      },
      // {id: "11",label: "Школа для родителей пациентов с муковисцидозом", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/events/shkola-dlya-roditelej-pacientov-s-mukoviscidozom"},
      // {id: "12",label: "Запрос копии документа", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/document_request"},
    ];
    const menus = ref([]);

    const collapseCard = () => menus.value.forEach((v: IMenu) => v.collapseCard());

    return { menus, collapseCard, expand, items };
  },
});
</script>

<style lang="scss" scoped>
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

.icon svg {
  width: 20px;
  margin-right: 10px;
}

.icon {
  //   fill: #ffffff;
  display: flex;
  align-items: center;
  color: black;
}
</style>
