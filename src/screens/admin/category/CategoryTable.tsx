import React from "react";
import Table from "../../../libraries/Table";
import CategoryRow from "./CategoryRow";
import { eleProps } from "../../../utilities/types";

interface categoryTableProps {
  data: eleProps;
  count: number;
  pageSize: number;
  handleRefresh: () => void;
  deleteModal: (id: number, message: string) => void;
  updateModal: (ele: eleProps) => void;
}
const CategoryTable: React.FC<categoryTableProps> = ({
  data,
  count,
  pageSize,
  handleRefresh,
  deleteModal,
  updateModal,
}) => {
  const headers = ["Category", "Actions"];
  return (
    <div>
      <Table
        tableData={data}
        headers={headers}
        TableRow={CategoryRow}
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

export default React.memo(CategoryTable);
