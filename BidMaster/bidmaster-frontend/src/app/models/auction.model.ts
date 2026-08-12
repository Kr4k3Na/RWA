import { Product } from "./product.model";

export interface AuctionLot {
  product: Product;
  currentBid: number;
  closesInSeconds: number;
  sellerName?: string;
  bidsCount?: number;
}
