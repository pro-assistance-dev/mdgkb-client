import IDoctor from '@/interfaces/IDoctor';

export default interface IEducationalOrganizationAcademic {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
}
