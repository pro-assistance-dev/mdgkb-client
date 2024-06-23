import ClassHelper from '@/services/ClassHelper';

export default class CustomSection {
  id = '';
  name = '';
  component: string | unknown = '';
  order?: number;

  constructor(i?: CustomSection) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(id: string, name: string, component: string | unknown, order?: number): CustomSection {
    const item = new CustomSection();
    item.id = id;
    item.name = name;
    item.component = component;
    item.order = order;
    return item;
  }
}
