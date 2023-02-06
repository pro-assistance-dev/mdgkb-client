import ClassHelper from '@/services/ClassHelper';

export default class NewsSlideButton {
  id?: string;
  name = '';
  color = '#000000';
  backgroundColor = '#FFFFFF';
  order = 1;
  link = '';
  borderColor = '';
  shadow = false;

  constructor(i?: NewsSlideButton) {
    ClassHelper.BuildClass(this, i);
  }
}
