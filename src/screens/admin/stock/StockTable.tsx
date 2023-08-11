import React from "react";
import Table from "../../../libraries/Table";
import StockRow from "./StockRow";

interface stockTableProps {
  data: any
  count: number;
  pageSize: number;
  handleRefresh: () => void;
  deleteModal: (id: number, message: string) => void;
  updateModal:any
}
const StockTable: React.FC<stockTableProps> = ({
  data,
  count,
  pageSize,
  handleRefresh,
  deleteModal,
  updateModal
}) => {
  const headers = [
    "Stock",
    "Itemcode",
    "size",
    "Price",
    "Purchased qty",
    "Available qty",
    "Actions",
  ];
  return (
    <div>
      <Table
        tableData={data}
        headers={headers}
        TableRow={StockRow}
        refreshTableData={handleRefresh}
        paginationOptions={{
          totalPageCount: count,
          defaultPageSize: pageSize,
        }}
        rowProps={{
          deleteModal: deleteModal,
          updateModal:updateModal
        }}
      />
    </div>
  );
};

export default React.memo(StockTable);
