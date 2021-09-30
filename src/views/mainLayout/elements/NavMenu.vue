<template>
  <el-menu class="header-bottom-menu" :mode="vertical ? 'vertical' : 'horizontal'" :router="true" default-active="1x">
    <template v-for="(menu, i) in menus" :key="menu.id">
      <el-menu-item v-if="menu.subMenus.length === 0" :index="i" class="header-bottom-menu-item" @click="$router.push(menu.link)">
        {{ menu.name }}
      </el-menu-item>
      <el-submenu v-else :index="i" class="header-bottom-menu-item">
        <template #title
          ><span class="header-bottom-menu-item">{{ menu.name }}</span></template
        >
        <template v-for="subMenu in menu.subMenus" :key="subMenu.id">
          <el-menu-item
            v-if="subMenu.subSubMenus.length === 0"
            :index="subMenu.link"
            class="header-bottom-submenu-item"
            @click="$router.push(subMenu.link)"
          >
            <!--TODO: реализовать иконку - это пример-->
            <!--            <div class="icon">-->
            <!--              <Component :is="require(`@/assets/img/services-menu/icon/${item.id}.svg`).default"></Component>-->
            {{ subMenu.name }}
            <!--            </div>-->
          </el-menu-item>
          <el-submenu v-else :index="subMenu.link" class="header-bottom-menu-item">
            <template #title
              ><span class="header-bottom-menu-item">{{ subMenu.name }}</span></template
            >
            <template v-for="subSubMenu in subMenu.subSubMenus" :key="subSubMenu.id">
              <el-menu-item :index="subSubMenu.link" class="header-bottom-submenu-item" @click="$router.push(subSubMenu.link)">
                {{ subSubMenu.name }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import IMenu from '@/interfaces/elements/IMenu';
import IMenuItem from '@/interfaces/IMenuItem';

export default defineComponent({
  name: 'NavMenu',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let expand = ref(false);
    const activePath: Ref<string> = ref('');
    const store = useStore();
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
    const menus = computed(() => store.getters['menus/menus']);
    const route = useRoute();
    onBeforeMount(async () => {
      await store.dispatch('menus/getAll');
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
