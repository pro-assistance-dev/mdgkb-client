import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

export default class NormativeDocumentType implements INormativeDocumentType {
  id?: string;
  name = '';

  constructor(type?: INormativeDocumentType) {
    if (type?.id) {
      this.id = type.id;
    }

    this.name = type?.name ?? '';
  }
}
