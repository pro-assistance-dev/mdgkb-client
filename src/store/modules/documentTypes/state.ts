import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IDocumentType from '@/interfaces/document/IDocumentType';

export default interface State {
  items: IDocumentType[];
  item: IDocumentType;
  documentsForTablesNames: DocumentsTypesForTablesNames;
}
