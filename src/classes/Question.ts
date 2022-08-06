import User from '@/classes/User';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IQuestion from '@/interfaces/IQuestion';

import FileInfo from './File/FileInfo';
import Form from './Form';

export default class Question implements IQuestion {
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

  constructor(question?: IQuestion) {
    if (!question) {
      return;
    }
    this.id = question.id;
    this.theme = question.theme;
    this.question = question.question;
    if (!this.question) {
      this.question = question.originalQuestion;
    }
    if (question.user) {
      this.user = new User(question.user);
    }
    if (question.date) {
      this.date = new Date(question.date);
    }
    this.fileId = question.fileId;
    if (question.file) {
      this.file = new FileInfo(question.file);
    }
    this.answered = question.answered;
    this.userId = question.userId;
    this.originalQuestion = question.originalQuestion;
    this.answer = question.answer;
    this.originalAnswer = question.originalAnswer;
    this.isNew = question.isNew;
    this.publishAgreement = question.publishAgreement;
    this.published = question.published;
    this.answerIsRead = question.answerIsRead;
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
      if (this.answered) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  getFileInfos(): IFileInfo[] {
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
    if (this.originalAnswer.length != 0) {
      if (this.answerIsRead) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
