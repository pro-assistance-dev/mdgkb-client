export default interface IForm {
  validate: (callback: myCallback) => boolean;
}

declare type myCallback = (name: boolean) => void;
