import ClassHelper from '@/services/ClassHelper';

export default class FileObject {
  id = '';
  filename_disk = '';
  filename_download = '';
  title = '';
  type = '';
  extension = '';

  constructor(i?: FileObject) {
    ClassHelper.BuildClass(this, i);
  }
}
