<template>
  <div class="admin-side-menu">
    <el-menu
      v-for="item in menuList"
      :key="item.title"
      :default-active="activePath"
      :collapse="isCollapseSideMenu"
      background-color="whitesmoke"
      @select="closeDrawer"
    >
      <el-sub-menu v-if="item.children" :index="item.title">
        <template #title>
          <i :class="item.icon"></i>
          <span class="row-menu-title">{{ item.title }}</span>
        </template>
        <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
          {{ children.title }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :index="item.to" @click="$router.push(item.to)">
        <i :class="item.icon"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AdminSideMenu',
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    onBeforeMount(() => {
      activePath.value = route.path;
    });
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    const menuList = ref([
      {
        title: 'Информационный раздел',
        to: '/',
        icon: 'el-icon-info',
        children: [
          {
            title: 'Новости',
            to: '/admin/news',
            icon: 'el-icon-tickets',
          },
          {
            title: 'События',
            to: '/admin/events',
            icon: 'el-icon-tickets',
          },
          {
            title: 'Слайдер новостей',
            to: '/admin/news-slides',
            icon: 'el-icon-film',
          },
          {
            title: 'Рекламные баннеры',
            to: '/admin/banners',
          },
          {
            title: 'Вакансии',
            to: '/admin/vacancies',
            icon: 'el-icon-suitcase-1',
          },
        ],
      },
      {
        title: 'Справочный раздел',
        to: '/',
        icon: 'el-icon-question',
        children: [
          {
            title: 'Здания',
            to: '/admin/buildings',
          },
          {
            title: 'Отделения',
            to: '/admin/divisions',
          },
          {
            title: 'Руководители',
            to: '/admin/heads',
            icon: 'el-icon-first-aid-kit',
          },
          {
            title: 'Врачи',
            to: '/admin/doctors',
            icon: 'el-icon-first-aid-kit',
          },
        ],
      },
      {
        title: 'Документы',
        to: '/',
        icon: 'el-icon-document',
        children: [
          // {
          //   title: 'Документы',
          //   to: '/admin/documents-types',
          // },
          {
            title: 'Сертификаты',
            to: '/admin/certificates',
          },
          {
            title: 'Раздел документы',
            to: '/admin/public-document-types',
            icon: 'el-icon-document',
          },
        ],
      },
      {
        title: 'Общее',
        to: '/',
        icon: 'el-icon-collection',
        children: [
          {
            title: 'Наши партнеры',
            to: '/admin/partners',
          },
          {
            title: 'Наши проекты',
            to: '/admin/projects',
          },
        ],
      },
      {
        title: 'Образование',
        to: '/',
        icon: 'el-icon-school',
        children: [
          {
            title: 'Сведения об образовательной организации',
            to: '/admin/educational-organization',
          },
          {
            title: 'Ординатура/аспирантура (абитуриенту)',
            to: '/admin/educational-organization',
          },
          {
            title: 'Дополнительное профессиональное образование',
            to: '/admin/educational-organization',
          },
          {
            title: 'Программы ДПО',
            to: '/admin/dpo/courses',
          },
          {
            title: 'Заявки ДПО',
            to: '/admin/dpo/applications',
          },
          {
            title: 'Программы НМО',
            to: '/admin/nmo/courses',
          },
          {
            title: 'Заявки НМО',
            to: '/admin/nmo/applications',
          },
          {
            title: 'Программы аспирантуры',
            to: '/admin/postgraduate-courses',
          },
          {
            title: 'Заявки на обучение в аспирантуре',
            to: '/admin/postgraduate-applications',
          },
          {
            title: 'Шаблоны форм для заявок',
            to: '/admin/form-patterns',
          },
        ],
      },
      {
        title: 'Для пациентов',
        to: '/',
        icon: 'el-icon-user',
        children: [
          {
            title: 'Общие правила посещения',
            to: '/admin/common-visiting-rules',
          },
          {
            title: 'Подготовка к исследованиям',
            to: '/admin/preparations',
          },
          {
            title: 'FAQ',
            to: '/admin/faqs',
          },
          {
            title: 'Медицинские профили',
            to: '/admin/medical-profiles',
          },
          {
            title: 'Организации здравоохранения',
            to: '/admin/side-organizations',
          },
        ],
      },
      {
        title: 'Социальный раздел',
        to: '/',
        icon: 'el-icon-user',
        children: [
          {
            title: 'Вопросы',
            to: '/admin/questions',
            icon: 'el-icon-question',
          },
          {
            title: 'Комментарий',
            to: '/admin/comments/all',
          },
          {
            title: 'Отмодерированные комментарии',
            to: '/admin/comments/mod-checked',
          },
          {
            title: 'Неотмодерированные комментарии',
            to: '/admin/comments/not-mod-checked',
          },
        ],
      },
      {
        title: 'Трансфузиология',
        to: '/',
        icon: 'el-icon-first-aid-kit',
        children: [
          {
            title: 'Правила для доноров',
            to: '/admin/donor-rules',
            icon: 'el-icon-plus',
          },
        ],
      },
      {
        title: 'Структура сайта',
        to: '/',
        icon: 'el-icon-data-board',
        children: [
          {
            title: 'Меню',
            to: '/admin/menus',
          },
          {
            title: 'Страницы',
            to: '/admin/pages',
          },
        ],
      },
      {
        title: 'В разработке',
        to: '/',
        icon: 'el-icon-warning',
        children: [
          {
            title: 'Шаблоны графика работы',
            to: '/admin/timetable-patterns',
            icon: 'el-icon-time',
          },
          {
            title: 'Создать слоты для записи',
            to: '/admin/appointments/constructor',
          },
          {
            title: 'Список записей',
            to: '/admin/appointments/list',
          },
          {
            title: 'Заявки на въезд',
            to: '/admin/application-for-entry',
            icon: 'el-icon-guide',
          },
          {
            title: 'Платные услуги',
            to: '/admin/paid-programs-groups',
            icon: 'el-icon-money',
          },
        ],
      },
    ]);
    return { menuList, closeDrawer, isCollapseSideMenu, activePath };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}

.admin-side-menu {
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;

  :deep(.el-sub-menu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-sub-menu__icon-arrow) {
    font-size: unset;
  }
}
.el-menu,
.el-menu-item {
  border: none;
}
.row-menu-title {
  margin-right: 20px;
}
</style>
