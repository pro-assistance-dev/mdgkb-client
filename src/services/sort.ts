import IOrdered from '@/services/interfaces/IOrdered';

export default function sort(ordered: IOrdered[]): void {
  ordered.forEach((o: IOrdered, i: number) => (o.order = i));
}
