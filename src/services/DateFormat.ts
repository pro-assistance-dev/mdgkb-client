export default function fillDateFormat(date: Date, monthLong?: boolean): string {
  let options = {  year: 'numeric', month: 'long', day: 'numeric' };

if (monthLong) return Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
  return Intl.DateTimeFormat('ru-RU').format(new Date(date))
}
