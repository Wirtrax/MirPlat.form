import Loader from '../UI/Loader/Loader';
import ProductCard from '../UI/ProductCard/ProductCard';
import s from './Shop.module.scss';

import type { ShopContentProps } from "./shopType";

export default function ShopContent({ status, error, products, handleOpenProduct }: ShopContentProps) {

    if (status === 'loading') return <Loader />

    if (status === 'failed') return <p className={s['shop--mishap']}>{error || 'Что-то пошло не так...'}</p>

    if (products.length === 0) return <p className={s['shop--mishap']}>Товаров пока нет...</p>

    return (
        <section className={s['shop__list']}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    purchase={product}
                    withPrice={true}
                    onClick={() => handleOpenProduct(product.id)}
                />
            ))}
        </section>
    )
}
