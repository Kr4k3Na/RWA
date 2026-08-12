import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { AuctionLot } from '../models/auction.model';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'LOT-014',
    title: 'Ručni sat, švajcarski, 1962.',
    description:
      'Automatski ručni sat švajcarske proizvodnje iz 1962. godine. Originalna kutija, servisiran pre dve godine, mehanizam radi besprekorno. Blago potamnela koža na kaišu, karakteristična za starost.',
    price: '2140',
    category: 'Satovi i nakit',
    image: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
    ],
    state: 'used',
    sellerId: 'seller-01',
  },
  {
    id: 'LOT-027',
    title: 'Ulje na platnu, nepoznat autor',
    description:
      'Pejzažna kompozicija u ulju na platnu, procenjena na sredinu 20. veka. Autor nepoznat, potpis nečitak. Platno u dobrom stanju, ram originalan, drveni, blago oštećen na uglovima.',
    price: '860',
    category: 'Umetnost',
    image: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80',
    ],
    state: 'used',
    sellerId: 'seller-02',
  },
  {
    id: 'LOT-033',
    title: 'Gitara Gibson, 1974.',
    description:
      'Električna gitara Gibson iz 1974. godine, u odličnom sviracom stanju. Originalni pickup-i, zamenjene žice, mali tragovi korišćenja na telu instrumenta. Dolazi sa tvrdim koferom.',
    price: '3320',
    category: 'Muzički instrumenti',
    image: [
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=1200&q=80',
      'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=1200&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=1200&q=80',
    ],
    state: 'used',
    sellerId: 'seller-03',
  },
  {
    id: 'LOT-041',
    title: 'Kolekcija poštanskih maraka',
    description:
      'Album sa preko 200 poštanskih maraka iz perioda 1920-1970, poreklom iz nekoliko evropskih zemalja. Album u dobrom stanju, marke katalogizovane po godinama.',
    price: '410',
    category: 'Kolekcionarstvo',
    image: [
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=1200&q=80',
      'https://images.unsplash.com/photo-1586180099929-42e1c0e0e9db?w=1200&q=80',
    ],
    state: 'used',
    sellerId: 'seller-04',
  },
  {
    id: 'LOT-052',
    title: 'Pisaća mašina Olivetti',
    description:
      'Mehanička pisaća mašina Olivetti, klasičan dizajn sredine 20. veka. Tastatura potpuno funkcionalna, traka za zamenu uključena. Odličan komad za dekoraciju ili kolekciju.',
    price: '195',
    category: 'Antikviteti',
    image: [
      'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=1200&q=80',
      'https://images.unsplash.com/photo-1519326844852-704caea5679e?w=1200&q=80',
    ],
    state: 'used',
    sellerId: 'seller-05',
  },
  {
    id: 'LOT-058',
    title: 'Vinil ploča, prvo izdanje',
    description:
      'Retko prvo izdanje vinil ploče, originalni omot bez restauracije. Ploča u vrlo dobrom stanju uz minimalne tragove sviranja. Za kolekcionare i ljubitelje analognog zvuka.',
    price: '1275',
    category: 'Muzika',
    image: [
      'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&q=80',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
    ],
    state: 'new',
    sellerId: 'seller-06',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _lots = signal<AuctionLot[]>(
    MOCK_PRODUCTS.map((product, idx) => ({
      product,
      currentBid: Number(product.price),
      closesInSeconds: [272, 128, 471, 107, 552, 185][idx] ?? 300,
      sellerName: 'Verifikovani prodavac',
      bidsCount: 4 + idx * 3,
    }))
  );

  readonly lots = this._lots.asReadonly();

  getLotByProductId(id: string): AuctionLot | undefined {
    return this._lots().find((lot) => lot.product.id === id);
  }

  /** Simulates a live bid bump on a random lot, used by the home page ticker. */
  bumpRandomLot(): void {
    const lots = this._lots();
    if (!lots.length) return;
    const idx = Math.floor(Math.random() * lots.length);
    const bump = Math.round(5 + Math.random() * 40);
    const updated = [...lots];
    updated[idx] = { ...updated[idx], currentBid: updated[idx].currentBid + bump };
    this._lots.set(updated);
  }

  placeBid(productId: string, amount: number): void {
    const lots = this._lots();
    const idx = lots.findIndex((l) => l.product.id === productId);
    if (idx === -1) return;
    const updated = [...lots];
    updated[idx] = { ...updated[idx], currentBid: amount, bidsCount: (updated[idx].bidsCount ?? 0) + 1 };
    this._lots.set(updated);
  }
}
