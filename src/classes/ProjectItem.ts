import ClassHelper from '@/services/ClassHelper';

export default class ProjectItem {
  id?: string;
  title = '';
  content = '';

  constructor(i?: ProjectItem) {
    ClassHelper.BuildClass(this, i);
  }

  static NewTab(): ProjectItem {
    const projectItem = new ProjectItem();
    projectItem.title = 'Новая вкладка';
    return projectItem;
  }
}
