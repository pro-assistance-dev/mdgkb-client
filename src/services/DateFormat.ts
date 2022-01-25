export default function fillDateFormat(date: Date, monthLong?: boolean, time?: boolean, monthShort?: boolean): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
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
