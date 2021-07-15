import IPreviewThumbnailFile from '@/interfaces/files/IPreviewThumbnailFile';

export default class PreviewThumbnailFile implements IPreviewThumbnailFile {
  id = '';
  filename_disk = '';

  constructor(i?: IPreviewThumbnailFile) {
    if (!i) return;
    this.id = i.id;
    this.filename_disk = i.filename_disk;
  }
}
