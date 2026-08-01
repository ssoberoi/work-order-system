const DataTable = ({ columns, data }) => {
    return (

        <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                {
                  columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      {column.label}
                    </th>
                  ))
                }
              </tr>
            </thead>
          <tbody>
            {
              data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
                ) : (
                    data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50"
                >
            {
                columns.map((column) => (
            <td
              key={column.key}
              className="px-6 py-4"
            >
             {column.render
               ? column.render(row) : row[column.key]}
            </td>
            ))}
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    );

};

export default DataTable;