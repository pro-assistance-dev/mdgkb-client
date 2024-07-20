import ChartData from '@/classes/ChartData';
import ExportOptions from '@/classes/ExportOptions';
import HttpClient from '@/services/HttpClientS';

class S {
  async Data(exportOptions: ExportOptions): Promise<void | ChartData> {
    return await HttpClient.Get<ChartData>({
      query: `export-data/data?exportOptions=${JSON.stringify(exportOptions)}`,
    });
  }
}

const store: S = new S();
export default store;
