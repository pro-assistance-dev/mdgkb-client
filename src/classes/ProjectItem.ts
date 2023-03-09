import IProjectItem from '@/interfaces/projects/IProjectItem';

export default class ProjectItem implements IProjectItem {
  id?: string;
  title = '';
  content = '';

  constructor(projectItem?: IProjectItem) {
    if (!projectItem) {
      return;
    }
    this.id = projectItem.id;
    this.title = projectItem.title;
    this.content = projectItem.content;
  }

  static NewTab(): IProjectItem {
    const projectItem = new ProjectItem();
    projectItem.title = 'Новая вкладка';
    return projectItem;
  }
}
