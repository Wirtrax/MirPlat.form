export interface ShopContentProps {
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
    products: Product[]
    handleOpenProduct: (id: number) => void
}