export class TableCellViewModel {
  private text: string;
  getText() {
    return this.text;
  }
  setText(text: string) {
    this.text = text;
    this.updateCallback(this.text);
  }
  constructor(text: string = null) {
    this.text = text;
  }
  updateCallback: (data: string) => any;
}
export class TableRowViewModel {
  private cells: TableCellViewModel[];
  getCells() {
    return this.cells;
  }
  setCellsText(data: string[]) {
    if (!this.cells) {
      this.cells = data.map((s) => new TableCellViewModel(s));
    }
  }
  constructor(data: string[]) {
    this.setCellsText(data);
  }
  updateCallback: (data: TableCellViewModel[]) => any;
}
export class TableColumnDescription {
  name: string;
  title?: string;
}
export class TableViewModel {
  private columns: TableColumnDescription[];
  loadData(limit: number, offset: number) {
    this.getDataCallback(limit, offset, (data: any) => {
      this.addRowsCallback(
        data.map(
          (rowData: any) =>
            new TableRowViewModel(
              this.columns.map((col) => rowData[col.name].toString())
            )
        )
      );
    });
  }
  rows: TableRowViewModel;
  getDataCallback: (limit: number, offset: number, ready: any) => void;
  constructor(columns: TableColumnDescription[]) {
    this.columns = columns;
  }
  getColumns() {
    return this.columns;
  }
  addRowsCallback: (rows: TableRowViewModel[]) => any;
}
