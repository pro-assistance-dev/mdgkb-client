export default {
  email: [{ type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' }],
  name: [{ required: true, message: 'Необходимо указать наименование отделения', trigger: 'blur' }],
  // buildingId: [{ required: true, message: 'Необходимо выбрать здание', trigger: 'change' }],
  floorId: [{ required: true, message: 'Необходимо выбрать этаж', trigger: 'change' }],
  entranceId: [{ required: true, message: 'Необходимо выбрать вход в здание', trigger: 'change' }],
};
