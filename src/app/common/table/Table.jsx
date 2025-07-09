import React from 'react';

// Table Header Component
function TableHeader({ columns, headerRowStyles="bg-gray-200", headerCellStyles }) {
  return (
    <thead className="bg-gray-100">
      <tr className={headerRowStyles}>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left font-normal text-[#6B7280] ${headerCellStyles}`}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// Table Component
function Table({
  columns,
  data,
  renderRow,
  bgColor = "bg-gray-50",
  isGeneral = false,
  onActionClick,
  actionTitle = "View",
  headerRowStyles,
  headerCellStyles
}) {
  const renderCellContent = (item, column) => {
    // If it's an action column and we have an onActionClick handler
    if (column.key === "action" && onActionClick) {
      return (
        <button
          onClick={() => onActionClick(item)}
          className="text-[#5A00DB] underline font-medium cursor-pointer"
        >
          {actionTitle}
        </button>
      );
    }

    // If the column has a custom render function, use it
    if (column.render) {
      return column.render(item);
    }

    // Convert any value to string safely
    const value = item[column.key];

    // Handle different types of values
    if (value === null || value === undefined) {
      return "";
    }

    if (React.isValidElement(value)) {
      return value;
    }

    // Convert to string for display
    return String(value);
  };

  return (
    <table className="w-full">
      <TableHeader
        columns={columns}
        headerRowStyles={headerRowStyles}
        headerCellStyles={headerCellStyles}
      />
      <tbody className={bgColor}>
        {isGeneral
          ? data.map((item, index) => (
            <tr key={index} className="border-gray-200">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-4 px-6">
                  {renderCellContent(item, column)}
                </td>
              ))}
            </tr>
          ))
          : data.map((item, index) =>
            renderRow ? renderRow(item, index) : null,
          )}
      </tbody>
    </table>
  );
}

export default Table; 