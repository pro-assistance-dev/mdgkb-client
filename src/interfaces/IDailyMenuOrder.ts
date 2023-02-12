import Form from '@/classes/Form';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';

export default interface IDailyMenuOrder {
  id?: string;
  date: Date;
  boxNumber: number;
  number: number;
  dailyMenuOrderItems: IDailyMenuOrderItem[];
  formValue: Form;
  formValueId?: string;

  increaseDailyMenuOrderItem: (dailyMenuItem: IDailyMenuItem) => void;
  decreaseDailyMenuOrderItem: (dailyMenuItem: IDailyMenuItem) => void;

  removeDailyMenuOrderItem: (item: IDailyMenuOrderItem) => void;
  getCaloricSum: () => number;
  setLocalStorage: () => void;
  reproduceFromStore: () => void;
  removeFromLocalStore: () => void;
  getPriceSum: () => number;
  filterAndGetNonActualDailyMenuItems: (menu: IDailyMenu) => IDailyMenuOrderItem[];
}
