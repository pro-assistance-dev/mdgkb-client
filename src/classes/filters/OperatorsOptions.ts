import { Operators } from '@/interfaces/filters/Operators';

export default [
  { label: 'Равна', value: Operators.Eq },
  { label: 'Больше чем', value: Operators.Gt },
  { label: 'Меньше чем', value: Operators.Lt },
  { label: 'Между', value: Operators.Btw },
];
