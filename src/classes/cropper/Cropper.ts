import { ICropper } from '@/interfaces/cropper/ICropper';

export default class Cropper implements ICropper {
  id?: string;
  isOpen = false;
  ratio = 0;
  src = '';
  store = '';
  mutation = '';
  // fileInfo?: IFileInfo;
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

  static CreateCropperV2(src: string, ratio?: number, id?: string): ICropper {
    const cropper = new Cropper();
    cropper.src = src;
    cropper.id = id;
    if (ratio) cropper.ratio = ratio;
    return cropper;
  }
}
