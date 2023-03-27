import ClassHelper from '@/services/ClassHelper';

export default class Cropper {
  id?: string;
  ratio = 0;
  src = '';
  store = '';

  constructor(i?: Cropper) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateCropper(src: string, ratio?: number, id?: string): Cropper {
    const cropper = new Cropper();
    cropper.src = src;
    cropper.id = id;
    if (ratio) {
      cropper.ratio = ratio;
    }
    return cropper;
  }
}
