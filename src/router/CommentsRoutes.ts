const CommentsList = () => import('@/components/Comments/CommentsList.vue');

export default [
  {
    path: '/comments',
    name: 'CommentsList',
    meta: { title: 'Отзывы' },
    component: CommentsList,
  },
];
