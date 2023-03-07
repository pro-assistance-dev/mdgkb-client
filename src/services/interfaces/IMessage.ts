export default interface IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning' | undefined;
}
