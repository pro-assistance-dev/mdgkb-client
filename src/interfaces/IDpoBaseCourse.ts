import ITeacher from '@/interfaces/ITeacher';

export default interface IDpoBaseCourse {
  id?: string;
  name: string;
  description: string;
  order: number;
  cost: number;
  start: Date;
  listeners: number;
  hours: number;
  teacher: ITeacher;
  teacherId?: string;
}
