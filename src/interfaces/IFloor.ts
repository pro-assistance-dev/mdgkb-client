import Division from '@/classes/Division';

export default interface IFloor {
  id?: string;
  number?: number;
  buildingId?: string;
  divisions: Division[];
}
