import DailyMenuOrder from '@/classes/DailyMenuOrder';

export default interface IDailyMenuOrdersWithCount {
  dailyMenuOrders: DailyMenuOrder[];
  count: number;
}
