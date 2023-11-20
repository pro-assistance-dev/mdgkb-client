import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import News from '@/classes/news/News';
import User from '@/classes/User';

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
  news?: News;
  doctor?: Doctor;
  division?: Division;
  newsComment?: IComment;
  doctorComment?: IComment;
  divisionComment?: IComment;

  user: User;
}
