import IHuman from '@/interfaces/IHuman';

export default interface IChild {
  id?: string;
  human: IHuman;
  humanId?: string;
}
