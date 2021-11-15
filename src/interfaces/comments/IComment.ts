import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';
import INews from '@/interfaces/news/INews';
import IUser from '@/interfaces/users/IUser';

export default interface IComment {
  id?: string;
  userId?: string;
  text: string;
  publishedOn: Date;
  isEditing: boolean;
  modChecked: boolean;
  positive: boolean;
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
