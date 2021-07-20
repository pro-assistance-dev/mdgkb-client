import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';

export default class PreviewThumbnailFile implements IPreviewThumbnailFile {
  id = '';
  filenameDisk = '';

  constructor(i?: IPreviewThumbnailFile) {
    if (!i) return;
    this.id = i.id;
    this.filenameDisk = i.filenameDisk;
  }
}
