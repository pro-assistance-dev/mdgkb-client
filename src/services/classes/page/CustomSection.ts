import ClassHelper from '@/services/ClassHelper';

export default class CustomSection {
  id = '';
  name = '';
  component = '';
  order?: number;
  active = false;
  key = 0;

  constructor(i?: CustomSection) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(id: string, name: string, componentName: string, order?: number, active?: boolean): CustomSection {
    const item = new CustomSection();
    item.id = id;
    item.name = name;
    item.component = componentName;
    item.order = order;
    item.active = !!active;
    return item;
  }
}
