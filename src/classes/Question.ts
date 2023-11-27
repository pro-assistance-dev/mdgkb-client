import FileInfo from '@/classes/FileInfo';
import Form from '@/classes/Form';
import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class Question {
  id?: string;
  theme = '';
  question = '';
  originalQuestion = '';
  answer = '';
  originalAnswer = '';
  date = new Date();
  user = new User();
  userId?: string;
  answered = false;
  published = false;
  isNew = true;
  // Для пользователя
  answerIsRead = false;
  // Согласия
  publishAgreement = true;
  agreedWithPrivacyPolicy = false;
  // Открытие модалки
  isDialogOpened = false;

  file = new FileInfo();
  fileId?: string;

  formValue = new Form();

  constructor(i?: Question) {
    ClassHelper.BuildClass(this, i);
  }

  publish(): void {
    if (!this.published) {
      this.published = true;
      this.isNew = false;
      return;
    }
    this.published = false;
  }

  getThemeOrFirstPhrase(): string {
    return this.theme ? this.theme : this.question?.substring(0, 60);
  }

  changeNewStatus(status?: boolean): void {
    if (status !== undefined) {
      this.isNew = status;
    } else {
      this.isNew = !this.isNew;
    }
  }

  getUpdateButtonText(): string {
    if (this.publishAgreement) {
      if (this.published) {
        return 'Сохранить и снять с публикации';
      } else {
        return 'Сохранить и опубликовать';
      }
    }
    return 'Ответить';
  }
  getUpdateButtonType(): string {
    if (this.publishAgreement) {
      if (this.published) {
        return 'danger';
      } else {
        return 'success';
      }
    }
    return 'success';
  }
  getUpdateCondition(): boolean {
    if (!this.publishAgreement) {
      return !this.answered;
    }
    return true;
  }
  getFileInfos(): FileInfo[] {
    return [this.file];
  }

  // isAnswer(): boolean {
  //   if (this.answer.length != 0) {
  //     if(this.answerIsRead) {}
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // hasNewAnswer(): boolean {
  //   if (this.answered) {
  //     if (this.answerIsRead) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }

  hasNewAnswer(): boolean {
    if (this.originalAnswer.length !== 0) {
      return !this.answerIsRead;
    }
    return false;
  }

  static GetClassName(): string {
    return 'question';
  }
}
