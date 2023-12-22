import ExportTypes from '@/classes/ExportTypes';
import DateTimeFormatter from '@/services/DateFormat';

export type ExportOptionsObject = Record<string, unknown>;
export type ExportOptionsMap = {
  [key: string]: ExportOptionsObject;
};

export default class ExportOptions {
  exportType: ExportTypes = ExportTypes.XLSX;
  fileName = ExportOptions.getDefaultName(ExportTypes.XLSX);
  options: ExportOptionsMap = {};

  constructor(exportType: ExportTypes) {
    this.exportType = exportType;
    this.fileName = ExportOptions.getDefaultName(exportType);
  }

  setOptions(...options: ExportOptionsObject[]): void {
    options.forEach((o: ExportOptionsObject) => {
      for (const i in o) {
        this.options[i] = o;
      }
    });
  }

  static XLSX(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.XLSX);
    rootOptions.setOptions(...options);
    return rootOptions;
  }

  static PDF(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.PDF);
    rootOptions.setOptions(...options);
    return rootOptions;
  }

  static chart(...options: ExportOptionsObject[]): ExportOptions {
    const rootOptions = new ExportOptions(ExportTypes.chart);
    rootOptions.setOptions(...options);
    return rootOptions;
  }

  private static getDefaultName(exportType: ExportTypes): string {
    const f = new DateTimeFormatter();
    return `Данные от ${f.format(new Date())}.${exportType}`;
  }
}
