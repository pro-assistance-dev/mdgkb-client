import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/IDoctor';
import IUser from '@/interfaces/IUser';
import INews from '@/interfaces/news/INews';

export default interface IComment {
  id?: string;
  userId?: string;
  text: string;
  publishedOn: Date;
  isEditing: boolean;
  modChecked: boolean;
  positive: boolean;
  rating: number;
  answer: string;
  title: string;
  link: string;
  commentTo: string;
  news?: INews;
  doctor?: IDoctor;
  division?: IDivision;
  newsComment?: IComment;
  doctorComment?: IComment;
  divisionComment?: IComment;

  user: IUser;
}
