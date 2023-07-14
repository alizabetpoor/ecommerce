export interface ProductListType {
  products: ProductType[];
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
}

export interface RatingType {
  rate: number;
  count: number;
}
