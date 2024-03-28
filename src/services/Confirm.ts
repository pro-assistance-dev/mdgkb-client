import { ElMessageBox, MessageBoxData } from 'element-plus';

import { Callback } from '@/services/interfaces/Callback';

export default class Confirm {
  private static Show(confirmText: string, cancelText: string): Promise<MessageBoxData> {
    return ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
      distinguishCancelAndClose: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  }

  static async Save(f: Callback) {
    Confirm.Show('Сохранить', 'Не сохранять').then(() => f());
  }
  static async Remove(f: Callback) {
    return Confirm.Show('Удалить', 'Отмена').then(() => f());
  }
}
