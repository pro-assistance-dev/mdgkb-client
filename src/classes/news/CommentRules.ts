export default {
  comment: {
    text: [
      { required: true, message: 'Комментарий не может быть пустым', trigger: 'change' },
      { min: 10, max: 500, message: 'Допустиммая длинна комментария от 10 до 500 символов', trigger: 'change' },
    ],
  },
};
