import DocumentsTypesForTablesNames from '@/classes/schema/DocumentsTypesForTablesNames';
import IPageSection from '@/interfaces/IPageSection';

export default interface State {
  items: IPageSection[];
  item: IPageSection;
  documentsForTablesNames: DocumentsTypesForTablesNames;
}
