import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDivisionImage {
  id?: string;
  divisionId?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  description?: string;
  order: number;
  ratio: number;
}
