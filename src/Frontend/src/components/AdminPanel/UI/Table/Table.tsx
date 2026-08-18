import type { TableProps } from './tableProps';
import s from './Table.module.scss';

const Table = <T extends object>({ title, countElements, columns, data }: TableProps<T>) => {
  return (
    <div className={s.table}>
      <div className={s.table__header}>
        <h2 className={s.table__title}>{title}</h2>
        <p className={s.table__count}>{countElements}</p>
      </div>

      <table className={s.table__grid}>
        <thead className={s.table__head}>
          <tr className={s.table__row}>
            {columns.map((column) => (
              <th key={String(column.key)} className={s.table__cell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={s.table__body}>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className={s.table__row}>
              {columns.map((column) => {
                const value = item[column.key];

                return (
                  <td key={String(column.key)} className={s.table__cell}>
                    {column.render ? column.render(value, item) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
