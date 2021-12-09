import IDoctor from '@/interfaces/IDoctor';

export default interface IEducationalOrganizationTeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
}
