import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

export default interface State {
  types: INormativeDocumentType[];
  type?: INormativeDocumentType;
}
