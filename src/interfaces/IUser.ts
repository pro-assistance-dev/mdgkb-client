import IChild from '@/interfaces/IChild';
import IHuman from '@/interfaces/IHuman';
import IQuestion from '@/interfaces/IQuestion';

export default interface IUser {
  id?: string;
  email: string;
  password?: string;
  human: IHuman;
  humanId?: string;
  questions: IQuestion[];
  children: IChild[];
  childrenForDelete: string[];

  hasNewAnswers: () => boolean;
  countNewAnswers: () => number;
  readAllAnswers: () => void;

  addChild: () => void;
  removeChild: (index: number) => void;
}
