export default interface IPage {
  id?: string;
  title: string;
  content: string;
  slug: string;
  link: string;

  getLink: () => string;
}
