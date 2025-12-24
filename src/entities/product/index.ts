export type { Product, ProductListing } from "./model/types";

export { getProductById, getProducts } from "./api/get-product";
export {type ProductListingQuery, getProductListings} from"./api/get-product-listing"

export { ProductCard, type ProductCardProps } from "./ui/card";
export { ProductInfo } from "./ui/product-info";
export { ProductDescription } from "./ui/product-description";
export { ProductGallery } from "./ui/product-gallery";


export {mapListingToCard, mapProductToCard} from "./lib/mappers"