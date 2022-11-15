import IDailyMenuItem from '@/interfaces/IDailyMenuItem';

export default interface IDailyMenu {
  id?: string;
  date: Date;
  dailyMenuItems: IDailyMenuItem[];
}
