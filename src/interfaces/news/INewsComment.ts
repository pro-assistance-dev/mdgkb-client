import IUser from '@/interfaces/users/IUser';

export default interface INewsComment {
  id?: string;
  newsId: string;
  userId: string;
  text: string;
  publishedOn: Date;
  user: IUser;
  isEditing: boolean;
}
