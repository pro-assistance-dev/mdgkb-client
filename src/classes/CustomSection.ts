import ICustomSection from '@/interfaces/ICustomSection';

export default class CustomSection implements ICustomSection {
  id = '';
  name = '';
  component = '';
  order?: number;

  constructor(i?: ICustomSection) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.component = i.component;
    this.order = i.order;
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
