export default interface IFile {
  name: string;
  url: string;
  src: string;
  raw?: File;
  blob: Blob;
}
