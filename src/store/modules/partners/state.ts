import Partner from '@/classes/Partner';
import IPartner from '@/interfaces/partners/IPartner';

export interface State {
  items: IPartner[];
  item: IPartner;
  filteredItems: Partner[];
}
