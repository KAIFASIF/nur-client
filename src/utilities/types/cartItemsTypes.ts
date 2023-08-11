export type cartItemsProps = {
  id: number;
  itemCode: number;
  category: string;
  mrp: number;
  sellingPrice: number;
  totalQuantity: number;
  quantity: number;
  isEditQty: boolean;
  isEditSellingPrice: boolean;
};

export type ruleType = {
  required?: boolean;
  regex?: string;
  errorMessage?: string;
};

export type userTypes = {
  id?: number;
  fullname: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword?: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  isAuthorized: boolean;
  username: string;
};
