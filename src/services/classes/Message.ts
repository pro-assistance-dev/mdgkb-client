import { ElMessage } from 'element-plus';

enum MType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export default class Message {
  private static Show(m: string, t: MType): void {
    if (!m || !t) {
      return;
    }
    ElMessage({
      message: m,
      type: t,
    });
  }

  static Success(m: string): void {
    Message.Show(m, MType.Success);
  }
  static Error(m: string): void {
    Message.Show(m, MType.Error);
  }
  static Warning(m: string): void {
    Message.Show(m, MType.Warning);
  }
  static FormMessage(errorFields: any): string {
    let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
    for (const item of Object.keys(errorFields)) {
      if (errorFields[item][0] && errorFields[item][0].message) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
    }
    errorMessage += '</ul>';
    return errorMessage;
  }
}
