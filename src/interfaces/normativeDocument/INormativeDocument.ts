import IFileObject from '@/interfaces/files/IFileObject';

export default interface INormativeDocument {
  id: string;
  name: string;
  file: number;
  type: number;
  status: string;
  file_object: IFileObject;
}
