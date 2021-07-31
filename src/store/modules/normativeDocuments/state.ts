import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

export default interface State {
  documents: INormativeDocument[];
  document?: INormativeDocument;
}
