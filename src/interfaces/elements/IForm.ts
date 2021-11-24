export default interface IForm {
  validate: (callback: ValidateCallback) => boolean;
}

declare type ValidateCallback = (valid: boolean, errorFields: Record<string, unknown>) => void;
