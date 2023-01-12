import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';

export default interface IDailyMenuOrdersWithCount {
  dailyMenuOrders: IDailyMenuOrder[];
  count: number;
}
