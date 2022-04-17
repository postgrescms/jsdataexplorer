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
  getKey() {
    return this.key as string;
  }
  getCells() {
    return this.cells;
  }
  setCellsText(data: string[]) {
    if (!this.cells) {
      this.cells = data.map((s) => new TableCellViewModel(s));
    }
    else {
      data.map((s, idx) => this.cells[idx].setText(s));
    }
  }
  constructor(data: string[], private key: string | string[]) {
    this.setCellsText(data);
  }
  updateCallback: (data: TableCellViewModel[]) => any;
  exploreCallback: () => void;
}

export class TableHeaderViewModel {
  public captionsViewModel: TableRowViewModel;
  constructor(captions: string[]) {
    this.captionsViewModel = new TableRowViewModel(captions, null);
  }
}

export class TableColumnDescription {
  name: string;
  title?: string;
}

export class TableViewModel {
  private columns: TableColumnDescription[];
  private dataOffset: number = 0;
  dataPartRowCount: number = 10;
  headerViewModel: TableHeaderViewModel;
  loadData() {
    this.getDataCallback(
      this.dataPartRowCount,
      this.dataOffset,
      (data: any) => {
        this.dataOffset += this.dataPartRowCount;
        const rows = data.map(
          (rowData: any) => {
            const row = new TableRowViewModel(
              this.columns.map((col) => rowData.data[col.name].toString()),
              rowData.key
            )
            row.exploreCallback = () => {
              this.exploreRowCallback(row);
            }
            return row;
          }
        )
        this.rows = this.rows.concat(rows);
        this.addRowsCallback(rows);
      }
    );
  }
  rows: TableRowViewModel[];
  getDataCallback: (limit: number, offset: number, ready: any) => void;
  constructor(columns: TableColumnDescription[]) {
    this.columns = columns;
    this.headerViewModel = new TableHeaderViewModel(
      columns.map((col) => col.title || col.name)
    );
    this.rows = [];
  }
  addRowsCallback: (rows: TableRowViewModel[]) => any;
  exploreRowCallback: (row: TableRowViewModel) => any;
}
