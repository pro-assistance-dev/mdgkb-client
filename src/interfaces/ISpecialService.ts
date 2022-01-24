import IFileInfo from './files/IFileInfo';

export default interface ISpecialService {
  id?: string;
  title: string;
  content: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
}
