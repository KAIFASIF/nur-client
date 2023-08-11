import React from "react";
import Table from "../../../libraries/Table";
import InvoiceRow from "./InvoiceRow";

interface invoiceTableProps {
  data: any;
  count: number;
  size: number;
  handleRefresh: () => void;
}

const InvoiceTable: React.FC<stockTableProps> = ({
  data,
  count,
  size,
  handleRefresh,
}) => {
  const headers = [
    "Bill no",
    "User",
    "Payment mode",
    "Amount paid",
    "Amount",
    "Disocunt key",
    "Discunt",
    "Grand total",
    "Pending amount",
    "Status",
    "Actions",
  ];
  return (
    <div>
      <Table
        tableData={data}
        headers={headers}
        TableRow={InvoiceRow}
        refreshTableData={handleRefresh}
        paginationOptions={{
          totalPageCount: count,
          defaultPageSize: size,
        }}
      />
      {/* <Table
        tableData={invoices}
        headers={headers}
        TableRow={InvoiceRow} 
        // refreshTableData={handleRefresh}
        // paginationOptions={{
        //   totalPageCount: count,
        //   defaultPageSize: size,
        // }}
        // rowProps={{
        //   deleteModal: deleteModal,
        //   updateModal:updateModal
        // }}
      />*/}
    </div>
  );
};

export default React.memo(InvoiceTable);
