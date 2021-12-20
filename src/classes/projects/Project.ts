import ProjectItem from '@/classes/projects/ProjectItem';
import IProject from '@/interfaces/projects/IProject';
import IProjectItem from '@/interfaces/projects/IProjectItem';

export default class Project implements IProject {
  id?: string;
  title = '';
  content = '';
  slug = '';
  projectItems: IProjectItem[] = [];
  projectItemsForDelete: string[] = [];

  constructor(project?: IProject) {
    if (!project) {
      return;
    }
    this.id = project.id;
    this.title = project.title;
    this.content = project.content;
    this.slug = project.slug;
    if (project.projectItems) {
      this.projectItems = project.projectItems.map((item: IProjectItem) => new ProjectItem(item));
    }
  }
}
