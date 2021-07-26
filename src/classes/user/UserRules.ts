export default {
  email: [
    { required: true, message: 'Необходимо указать email', trigger: 'blur' },
    { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Необходимо ввести пароль', trigger: 'blur' },
    { min: 6, message: 'Пароль должен быть не менее 6 символов' },
  ],
};
