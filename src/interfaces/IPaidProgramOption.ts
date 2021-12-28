export default interface IPaidProgramOption {
  id?: string;
  name: string;
  paidProgramOptionsGroupId?: string;
  selected: boolean;
  available: boolean;
  order: number;
}
