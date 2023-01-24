export default {
  comment: {
    text: [
      { required: true, message: 'Поле не может быть пустым', trigger: 'change' },
      { min: 10, max: 500, message: 'Поле должно содержать не менее 10 символов', trigger: 'change' },
    ],
  },
};
