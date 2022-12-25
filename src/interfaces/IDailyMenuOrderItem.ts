import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';

export default interface IDailyMenuOrderItem {
  id?: string;
  quantity: number;
  price: number;
  dailyMenuOrderId?: string;
  dailyMenuOrder: IDailyMenuOrder;
  dailyMenuItemId?: string;
  dailyMenuItem: IDailyMenuItem;

  getWeightSum: () => number;
  getCaloricSum: () => number;
  getPriceSum: () => number;
}
