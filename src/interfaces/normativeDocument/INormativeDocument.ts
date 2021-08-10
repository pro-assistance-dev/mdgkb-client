import IFileInfo from '@/interfaces/files/IFileInfo';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

export default interface INormativeDocument {
  id?: string;
  name: string;
  type: INormativeDocumentType;
  fileInfo?: IFileInfo;
}
