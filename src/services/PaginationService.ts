class PaginationService {
  limit = 25;

  count = 0;
  curPage = 0;

  setCurPage(page: number): void {
    this.curPage = page;
  }

  pageCount(): number {
    return Math.ceil(this.count / this.limit) ?? 1;
  }
}

const s = new PaginationService();
export default s;
