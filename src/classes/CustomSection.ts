import ClassHelper from '@/services/ClassHelper';

export default class CustomSection {
  id = '';
  name = '';
  component = '';
  order?: number;

  constructor(i?: CustomSection) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(id: string, name: string, componentName: string, order?: number): CustomSection {
    const item = new CustomSection();
    item.id = id;
    item.name = name;
    item.component = componentName;
    item.order = order;
    return item;
  }
}
