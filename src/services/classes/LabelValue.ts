export default class LabelValue {
  label = '';
  value: unknown;

  static Create(label = '', value = ''): LabelValue {
    const item = new Option();
    item.label = label;
    item.value = value;
    return item;
  }
}
