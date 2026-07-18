export interface Auction {
    id: string;
    productId: string;
    startingPrice: number;
    currentPrice: number;
    hammerPrice: number;
    minimalBidStep: number;
    reservePrice?: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'soon' | 'ended';
    bidCounter: number;
}