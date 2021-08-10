export default {
  address: [
    { required: true, message: 'Необходимо указать адрес.', trigger: 'blur' },
    { type: 'url', message: 'Введите корректный URL-адрес.', trigger: 'blur' },
  ],
};
