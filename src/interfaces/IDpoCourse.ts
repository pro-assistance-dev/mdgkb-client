import ITeacher from '@/interfaces/educationalOrganization/ITeacher';

export default interface IDpoCourse {
  id?: string;
  name: string;
  description: string;
  order: number;
  start: Date;
  listeners: number;
  hours: number;
  teacher: ITeacher;
  teacherId?: string;
}
