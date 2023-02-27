import ClassHelper from '@/services/ClassHelper';

export default class PostAddress {
  id?: string;
  address?: string;
  description?: string;

  constructor(i?: PostAddress) {
    ClassHelper.BuildClass(this, i);
  }
}
