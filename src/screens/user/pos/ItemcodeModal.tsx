import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../../libraries/form/RHFTextField";
import { nameNumRegx } from "../../../utilities/regex";
import { fetchStockByItemcode } from "../../../service/posService";
import { cartItemsProps } from "../../../utilities/types/cartItemsTypes";
import NewModal from "../../../components/NewModal";

interface itemcodeModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems?: React.Dispatch<React.SetStateAction<any>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: any;
}

const ItemcodeModal: React.FC<itemcodeModalProps> = ({
  visible,
  setVisible,
  setCartItems,
  setDiscount,
  setLoader,
  setMessage,
  setSeverity,
  setOpen,  
  setAuth,
}) => {
  const methods = useForm();
  const { setValue, getValues, setError } = methods;

  const handleCartItems = (itemcode: string, data: any) => {
    // setAuth
    // setCartItems((prev: any) => {
    //   const isItemInCart = prev.find((item: any) => item?.itemcode == itemcode);

    //   if (isItemInCart) {
    //     return prev.map((ele: any) =>
    //       ele?.itemcode === itemcode &&
    //       isItemInCart?.availableQuantity > ele?.quantity
    //         ? {
    //             ...isItemInCart,
    //             quantity: ele?.quantity + 1,
    //             amount:
    //               ele?.sellingPrice > 0
    //                 ? ele?.sellingPrice * (ele?.quantity + 1)
    //                 : ele?.mrp * (ele?.quantity + 1),
    //           }
    //         : ele
    //     );
    //   }

    //   if (data?.availableQuantity > 0) {
    //     return [
    //       ...prev,
    //       {
    //         ...data,
    //         quantity: 1,
    //         sellingPrice: 0,
    //         isEditQty: false,
    //         isEditSellingPrice: false,
    //         amount: data?.mrp,
    //       } as cartItemsProps,
    //     ];
    //   }
    // });
    setCartItems((prev: any) => {
      const isItemInCart = prev.find((item: any) => item?.itemcode == itemcode);

      if (isItemInCart) {
        return prev.map((ele: any) =>
          ele?.itemcode === itemcode &&
          isItemInCart?.availableQuantity > ele?.quantity
            ? {
                ...isItemInCart,
                quantity: ele?.quantity + 1,
                amount:
                  ele?.sellingPrice > 0
                    ? ele?.sellingPrice * (ele?.quantity + 1)
                    : ele?.mrp * (ele?.quantity + 1),
              }
            : ele
        );
      }

      if (data?.availableQuantity > 0) {
        return [
          ...prev,
          {
            ...data,
            quantity: 1,
            sellingPrice: 0,
            isEditQty: false,
            isEditSellingPrice: false,
            amount: data?.mrp,
          } as cartItemsProps,
        ];
      }
    });
  };
  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const itemcode = event?.target?.value?.toUpperCase();
    setValue("itemcode", itemcode);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLoader(true);
      try {
        const itemcode = getValues("itemcode");
        const res = await fetchStockByItemcode(itemcode);
        if (res?.status === 200) {
          await handleCartItems(itemcode, res?.data);
          setDiscount(0);
        }
        setValue("itemcode", "");
        setLoader(false);
      } catch (err: any) {
        handleModalClose();
        setLoader(false);
        setValue("itemcode", "");
        setMessage("Item does not exits");
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <NewModal
        visible={visible}
        modalSize="w-[20%]"
        handleModalClose={handleModalClose}
      >
        <div className="flex flex-col">
          <FormProvider {...methods}>
            <RHFTextField
              label="Enter itemcode"
              name="itemcode"
              pattern={nameNumRegx}
              autoFocus
              required
              handleChange={handleChange}
              onKeyPress={handleSubmit}
            />
          </FormProvider>
        </div>
      </NewModal>
    </div>
  );
};

export default React.memo(ItemcodeModal);
