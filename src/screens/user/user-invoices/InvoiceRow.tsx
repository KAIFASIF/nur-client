import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface invoiceRowProps {
  ele: any;
}
const InvoiceRow: React.FC<invoiceRowProps> = (props) => {
  const { ele } = props;
  const navigate =useNavigate()

  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd"> {ele?.billno}</td>
      <td className="tableBodyTd"> {ele?.paymentMode}</td>
      {/* <td className="tableBodyTd"> {JSON.parse(ele?.paymentMode).join(",")}</td> */}
      <td className="tableBodyTd"> {ele?.amountPaid}</td>
      <td className="tableBodyTd"> {ele?.amount}</td>
      <td className="tableBodyTd">
        {" "}
        {ele?.discountKey ? ele?.discountKey : "-"}
      </td>
      <td className="tableBodyTd"> {ele?.discount}</td>
      <td className="tableBodyTd"> {ele?.grandTotal}</td>
      <td className="tableBodyTd"> {ele?.pendingAmount}</td>
      <td className="tableBodyTd">
        {" "}
        <span
          className={`${
            ele?.status === "paid" ? "text-green-700" : "text-red-600"
          }`}
        >
          {ele?.status}
        </span>
      </td>

      <td className="tableBodyTd cursor-pointer">
        <div className="flex ">
          <BiInfoCircle className=" text-green-600 text-2xl font-light ml-4"  onClick={()=>navigate(`/user/pos/${ele?.id}`)}/>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(InvoiceRow);
