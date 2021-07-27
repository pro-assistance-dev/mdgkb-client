export default interface FileInfo {
  id?: string;
  category: string;
  originalName: string;
  fileSystemPath: string;
  file?: File;
  isDraft?: boolean;
}
