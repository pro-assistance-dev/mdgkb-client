import { ElMessageBox, MessageBoxData } from 'element-plus';

export default (): Promise<MessageBoxData> => {
  return ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
    distinguishCancelAndClose: true,
    confirmButtonText: 'Сохранить',
    cancelButtonText: 'Не сохранять',
  });
};

export const Cancel = 'cancel';
export const Close = 'close';
