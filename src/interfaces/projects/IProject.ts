import IProjectItem from './IProjectItem';

export default interface IProject {
  id?: string;
  title: string;
  content: string;
  slug: string;

  projectItems: IProjectItem[];
  projectItemsForDelete: string[];
}
