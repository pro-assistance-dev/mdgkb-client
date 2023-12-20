export default interface IEditorMenuItem {
  icon?: string;
  title?: string;
  condition?: boolean;
  action?: () => unknown;
  isActive?: () => boolean;
  type?: string;
}
