import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';

export default class PreviewThumbnailFile implements IPreviewThumbnailFile {
  id?: string;
  originalName: string = '';
  filenameDisk: string = '';
  category = '';
  file?: File;

  constructor(i?: IPreviewThumbnailFile) {
    if (!i) return;
    this.id = i.id;
    this.originalName = i.originalName;
    this.filenameDisk = i.filenameDisk;
    this.category = i.category;
    this.file = i.file;
  }
}
