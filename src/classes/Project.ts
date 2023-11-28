import FileInfo from '@/classes/FileInfo';
import ProjectItem from '@/classes/ProjectItem';
import ClassHelper from '@/services/ClassHelper';

export default class Project {
  id?: string;
  title = '';
  content = '';
  slug = '';

  image = new FileInfo();
  imageId?: string;

  @ClassHelper.GetClassConstructor(ProjectItem)
  projectItems: ProjectItem[] = [];
  projectItemsForDelete: string[] = [];

  constructor(i?: Project) {
    ClassHelper.BuildClass(this, i);
  }
}
