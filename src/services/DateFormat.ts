export default function fillDateFormat(
  date: Date,
  monthLong?: boolean,
  time?: boolean,
  monthShort?: boolean,
  onlyDayMonth?: boolean
): string {
  const dayMonthYear = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const dayMonth = { month: 'numeric', day: 'numeric' };
  const options: Intl.DateTimeFormatOptions = onlyDayMonth ? dayMonth : dayMonthYear;

  if (monthLong) {
    options.month = 'long';
  }
  if (monthShort) {
    options.month = 'short';
  }
  if (time) {
    options.hour = 'numeric';
    options.minute = 'numeric';
  }
  return Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
}
