export const paths = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8003",

  products: {
    list: "/api/products",
    create: "/api/products",
    detail: (id: number | string) => `/api/products/${id}`,
  },

  escrows: {
    list: "/api/escrow",
    create: "/api/escrow",
    detail: (id: number | string) => `/api/escrow/${id}`,
    update: (id: number | string) => `/api/escrow/${id}`,
    delete: (id: number | string) => `/api/escrow/${id}`,
    release: "/api/escrow/release",
  },

  payments: {
    create: "/api/payment",
    callback: "/api/payment/callback",
  },

  auth: {
    googleCallback: "/api/auth/google/callback",
  },

  delivery: {
    create: "/api/delivery",
    fee: "/api/delivery/fee",
  },

  categories: {
    list: "/api/categories",
    create: "/api/categories",
    detail: (id: number | string) => `/api/categories/${id}`,
  },

  feedbacks: {
    detail: (
      sellerId: number | string,
      productId: number | string,
      buyerId: number | string
    ) => `/api/feedbacks/${sellerId}/${productId}/${buyerId}`,

    list: (sellerId: number | string, productId: number | string) =>
      `/api/feedbacks/${sellerId}/${productId}`,
  },

  orders: {
    list: "/api/order",
    create: "/api/order",
    detail: (id: number | string) => `/api/order/${id}`,
    delete: (id: number | string) => `/api/order/${id}`,
    bySeller: "/api/order/seller",
  },

  productListings: {
    list: "/api/productListings",
    create: "/api/productListings",
    detail: (sellerId: number | string, productId: number | string) =>
      `/api/productListings/${sellerId}/${productId}`,
  },

  users: {
    cart: (id: number | string) => `/api/user/${id}/cart`,
    clearCart: (id: number | string) => `/api/user/${id}/cart/clear`,
    firstLogin: "/api/user/first-login",
    myInfo: "/api/user/my-info",
  },
};
