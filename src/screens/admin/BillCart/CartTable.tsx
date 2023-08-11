import React from "react";
import Table from "../../../libraries/Table";
import CartRow from "./CartRow";
interface cartTableProps {
    data:any
}
const CartTable:React.FC<cartTableProps> = ({data}) => {
    const headers = [
        "Product",
        "Size",
        "Mrp",
        "Selling price",
        "Quantity",
        "Total",
      ];
  return (
    <div>
      <Table tableData={data} headers={headers}   TableRow={CartRow}/>
    </div>
  );
};

export default React.memo(CartTable);
