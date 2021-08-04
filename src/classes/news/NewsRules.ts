export default {
  title: [{ required: true, message: 'Необходимо указать заголовок новости', trigger: 'blur' }],
  content: [{ required: true, message: 'Необходимо добавить контент', trigger: 'blur' }],
  publishedOn: [{ type: 'date', required: true, message: 'Необходимо выбрать дату публикации', trigger: 'change' }],
  fileInfo: [{ required: true, message: 'Необходимо добавить контент', trigger: 'blur' }],
};
