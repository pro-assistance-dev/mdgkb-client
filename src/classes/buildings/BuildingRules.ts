export default {
  name: [{ required: true, message: 'Необходимо указать наименование здания', trigger: 'blur' }],
  number: [{ required: true, message: 'Необходимо указать номер корпуса', trigger: 'blur' }],
  address: [{ required: true, message: 'Необходимо указать адрес', trigger: 'blur' }],
};
