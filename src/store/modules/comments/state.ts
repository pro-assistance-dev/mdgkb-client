import IComment from '@/interfaces/comments/IComment';

export default interface State {
  comments: IComment[];
  positiveMode: boolean;
}
