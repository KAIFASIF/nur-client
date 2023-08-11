import React from "react";
import BillRow from "./BillRow";

interface ThermalBillModalProps {
  apiRes: any;
  isThermalBillModal: boolean;
  setIsThermalBillModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThermalBillModal = ({
  apiRes,
  isThermalBillModal,
  setIsThermalBillModal,
}: ThermalBillModalProps) => {
  if (!isThermalBillModal) return null;
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      setIsThermalBillModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      id="wrapper"
    >
      <div className="w-80 bg-white p-5 rounded">
        <div className=" border-b-2 border-gray-700 mb-2">
          <h2 className="text-center">Studio Nur</h2>
          <p className="text-center">
            No.64, Adams Avenue Building, LM Street, off.Commercial Street, 2nd
            Cross, Bangalore- 560 001
          </p>
          <p className="text-center"> Mob: 88612 72442 / 93430 37928</p>
          {/* <p className="text-center"> GstIN: KHAYJK12515KI</p> */}
        </div>
        <div className=" ">
          <div className="flex flex-row justify-between">
            <h1 className="font-semibold">Bill No:{apiRes?.billno}</h1>
            <h1>{apiRes?.date}</h1>
            <h1>{apiRes?.time}</h1>
          </div>
        </div>

        <table className="">
          <thead className="border-b mb-10">
            <tr>
              <th
                scope="col"
                className="text-base font-normal text-gray-900 px-3 py-4 text-left"
              >
                Itemcode
              </th>
              <th
                scope="col"
                className="text-base font-normal text-gray-900 px-3 py-4 text-left"
              >
                Mrp
              </th>
              <th
                scope="col"
                className="text-base font-normal text-gray-900 px-3 py-4 text-left"
              >
                Qty
              </th>

              <th
                scope="col"
                className="text-base font-normal text-gray-900 px-3 py-4 text-left"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {apiRes?.billcart?.map((ele: any) => (
              <BillRow key={ele?.id} ele={ele} />
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-between border-t-2 mt-2">
          <h1>Amount</h1>
          <h1>
            {"Rs: "}
            {apiRes?.amount}
          </h1>
        </div>
        {apiRes?.discount > 0 && (
          <div className="flex flex-row justify-between border-t-2 mt-2">
            <h1>Discount </h1>
            <h1>
              {"Rs: "}
              {apiRes?.discount}
            </h1>
          </div>
        )}
        {apiRes?.discount > 0 && (
          <div className="flex flex-row justify-between border-t-2 mt-2">
            <h1>Grand total</h1>
            <h1>
              {"Rs: "}
              {apiRes?.grandTotal}
            </h1>
          </div>
        )}

        <div className="flex flex-row justify-between border-t-2 mt-2">
          <h1>Payment Mode</h1>
          <h1>{JSON.parse(apiRes?.paymentMode).join(",")}</h1>
        </div>
        {apiRes?.pendingAmount > 0 && (
          <div className="flex flex-row justify-between border-t-2 mt-2">
            <h1>Amount Pending</h1>
            <h1>
              {"Rs: "}
              {apiRes?.pendingAmount}
            </h1>
          </div>
        )}

        <div className="flex flex-row justify-between border-t-2 mt-2">
          <h1>Status</h1>
          <h1>
           
            {apiRes?.status}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThermalBillModal);
