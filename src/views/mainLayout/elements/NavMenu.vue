<template>
  <el-menu class="header-bottom-menu" :mode="vertical ? 'vertical' : 'horizontal'" :router="true" :default-active="activePath">
    <el-menu-item class="header-bottom-menu-item" index="/news" :route="{ name: 'News' }">Новости</el-menu-item>
    <el-submenu index="1" popper-class="popper-class-custom">
      <template #title><span class="header-bottom-menu-item">Пациентам</span></template>
      <!-- For drawer -->
      <!-- <div v-if="vertical"> -->
      <template v-for="item in items" :key="item.id">
        <el-menu-item class="header-bottom-submenu-item" :index="item.to" @click="$router.push(item.to)">
          <div class="icon">
            <Component :is="require(`@/assets/img/services-menu/icon/${item.id}.svg`).default"></Component>
            {{ item.label }}
          </div>
        </el-menu-item>
      </template>
    </el-submenu>

    <el-submenu index="3">
      <template #title> <span class="header-bottom-menu-item">Образование</span></template>
      <el-submenu index="4">
        <template #title>Сведения об образовательной организации</template>
        <el-menu-item
          class="header-bottom-submenu-item"
          index="/educational-organization/info"
          @click="$router.push('/educational-organization/info')"
        >
          <div class="icon">Основные сведения</div>
        </el-menu-item>
        <el-menu-item
          class="header-bottom-submenu-item"
          index="/educational-organization/structure"
          @click="$router.push('/educational-organization/structure')"
        >
          <div class="icon">Структура и орган управления организации</div>
        </el-menu-item>
        <el-menu-item
          class="header-bottom-submenu-item"
          index="/educational-organization/documents"
          @click="$router.push('/educational-organization/documents')"
        >
          <div class="icon">Документы</div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="header-bottom-submenu-item" index="/educational-organization" @click="$router.push('/educational-organization')">
        <div class="icon">Ординатура/аспирантура</div>
      </el-menu-item>
      <el-menu-item class="header-bottom-submenu-item" index="/educational-organization" @click="$router.push('/educational-organization')">
        <div class="icon">Дополнительное профессиональное образование</div>
      </el-menu-item>
    </el-submenu>

    <el-menu-item class="header-bottom-menu-item" index="/about" :route="{ name: 'AboutPage' }">О нас</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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
    const activePath: Ref<string> = ref('');
    const items: IMenuItem[] = [
      {
        id: '02',
        label: 'Платные медицинские услуги',
        description:
          'Запись на плановую госпитализацию в нашу больницу пациентов, прикрепленных к московским поликлиникам, производится через детскую поликлинику по месту жительства',
        to: '/paid-services',
      },
      { id: '06', label: 'Просветительский проект СтопКома', description: '', to: '/stop-coma' },
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
    ];
    const menus = ref([]);
    const route = useRoute();
    onBeforeMount(() => {
      activePath.value = route.path;
    });
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    const collapseCard = () => menus.value.forEach((v: IMenu) => v.collapseCard());

    return { menus, collapseCard, expand, items, activePath };
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
