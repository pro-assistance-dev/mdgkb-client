import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';

export interface State {
  items: IAdmissionCommitteeDocumentType[];
  itemsForDelete: string[];
  item: IAdmissionCommitteeDocumentType;
}
