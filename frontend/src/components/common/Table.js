import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';
import '../../styles/components/table.css';

const Table = ({ columns, data, onRowAction }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
          {onRowAction && <th>Acción</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.render
                    ? column.render(row)
                    : row[column.accessor]}
                </td>
              ))}
              {onRowAction && (
                <td>
                  <button
                    className="table-action-button"
                    onClick={() => onRowAction(row)}
                  >
                    <FaArrowRight />
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (onRowAction ? 1 : 0)} className="no-data">
              No hay datos disponibles.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowAction: PropTypes.func,
};

export default Table;
