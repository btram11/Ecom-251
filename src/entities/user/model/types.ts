export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;

  tel: string;
  address: string;

  province: string;
  district: string;
  ward: string;

  cart: any;
  userRole: string;
  boughtOrders: any;
  buyerEscrows: any;
};
