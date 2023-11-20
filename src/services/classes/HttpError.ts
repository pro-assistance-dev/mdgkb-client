import ClassHelper from '../ClassHelper';

export default class HttpError {
  private code = 400;
  private err = '';

  constructor(i?: HttpError) {
    ClassHelper.BuildClass(this, i);
  }

  getErr(): string {
    return this.capitalizedErr();
  }

  private capitalizedErr(): string {
    return this.err.charAt(0).toUpperCase() + this.err.slice(1);
  }
}
