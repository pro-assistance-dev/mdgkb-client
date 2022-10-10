interface IProperty {
  checkDefaultType: () => boolean;
  implementType: () => void;
  checkImplementedType: () => boolean;
  getProperty: () => unknown;
}
