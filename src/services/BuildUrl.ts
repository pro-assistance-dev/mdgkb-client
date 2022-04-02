export default function buildUrl(path: string): string {
  const host = process.env.VUE_APP_API_HOST;
  return `${host}/${path}`;
}
