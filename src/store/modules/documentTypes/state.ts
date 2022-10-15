import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IDocumentType from '@/interfaces/IDocumentType';

export default interface State {
  items: IDocumentType[];
  item: IDocumentType;
  documentsForTablesNames: DocumentsTypesForTablesNames;
}
