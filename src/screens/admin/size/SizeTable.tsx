import React from "react";
import Table from "../../../libraries/Table";
import SizeRow from "./SizeRow";
import { eleProps } from "../../../utilities/types";

interface sizeTableProps {
  data:  eleProps
  count: number;
  pageSize: number;
  handleRefresh: () => void;
  deleteModal: (id: number, message: string) => void;
  updateModal: (ele:eleProps) => void;
}
const SizeTable: React.FC<sizeTableProps> = ({
  data,
  count,
  pageSize,
  handleRefresh,
  deleteModal,
  updateModal,
}) => {
  const headers = ["Size", "Actions"];
  return (
    <div>
      <Table
        tableData={data}
        headers={headers}
        TableRow={SizeRow}
        refreshTableData={handleRefresh}
        paginationOptions={{
          totalPageCount: count,
          defaultPageSize: pageSize,
        }}
        rowProps={{
          deleteModal: deleteModal,
          updateModal: updateModal,
        }}
      />
    </div>
  );
};

export default React.memo(SizeTable);
