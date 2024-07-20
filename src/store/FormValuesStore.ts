import Form from '@/classes/Form';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<Form> {
  constructor() {
    super(Form, 'form-values');
  }
  async DocumentsToPdf(id: string): Promise<void> {
    await HttpClient.Get<undefined>({
      query: this.getUrl(`documents-to-pdf/${id}`),
      isBlob: true,
      downloadFileName: 'Документы.pdf',
    });
  }
  async DocumentsToZip({ id, name }): Promise<void> {
    await HttpClient.Get<undefined>({
      query: this.getUrl(`documents-to-zip/${id}`),
      isBlob: true,
      downloadFileName: name,
    });
  }
}

const store: S = new S();
export default store;
