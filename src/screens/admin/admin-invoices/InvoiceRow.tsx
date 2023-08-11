import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface invoiceRowRowProps {
  ele: any;
}
const InvoiceRow: React.FC<invoiceRowRowProps> = (props) => {
  const { ele } = props;
  const navigate =useNavigate()

  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd"> {ele?.billDTO?.billno}</td>
      <td className="tableBodyTd"> {ele?.user}</td>
      <td className="tableBodyTd"> {ele?.billDTO?.paymentMode}</td>
      {/* <td className="tableBodyTd"> {JSON.parse(ele?.paymentMode).join(",")}</td> */}
      <td className="tableBodyTd"> {ele?.billDTO?.amountPaid}</td>
      <td className="tableBodyTd"> {ele?.billDTO?.amount}</td>
      <td className="tableBodyTd">
        {" "}
        {ele?.billDTO?.discountKey ? ele?.billDTO?.discountKey : "-"}
      </td>
      <td className="tableBodyTd"> {ele?.billDTO?.discount}</td>
      <td className="tableBodyTd"> {ele?.billDTO?.grandTotal}</td>
      <td className="tableBodyTd"> {ele?.billDTO?.pendingAmount}</td>
      <td className="tableBodyTd">
        {" "}
        <span
          className={`${
            ele?.billDTO?.status === "paid" ? "text-green-700" : "text-red-600"
          }`}
        >
          {ele?.billDTO?.status}
        </span>
      </td>

      <td className="tableBodyTd cursor-pointer">
        <div className="flex ">
          <BiInfoCircle className=" text-green-600 text-2xl font-light ml-4"  onClick={()=>navigate(`/admin/billcart/${ele?.billDTO?.id}`)}/>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(InvoiceRow);
