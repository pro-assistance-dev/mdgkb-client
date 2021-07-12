export default interface FileInfo {
  id?: string;
  category: string;
  originalName: string;
  file?: File;
  isDraft?: boolean;
}
