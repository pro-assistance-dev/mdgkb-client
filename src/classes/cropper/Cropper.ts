import { ICropper } from '@/interfaces/cropper/ICropper';

export default class Cropper implements ICropper {
  isOpen = false;
  ratio = 0;
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
  static CreateCropper(src: string, store: string, mutation: string, ratio?: number): ICropper {
    const cropper = new Cropper();
    cropper.src = src;
    cropper.store = store;
    cropper.mutation = mutation;
    if (ratio) cropper.ratio = ratio;
    return cropper;
  }
}
