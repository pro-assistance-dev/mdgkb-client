import IAdminButtonParams from '@/interfaces/admin/IAdminButtonParams';

export default interface IAdminHeaderParams {
  title: string;
  showBackButton?: boolean;
  buttons?: IAdminButtonParams[];
}
