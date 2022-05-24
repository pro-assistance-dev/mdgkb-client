export default interface IEditorMenuItem {
  icon?: string;
  title?: string;
  action?: () => unknown;
  isActive?: () => boolean;
  type?: string;
}
