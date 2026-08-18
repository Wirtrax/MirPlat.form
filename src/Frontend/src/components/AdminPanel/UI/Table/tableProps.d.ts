export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface TableProps<T extends object> {
  title: string;
  countElements: string;
  columns: TableColumn<T>[];
  data: T[];
}
