import { ICropper } from '@/interfaces/cropper/ICropper';

export default class Cropper implements ICropper {
  isOpen = false;
  ratio = 1;
  src = '';
  store = '';
  mutation = '';

  constructor(i?: ICropper) {
    if (!i) return;
    this.isOpen = i.isOpen;
    this.ratio = i.ratio;
    this.src = i.src;
    this.store = i.store;
    this.mutation = i.mutation;
  }
  static CreateCropper(ratio: number, src: string, store: string, mutation: string): ICropper {
    const cropper = new Cropper();
    cropper.ratio = ratio;
    cropper.src = src;
    cropper.store = store;
    cropper.mutation = mutation;
    return cropper;
  }
}
