declare type ValidateCallback = (valid: boolean, errorFields: Record<string, unknown>) => void;

export default interface IForm {
  validate: (callback: ValidateCallback) => void;
}
