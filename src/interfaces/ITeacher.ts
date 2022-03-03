import IDoctor from '@/interfaces/IDoctor';
import IDpoCourse from '@/interfaces/IDpoCourse';

export default interface ITeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
  position: string;
  dpoCourses: IDpoCourse[];
}
