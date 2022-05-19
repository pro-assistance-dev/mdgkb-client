import IComment from './comments/IComment';

export default interface ICommentsWithCount {
  comments: IComment[];
  count: number;
}
