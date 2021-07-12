export default function fillDateFormat(date: Date): string {
  return date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '';
}
