import IPreparation from '@/interfaces/IPreparation';

export default interface IPreparationsWithDeleted {
  preparations: IPreparation[];
  preparationsForDeleted: string[];
}
