import INormativeDocument from "@/interfaces/normativeDocument/INormativeDocument";

export interface State {
  documents: INormativeDocument[];
  document?: INormativeDocument;
}
