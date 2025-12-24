export type Review = {
  id: string;
  name: string;
  date: string; // ISO string YYYY-MM-DD
  rating: number;
  comment: string;
};

export type ProductApi = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount: number;
};

