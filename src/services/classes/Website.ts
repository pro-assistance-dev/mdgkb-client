import ClassHelper from '@/services/ClassHelper';

export default class Website {
  id?: string;
  address?: string;
  description?: string;

  constructor(i?: Website) {
    ClassHelper.BuildClass(this, i);
  }
}
