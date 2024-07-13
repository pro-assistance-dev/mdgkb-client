class Paginator {
  limit = 25;

  count = 0;
  curPage = 1;
  storeModule? = '';

  setCurPage(page: number): void {
    this.curPage = page;
  }

  pagesCount(): number {
    return Math.ceil(this.count / this.limit) ?? 1;
  }
  reset(): void {
    this.count = 0;
    this.curPage = 1;
  }
}

const s = new Paginator();
export default s;
