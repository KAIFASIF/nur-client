import React from "react";
import Table from "../../../libraries/Table";
import UserRow from "./UserRow";
import { eleProps } from "../../../utilities/types";

interface usersTableProps {
  data: eleProps;
  count: number;
  pageSize: number;
  handleRefresh: () => void;
  deleteModal: (id: number, message: string) => void;
  updateModal: (ele: eleProps) => void;
}
const UsersTable: React.FC<usersTableProps> = ({
  data,
  count,
  pageSize,
  handleRefresh,
  deleteModal,
  updateModal,
}) => {
  const headers = ["Fullname", "Mobile", "email", "Role", "Authorized", "Actions"];
  return (
    <div>
      <Table
        tableData={data}
        headers={headers}
        TableRow={UserRow}
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

export default React.memo(UsersTable);
