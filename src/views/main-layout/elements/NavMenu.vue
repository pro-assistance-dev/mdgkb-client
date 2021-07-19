<template>
  <el-menu
    class="header-bottom-menu"
    :mode="vertical ? 'vertical' : 'horizontal'"
    :router="true"
    default-active="0"
    @select="changeDrawerStatus"
  >
    <el-menu-item class="header-bottom-menu-item" index="1" :route="{ name: 'News' }">Новости</el-menu-item>
    <el-submenu index="2" popper-class="popper-class-custom">
      <template #title><span class="header-bottom-menu-item">Пациентам</span></template>
      <!-- For drawer -->
      <div v-if="vertical">
        <template v-for="item in items" :key="item.id">
          <el-menu-item :route="item.name ? item.name : ''">
            <!-- <img id="bg" :src="require(`../../../assets/img/services-menu/banner/${item.id}.png`)" /> -->
            <div class="icon">
              <Component :is="require(`@/assets/img/services-menu/icon/${item.id}.svg`).default"></Component>
              {{ item.label }}
            </div>
          </el-menu-item>
        </template>
      </div>
      <!-- Classic variation -->
      <div class="gridcontainer" v-else>
        <div class="grid" id="services_grid">
          <template v-for="(item, i) in items" :key="item.id">
            <MenuTileX
              :ref="
                (el) => {
                  if (el) menus[i] = el;
                }
              "
              @done="collapseCard"
              :item="item"
            />
          </template>
        </div>
      </div>
    </el-submenu>
    <el-menu-item class="header-bottom-menu-item" :route="{ name: 'AboutPage' }" index="3">О нас</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import MenuTileX from '@/views/main-layout/elements/MenuTileX.vue';
import IMenuItem from '@/interfaces/IMenuItem';

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
  setup(prop, { emit }) {
    let expand = ref(false);
    const items: IMenuItem[] = [
      // {id: "01", label: "Диагностика", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/divisions/konsultativno-diagnosticheskij-centr"},
      // {id: "02",label: "Платные медицинские услуги", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
      // {id: "03",label: "Госпитализация", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/hospitalization"},
      {
        id: '04',
        label: 'Амбулаторно-поликлиническая помощь',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '#',
      },
      // {id: "05",label: "Информация для Доноров крови", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"#"},
      { id: '06', label: 'Просветительский проект СтопКома', description: '', to: '/stop-coma', name: 'StopComaPage' },
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
        to: '/health_organizations',
      },
      {
        id: '10',
        label: 'Нормативные документы',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/normative_documents',
      },
      // {id: "11",label: "Школа для родителей пациентов с муковисцидозом", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/events/shkola-dlya-roditelej-pacientov-s-mukoviscidozom"},
      // {id: "12",label: "Запрос копии документа", description:"Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства", to:"/document_request"},
    ];
    const menus = ref([]);

    const collapseCard = () => {
      menus.value.forEach((v: any) => {
        v.collapseCard();
      });
    };

    const changeDrawerStatus = () => {
      emit('changeDrawerStatus');
    };

    return { menus, collapseCard, expand, items, changeDrawerStatus };
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
