import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface INormativeDocument {
  id?: string;
  name: string;
  type: INormativeDocumentType;
  fileInfo?: IFileInfo;
}
