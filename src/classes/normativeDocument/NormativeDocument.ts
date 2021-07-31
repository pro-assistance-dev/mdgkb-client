import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import NormativeDocumentType from '@/classes/normativeDocument/NormativeDocumentType';

export default class NormativeDocument implements INormativeDocument {
  id?: string;
  name = '';
  type: INormativeDocumentType;
  fileInfo?: IFileInfo;

  constructor(document?: INormativeDocument) {
    this.id = document?.id;
    this.name = document?.name ?? '';
    this.type = document?.type ?? new NormativeDocumentType();
    this.fileInfo = document?.fileInfo ?? undefined;
  }
}
