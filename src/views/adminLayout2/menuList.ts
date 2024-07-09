import IAdminMenu from '@/interfaces/IAdminMenu';

const menuList: IAdminMenu[] = [
  {
    name: 'Новости и реклама',
    to: '/',
    icon: 'el-icon-info',
    children: [
      {
        name: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
      },
      // {
      //   name: 'События',
      //   to: '/admin/events',
      //   icon: 'el-icon-tickets',
      // },
      // {
      //   name: 'Слайдер новостей',
      //   to: '/admin/news-slides',
      //   icon: 'el-icon-film',
      // },
      // {
      //   name: 'Рекламные баннеры',
      //   to: '/admin/banners',
      //   icon: 'el-icon-film',
      // },
    ],
  },
  {
    name: 'Вакансии, вопросы, комментарии, заявки',
    to: '/',
    icon: 'el-icon-info',
    children: [
      {
        name: 'Редактор вакансий',
        to: '/admin/vacancies',
        icon: 'el-icon-suitcase-1',
      },
      {
        name: 'Отклики на вакансии',
        to: '/admin/vacancy-responses',
        icon: 'el-icon-suitcase-1',
        tableName: 'vacancy_responses',
      },
      {
        name: 'Вопросы',
        to: '/admin/questions',
        icon: 'el-icon-question',
        tableName: 'questions',
      },
      {
        name: 'Комментарии',
        to: '/admin/comments',
        tableName: 'comments',
      },
      {
        name: 'Заявки на посещение',
        to: '/admin/visits-applications',
        icon: 'el-icon-guide',
        tableName: 'visits_applications',
      },
      // {
      //   name: 'Госпитализации',
      //   to: '/admin/hospitalizations',
      //   icon: 'el-icon-guide',
      //   tableName: 'hospitalizations',
      // },
      // {
      //   name: 'Список записей',
      //   to: '/admin/appointments',
      // },
    ],
  },
  {
    name: 'Здания, отделения, входы',
    to: '/',
    icon: 'el-icon-question',
    children: [
      // {
      //   name: 'Здания',
      //   to: '/admin/buildings',
      // },
      // {
      //   name: 'Входы',
      //   to: '/admin/gates',
      // },
      {
        name: 'Отделения',
        to: '/admin/divisions',
      },
    ],
  },
  // {
  //   name: 'Проекты, партнеры, профили, организации',
  //   to: '/',
  //   icon: 'el-icon-collection',
  //   children: [
  //     {
  //       name: 'Наши партнеры',
  //       to: '/admin/partners',
  //     },
  //     {
  //       name: 'Наши проекты',
  //       to: '/admin/projects',
  //     },
  //     {
  //       name: 'Медицинские профили',
  //       to: '/admin/medical-profiles',
  //     },
  //     {
  //       name: 'Организации здравоохранения',
  //       to: '/admin/side-organizations',
  //     },
  //   ],
  // },
  {
    name: 'Образование',
    to: '/',
    icon: 'el-icon-school',
    children: [
      {
        name: 'Программы ординатуры',
        to: '/admin/residency-courses',
      },
      // {
      //   name: 'Программы НМО',
      //   to: '/admin/nmo-courses',
      // },
      // {
      //   name: 'Программы аспирантуры',
      //   to: '/admin/postgraduate-courses',
      // },
      // {
      //   name: 'Заявки ДПО',
      //   to: '/admin/nmo/applications',
      //   tableName: 'dpo_applications',
      // },
      // {
      //   name: 'Заявки НМО',
      //   to: '/admin/nmo/applications',
      //   tableName: 'nmo_applications',
      // },
      // {
      //   name: 'Заявки на обучение в аспирантуре',
      //   to: '/admin/postgraduate-applications',
      //   tableName: 'postgraduate_applications',
      // },
      // {
      //   name: 'Заявки на сдачу кандидатского экзамена',
      //   to: '/admin/candidate-applications',
      // },
      {
        name: 'Заявки ординатуры',
        to: '/admin/residency-applications',
        tableName: 'residency_applications',
      },
    ],
  },
  {
    name: 'FAQ, правила, исследования, донорство',
    to: '/',
    icon: 'el-icon-user',
    children: [
      // {
      //   name: 'Общие правила посещения',
      //   to: '/admin/common-visiting-rules',
      // },
      // {
      //   name: 'Подготовка к исследованиям',
      //   to: '/admin/preparations',
      // },
      // {
      //   name: 'FAQ',
      //   to: '/admin/faqs',
      // },
      // {
      //   name: 'Правила для доноров',
      //   to: '/admin/donor-rules',
      //   icon: 'el-icon-plus',
      // },
    ],
  },
  {
    name: 'Администрирование',
    to: '/',
    icon: 'el-icon-data-board',
    children: [
      // {
      //   name: 'Меню',
      //   to: '/admin/menus',
      // },
      {
        name: 'Страницы',
        to: '/admin/pages',
      },
      // {
      //   name: 'Роли',
      //   to: '/admin/roles',
      //   icon: 'el-icon-user',
      // },
      {
        name: 'Сотрудники',
        to: '/admin/employees',
        icon: 'el-icon-user',
      },
      {
        name: 'Пользователи',
        to: '/admin/users',
        icon: 'el-icon-user',
      },
      // {
      //   name: 'Клиентские доступы',
      //   to: '/admin/path-permissions',
      //   icon: 'el-icon-user',
      // },
      // {
      //   name: 'Шаблоны графика работы',
      //   to: '/admin/timetable-patterns',
      //   icon: 'el-icon-time',
      // },
      {
        name: 'Шаблоны форм для заявок',
        to: '/admin/form-patterns',
      },
      // {
      //   name: 'Специальности',
      //   to: '/admin/educational/specializations',
      // },
      {
        name: 'Группы статусов заявок',
        to: '/admin/form-status-groups',
        icon: 'el-icon-user',
      },
      {
        name: 'Буфет',
        to: '/admin/dishes',
        icon: 'el-icon-user',
      },
      {
        name: 'Буфет. Заказы',
        to: '/admin/daily-menu-orders',
        icon: 'el-icon-user',
      },
      // {
      //   name: 'Тех.поддержка',
      //   to: '/admin/support-messages',
      //   icon: 'el-icon-user',
      // },
      // {
      //   name: 'Типы госпитализации',
      //   to: '/admin/hospitalizations-types',
      //   icon: 'el-icon-user',
      // },
    ],
  },
  // {
  //   name: 'В разработке',
  //   to: '/',
  //   icon: 'el-icon-warning',
  //   children: [
  //     {
  //       name: 'Создать слоты для записи',
  //       to: '/admin/appointments/constructor',
  //     },
  //     {
  //       name: 'Платные услуги',
  //       to: '/admin/paid-programs-groups',
  //       icon: 'el-icon-money',
  //     },
  //   ],
  // },
];

export default menuList;
