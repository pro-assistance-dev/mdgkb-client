import IFileInfo from '@/interfaces/files/IFileInfo';

import IProjectItem from './IProjectItem';

export default interface IProject {
  id?: string;
  title: string;
  content: string;
  slug: string;
  image: IFileInfo;
  imageId?: string;

  projectItems: IProjectItem[];
  projectItemsForDelete: string[];
}
