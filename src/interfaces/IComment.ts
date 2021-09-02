import IUser from '@/interfaces/users/IUser';

export default interface IComment {
  id?: string;
  userId?: string;
  text: string;
  publishedOn: Date;
  isEditing: boolean;

  user: IUser;
}
