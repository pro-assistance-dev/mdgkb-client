import Month from '@/classes/Month';
import IMonth from '@/interfaces/IMonth';
import IYear from '@/interfaces/IYear';

export default class Year implements IYear {
  months: IMonth[] = [];
  number = 0;
  active = false;

  getActiveMonth(): IMonth {
    const month = this.months.find((m: IMonth) => m.active);
    return month ?? new Month();
  }

  static Init(): IYear {
    return new Year();
  }

  static InitCurrent(): IYear {
    const year = Year.Init();
    year.number = new Date().getFullYear();
    year.active = true;
    return year;
  }

  static InitFilled(): IYear {
    const year = Year.Init();
    return year;
  }

  getFirstDay(): Date {
    return new Date(this.number, 0, 1);
  }
}
