export default interface FileInfo {
  id?: string;
  category: string;
  originalName: string;
  filenameDisk: string;
  file?: File;
  isDraft?: boolean;
}
