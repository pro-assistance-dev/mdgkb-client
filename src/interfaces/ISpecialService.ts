import IFileInfo from './files/IFileInfo';

export default interface ISpecialService {
  id?: string;
  title: string;
  content: string;
  imgPath?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  link?: string;
}
