import type { Product } from '../../../service/features/shop/shopType';
import type { Purchase } from '../../Profile/profileType';
export type productCardType = {
  purchase: Product;
  withPrice?: boolean;
  hasBuy?: boolean;
};
