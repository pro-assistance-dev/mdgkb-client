import IAdminMenu from '@/interfaces/IAdminMenu';
import { RoleName } from '@/interfaces/RoleName';

const menuList: IAdminMenu[] = [
  {
    title: 'Информационный раздел',
    to: '/',
    icon: 'el-icon-info',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
        showTo: [RoleName.Admin, RoleName.AdminDpo, RoleName.AdminPostgraduate],
      },
      {
        title: 'События',
        to: '/admin/events',
        icon: 'el-icon-tickets',
        showTo: [RoleName.AdminDpo, RoleName.AdminPostgraduate],
      },
      {
        title: 'Слайдер новостей',
        to: '/admin/news-slides',
        icon: 'el-icon-film',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Рекламные баннеры',
        to: '/admin/banners',
        icon: 'el-icon-film',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Вакансии',
        to: '/admin/vacancies',
        icon: 'el-icon-suitcase-1',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Справочный раздел',
    to: '/',
    icon: 'el-icon-question',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Здания',
        to: '/admin/buildings',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Отделения',
        to: '/admin/divisions',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Руководители',
        to: '/admin/heads',
        icon: 'el-icon-first-aid-kit',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Врачи',
        to: '/admin/doctors',
        icon: 'el-icon-first-aid-kit',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Документы',
    to: '/',
    icon: 'el-icon-document',
    showTo: [RoleName.Admin],
    children: [
      // {
      //   title: 'Документы',
      //   to: '/admin/documents-types',
      // },
      {
        title: 'Сертификаты',
        to: '/admin/certificates',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Раздел документы',
        to: '/admin/public-document-types',
        icon: 'el-icon-document',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Общее',
    to: '/',
    icon: 'el-icon-collection',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Наши партнеры',
        to: '/admin/partners',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Наши проекты',
        to: '/admin/projects',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Образование',
    to: '/',
    icon: 'el-icon-school',
    showTo: [RoleName.Admin, RoleName.AdminDpo, RoleName.AdminPostgraduate, RoleName.AdminResidency],
    children: [
      {
        title: 'Сведения об образовательной организации',
        to: '/admin/educational-organization',
        showTo: [RoleName.Admin, RoleName.AdminDpo, RoleName.AdminPostgraduate, RoleName.AdminResidency],
      },
      {
        title: 'Специальности',
        to: '/admin/educational/specializations',
        showTo: [RoleName.Admin, RoleName.AdminDpo, RoleName.AdminPostgraduate, RoleName.AdminResidency],
      },
      {
        title: 'Аспирантура',
        to: '/admin/postgraduate',
        showTo: [RoleName.Admin, RoleName.AdminPostgraduate],
      },
      {
        title: 'Кандидатские экзамены',
        to: '/admin/candidate',
        showTo: [RoleName.Admin, RoleName.AdminPostgraduate],
      },
      {
        title: 'Дополнительное профессиональное образование',
        to: '/admin/dpo',
        showTo: [RoleName.Admin, RoleName.AdminDpo],
      },
      {
        title: 'Программы ДПО',
        to: '/admin/dpo/courses',
        showTo: [RoleName.Admin, RoleName.AdminDpo],
      },
      {
        title: 'Заявки ДПО',
        to: '/admin/dpo/applications',
        showTo: [RoleName.Admin, RoleName.AdminDpo],
      },
      {
        title: 'Программы НМО',
        to: '/admin/nmo/courses',
        showTo: [RoleName.Admin, RoleName.AdminDpo],
      },
      {
        title: 'Заявки НМО',
        to: '/admin/nmo/applications',
        showTo: [RoleName.Admin, RoleName.AdminDpo],
      },
      {
        title: 'Программы аспирантуры',
        to: '/admin/postgraduate-courses',
        showTo: [RoleName.Admin, RoleName.AdminPostgraduate],
      },
      {
        title: 'Заявки на обучение в аспирантуре',
        to: '/admin/postgraduate-applications',
        showTo: [RoleName.Admin, RoleName.AdminPostgraduate],
      },
      {
        title: 'Заявки на сдачу кандидатского экзамена',
        to: '/admin/candidate-applications',
        showTo: [RoleName.Admin, RoleName.AdminPostgraduate],
      },
      {
        title: 'Шаблоны форм для заявок',
        to: '/admin/form-patterns',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Ординатура',
        to: '/admin/residency',
        showTo: [RoleName.Admin, RoleName.AdminResidency],
      },
      {
        title: 'Программы ординатуры',
        to: '/admin/residency/courses',
        showTo: [RoleName.Admin, RoleName.AdminResidency],
      },
      {
        title: 'Заявки ординатуры',
        to: '/admin/residency-applications',
        showTo: [RoleName.Admin, RoleName.AdminResidency],
      },
    ],
  },
  {
    title: 'Для пациентов',
    to: '/',
    icon: 'el-icon-user',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Общие правила посещения',
        to: '/admin/common-visiting-rules',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Подготовка к исследованиям',
        to: '/admin/preparations',
        showTo: [RoleName.Admin],
      },
      {
        title: 'FAQ',
        to: '/admin/faqs',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Медицинские профили',
        to: '/admin/medical-profiles',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Организации здравоохранения',
        to: '/admin/side-organizations',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Социальный раздел',
    to: '/',
    icon: 'el-icon-user',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Вопросы',
        to: '/admin/questions',
        icon: 'el-icon-question',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Комментарий',
        to: '/admin/comments/all',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Отмодерированные комментарии',
        to: '/admin/comments/mod-checked',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Неотмодерированные комментарии',
        to: '/admin/comments/not-mod-checked',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Трансфузиология',
    to: '/',
    icon: 'el-icon-first-aid-kit',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Правила для доноров',
        to: '/admin/donor-rules',
        icon: 'el-icon-plus',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'Структура сайта',
    to: '/',
    icon: 'el-icon-data-board',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Меню',
        to: '/admin/menus',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Страницы',
        to: '/admin/pages',
        showTo: [RoleName.Admin],
      },
    ],
  },
  {
    title: 'В разработке',
    to: '/',
    icon: 'el-icon-warning',
    showTo: [RoleName.Admin],
    children: [
      {
        title: 'Шаблоны графика работы',
        to: '/admin/timetable-patterns',
        icon: 'el-icon-time',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Создать слоты для записи',
        to: '/admin/appointments/constructor',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Список записей',
        to: '/admin/appointments/list',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Заявки на въезд',
        to: '/admin/application-for-entry',
        icon: 'el-icon-guide',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Платные услуги',
        to: '/admin/paid-programs-groups',
        icon: 'el-icon-money',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Клиентские доступы',
        to: '/admin/path-permissions',
        icon: 'el-icon-user',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Статусы заявок',
        to: '/admin/form-statuses',
        icon: 'el-icon-user',
        showTo: [RoleName.Admin],
      },
      {
        title: 'Роли',
        to: '/admin/roles',
        icon: 'el-icon-user',
        showTo: [RoleName.Admin],
      },
    ],
  },
];

export default menuList;
