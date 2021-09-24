import IDoctor from '@/interfaces/doctors/IDoctor';

export default interface IEducationalOrganizationTeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
}
